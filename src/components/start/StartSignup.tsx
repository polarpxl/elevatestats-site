'use client'

import { useEffect, useRef, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'
import {
  CaptchaWidget,
  CAPTCHA_ENABLED,
  type CaptchaHandle,
} from '@/components/start/CaptchaWidget'

// The app account is created against the same Supabase project the app uses, so
// the account works the moment the visitor lands in the app. Email confirmation
// is ON for that project, so an email/password signup does NOT return a session —
// the visitor must click the emailed link. We surface that as a "check your
// email" state. Google signups are auto-confirmed and hand off straight into the
// app.
const APP_URL = 'https://app.elevatestats.app'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
] as const

const UTM_STORAGE_KEY = 'ehs_start_utms'
const OAUTH_PENDING_KEY = 'ehs_oauth_pending'

type Utms = Record<string, string>

/** Read UTM/click-id params from the current URL. */
function readUtmsFromUrl(): Utms {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const out: Utms = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) out[key] = value
  }
  return out
}

/** UTMs from the URL, falling back to any we stashed before a Google round-trip. */
function resolveUtms(): Utms {
  const fromUrl = readUtmsFromUrl()
  if (Object.keys(fromUrl).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl))
    } catch {}
    return fromUrl
  }
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Utms
  } catch {}
  return {}
}

/**
 * Fire the CompleteRegistration conversion via the GTM dataLayer only — the GTM
 * container (GTM-PJ5KKTJZ) loads the Meta Pixel and forwards the event, so a
 * direct fbq() call here would double-count the conversion. A parallel
 * GA4-style `sign_up` event carries the UTMs for campaign attribution.
 */
function trackRegistration(method: 'email' | 'google', utms: Utms) {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    dataLayer?: Record<string, unknown>[]
  }

  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: 'CompleteRegistration', method, ...utms })
  w.dataLayer.push({ event: 'sign_up', method, ...utms })
}

/** Build a UTM query string (for forwarding attribution into the app). */
function utmQuery(utms: Utms): string {
  const q = new URLSearchParams(utms).toString()
  return q ? `?${q}` : ''
}

/**
 * Hand a just-created session to the app on its own domain. The app's Supabase
 * client reads the tokens from the URL hash (detectSessionInUrl) and signs the
 * visitor in — a session created here on the marketing domain does not otherwise
 * carry across origins.
 */
function forwardSessionToApp(
  session: { access_token: string; refresh_token: string; expires_in?: number },
  utms: Utms,
) {
  const hash = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: String(session.expires_in ?? 3600),
    token_type: 'bearer',
    type: 'signup',
  }).toString()
  window.location.href = `${APP_URL}/${utmQuery(utms)}#${hash}`
}

function mapSignupError(message: string): string {
  const m = message.toLowerCase()
  // Check captcha first — its message contains "invalid", which would otherwise
  // be misread as an email error.
  if (m.includes('captcha')) {
    return 'Verification failed. Please try again.'
  }
  if (
    m.includes('already registered') ||
    m.includes('already been registered') ||
    m.includes('user already exists')
  ) {
    return 'That email already has an account. Try logging in instead.'
  }
  // Leaked-password protection (HaveIBeenPwned) and other strength failures.
  if (m.includes('weak') || m.includes('pwned') || m.includes('breach')) {
    return 'That password is too common or has appeared in a data breach. Please choose a stronger one.'
  }
  if (m.includes('password')) {
    return 'Please use a password with at least 8 characters.'
  }
  if (m.includes('email')) {
    return 'Please enter a valid email address.'
  }
  return 'Something went wrong creating your account. Please try again.'
}

const inputClass =
  'w-full rounded-xl bg-white px-4 py-3 text-base text-ink ring-1 ring-black/10 placeholder:text-brand-gray/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-orange'

