'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

// The app's Supabase project has Cloudflare Turnstile bot protection on auth, so
// every signup must attach a fresh token. This is an INVISIBLE widget run in
// execute-on-submit mode: nothing renders on screen, and the challenge runs
// silently when the visitor submits, yielding a single-use token we pass to
// signUp. Config is one env var:
//
//   NEXT_PUBLIC_CAPTCHA_SITEKEY = <Turnstile site key whose SECRET is configured in
//                                  Supabase, and whose allowed hostnames include the
//                                  marketing domain + Vercel preview domains>
//
// Supabase stores a single Turnstile secret, so the token must come from that
// widget — a different widget's token is rejected as invalid-input-response.

export const CAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY || ''
export const CAPTCHA_ENABLED = Boolean(CAPTCHA_SITEKEY)

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const EXECUTE_TIMEOUT_MS = 20000

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  execute: (id: string) => void
  reset: (id: string) => void
  remove: (id: string) => void
}

// Load the Turnstile script once and resolve when its global is ready.
let scriptPromise: Promise<TurnstileApi> | null = null

function loadTurnstile(): Promise<TurnstileApi> {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const w = window as unknown as { turnstile?: TurnstileApi }
    if (w.turnstile) {
      resolve(w.turnstile)
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      let tries = 0
      const check = () => {
        if (w.turnstile) resolve(w.turnstile)
        else if (tries++ < 50) setTimeout(check, 100)
        else reject(new Error('Turnstile failed to initialise'))
      }
      check()
    }
    script.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

export type CaptchaHandle = {
  /** Run the invisible challenge and resolve with a fresh single-use token. */
  execute: () => Promise<string>
}

export const CaptchaWidget = forwardRef<CaptchaHandle, object>(
  function CaptchaWidget(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const apiRef = useRef<TurnstileApi | null>(null)
    const widgetIdRef = useRef<string | null>(null)
    const readyRef = useRef<Promise<void> | null>(null)
    const pendingRef = useRef<{
      resolve: (t: string) => void
      reject: (e: Error) => void
    } | null>(null)

    useImperativeHandle(ref, () => ({
      async execute() {
        if (!CAPTCHA_ENABLED) return ''
        await readyRef.current
        const api = apiRef.current
        const id = widgetIdRef.current
        if (!api || !id) throw new Error('captcha not ready')

        return new Promise<string>((resolve, reject) => {
          const timer = setTimeout(() => {
            if (pendingRef.current) {
              pendingRef.current = null
              reject(new Error('captcha timeout'))
            }
          }, EXECUTE_TIMEOUT_MS)

          pendingRef.current = {
            resolve: (t) => {
              clearTimeout(timer)
              resolve(t)
            },
            reject: (e) => {
              clearTimeout(timer)
              reject(e)
            },
          }

          try {
            // Tokens are single-use; reset before each run so retries get a fresh one.
            api.reset(id)
            api.execute(id)
          } catch (e) {
            clearTimeout(timer)
            pendingRef.current = null
            reject(e instanceof Error ? e : new Error('captcha execute failed'))
          }
        })
      },
    }))

    useEffect(() => {
      if (!CAPTCHA_ENABLED) return
      let cancelled = false

      readyRef.current = loadTurnstile()
        .then((api) => {
          if (cancelled || !containerRef.current || widgetIdRef.current) return
          apiRef.current = api
          widgetIdRef.current = api.render(containerRef.current, {
            sitekey: CAPTCHA_SITEKEY,
            execution: 'execute',
            appearance: 'interaction-only',
            callback: (token: string) => {
              pendingRef.current?.resolve(token)
              pendingRef.current = null
            },
            'error-callback': () => {
              pendingRef.current?.reject(new Error('captcha error'))
              pendingRef.current = null
            },
            'expired-callback': () => {
              pendingRef.current?.reject(new Error('captcha expired'))
              pendingRef.current = null
            },
          })
        })
        .catch(() => {
          /* surfaced to the user when execute() rejects */
        })

      return () => {
        cancelled = true
        if (apiRef.current && widgetIdRef.current) {
          try {
            apiRef.current.remove(widgetIdRef.current)
          } catch {}
          widgetIdRef.current = null
        }
      }
    }, [])

    if (!CAPTCHA_ENABLED) return null

    // Invisible: no visible UI. Kept in the tree so the widget has a mount point.
    return <div ref={containerRef} className="hidden" aria-hidden />
  },
)