export function StartSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successEmail, setSuccessEmail] = useState<string | null>(null)
  // While completing an OAuth round-trip, show a neutral "finishing up" state
  // instead of the form to avoid a flash of the form before we redirect.
  const [finishingOauth, setFinishingOauth] = useState(false)

  const handledOauth = useRef(false)
  const captchaRef = useRef<CaptchaHandle>(null)

  // On mount, complete any pending Google OAuth round-trip. The Supabase client
  // exchanges the ?code=... in the URL for a session automatically; we listen for
  // the resulting sign-in, fire the Pixel on our own domain, then hand off to the
  // app. Gated on a sessionStorage flag so a restored session never counts as a
  // new registration.
  useEffect(() => {
    const url = new URL(window.location.href)
    const hasCode = url.searchParams.has('code')
    let pending = false
    try {
      pending = sessionStorage.getItem(OAUTH_PENDING_KEY) === '1'
    } catch {}

    if (!hasCode && !pending) return

    // Intentionally set once on mount when we detect an OAuth return, to swap the
    // form for a "finishing up" state before we redirect into the app. Kept in an
    // effect (not render) to avoid a hydration mismatch with the server markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinishingOauth(true)
    const supabase = getSupabaseBrowserClient()

    const complete = (session: {
      access_token: string
      refresh_token: string
      expires_in?: number
    }) => {
      if (handledOauth.current) return
      handledOauth.current = true
      try {
        sessionStorage.removeItem(OAUTH_PENDING_KEY)
      } catch {}
      const utms = resolveUtms()
      trackRegistration('google', utms)
      forwardSessionToApp(session, utms)
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        complete(session)
      }
    })

    // Fallback in case the session already exists by the time we subscribe.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) complete(data.session)
    })

    // Clean the ?code= param out of the address bar.
    if (hasCode) {
      window.history.replaceState({}, '', url.pathname)
    }

    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    const utms = resolveUtms()
    const supabase = getSupabaseBrowserClient()

    try {
      // Run the invisible captcha and get a fresh single-use token before signup.
      let captchaToken = ''
      if (CAPTCHA_ENABLED) {
        try {
          captchaToken = await captchaRef.current!.execute()
        } catch {
          setError('Verification failed. Please try again.')
          setSubmitting(false)
          return
        }
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          // `name` in user metadata is what the app's create_profile_on_signup
          // trigger reads to populate the profile — matches the app's own signup.
          data: { name: name.trim() },
          emailRedirectTo: `${APP_URL}/${utmQuery(utms)}`,
          ...(captchaToken ? { captchaToken } : {}),
        },
      })

      if (signUpError) {
        setError(mapSignupError(signUpError.message))
        setSubmitting(false)
        return
      }

      // Account created. Confirmation is required, so there is no session yet —
      // the registration is still complete for conversion tracking.
      trackRegistration('email', utms)

      if (data.session) {
        // Auto-confirm is on after all — hand straight off to the app.
        forwardSessionToApp(data.session, utms)
        return
      }

      setSuccessEmail(email.trim())
    } catch {
      setError('Something went wrong creating your account. Please try again.')
      setSubmitting(false)
    }
  }

  async function handleGoogle() {
    if (googleLoading) return
    setError(null)
    setGoogleLoading(true)
    const utms = resolveUtms()

    try {
      sessionStorage.setItem(OAUTH_PENDING_KEY, '1')
    } catch {}

    const supabase = getSupabaseBrowserClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Return to /parents (carrying UTMs) so the Pixel fires on our domain
        // before we forward the visitor into the app.
        redirectTo: `${window.location.origin}/parents${utmQuery(utms)}`,
      },
    })

    if (oauthError) {
      try {
        sessionStorage.removeItem(OAUTH_PENDING_KEY)
      } catch {}
      setError('Could not start Google sign-in. Please try again.')
      setGoogleLoading(false)
    }
  }

  if (finishingOauth) {
    return (
      <div className="rounded-card bg-white p-8 text-center shadow-xl ring-1 ring-black/5">
        <Spinner className="mx-auto h-7 w-7 text-brand-orange" />
        <p className="mt-4 font-heading text-lg font-semibold text-ink">
          Setting up your account…
        </p>
        <p className="mt-1 text-sm text-brand-gray">Hang tight, taking you into Elevate.</p>
      </div>
    )
  }

  if (successEmail) {
    return (
      <div className="rounded-card bg-white p-8 shadow-xl ring-1 ring-black/5">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M4 6l8 6 8-6" />
            <rect x="4" y="5" width="16" height="14" rx="2" />
          </svg>
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-ink">Check your email</h2>
        <p className="mt-2 text-brand-gray">
          We sent a confirmation link to <span className="font-semibold text-ink">{successEmail}</span>.
          Click it to activate your free account and jump straight into Elevate.
        </p>
        <p className="mt-4 text-sm text-brand-gray/80">
          Didn&apos;t get it? Check your spam folder — it lands within a minute or two.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-card bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-8">
      <div className="mb-5 text-center">
        <h2 className="font-heading text-xl font-bold text-ink">Start tracking in your next game</h2>
        <p className="mt-1 text-sm text-brand-gray">
          Create your free account. Your first 3 games include every PRO feature.
        </p>
        <p className="mt-2 text-sm font-semibold text-brand-gray">
          Free forever plan · No credit card required
        </p>
      </div>
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading || submitting}
        className="inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-white px-6 font-heading text-base font-semibold text-ink ring-1 ring-black/15 transition-colors hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-60"
      >
        {googleLoading ? (
          <Spinner className="h-5 w-5 text-brand-gray" />
        ) : (
          <GoogleGlyph className="h-5 w-5" />
        )}
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-brand-gray/60">
        <span className="h-px flex-1 bg-black/10" />
        or
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <form onSubmit={handleEmailSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="start-name" className="mb-1.5 block font-heading text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="start-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="start-email" className="mb-1.5 block font-heading text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="start-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="start-password" className="mb-1.5 block font-heading text-sm font-semibold text-ink">
            Password
          </label>
          <input
            id="start-password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="At least 8 characters"
          />
        </div>

        {CAPTCHA_ENABLED ? <CaptchaWidget ref={captchaRef} /> : null}

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || googleLoading}
          className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-7 font-heading text-base font-semibold text-white transition-colors hover:bg-[#E65C00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-60"
        >
          {submitting ? <Spinner className="h-5 w-5 text-white" /> : null}
          {submitting ? 'Creating your account…' : 'Create my free account'}
        </button>
      </form>
    </div>
  )
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className ?? ''}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.87z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}
