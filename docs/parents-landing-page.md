# `/parents` — Paid-traffic signup landing page

Single-purpose landing page for cold Facebook traffic (hockey parents). One action:
create a free account. No global nav/footer, no competing CTAs.

## Files

- `src/app/parents/page.tsx` — static Server Component: copy, layout, benefits,
  product screenshot, final CTA, minimal legal footer. `robots: noindex` (ad LP).
  (The signup components still live under `src/components/start/` — internal names,
  not tied to the route.)
- `src/components/start/StartSignup.tsx` — `'use client'` island: the form, Google
  OAuth, UTM capture, Meta Pixel event, and redirect logic.
- `src/components/start/CaptchaWidget.tsx` — invisible Cloudflare Turnstile widget,
  run in execute-on-submit mode (no visible UI; fresh single-use token per submit).
- `src/lib/supabase-browser.ts` — lazy singleton Supabase browser client (code-split
  so only `/parents` pulls in `@supabase/supabase-js`).

## How signup works (matches the app exactly)

Talks to the same Supabase project the app uses (`cpozdpirlccmgdrtdyrj`).

- **Email/password:** `auth.signUp({ email, password, options: { data: { name },
  emailRedirectTo, captchaToken } })`. `name` in user metadata is what the app's
  `create_profile_on_signup` trigger reads to create the `profiles` row.
  Email confirmation is ON (`mailer_autoconfirm=false`), so `signUp` returns no
  session — the page shows a **"Check your email"** state; the emailed link lands the
  user logged into the app.
- **Google:** `signInWithOAuth({ provider: 'google', redirectTo: <this /parents URL> })`.
  On return, the island completes the session, fires the Pixel on our domain, then
  forwards into `app.elevatestats.app` with the session tokens in the URL hash (the
  app's Supabase client picks them up — a session created on the marketing domain
  does not otherwise cross origins).

## Attribution

- **Meta Pixel `CompleteRegistration`** fires on account creation, via both
  `window.fbq` (if present) and a `dataLayer.push({ event: 'CompleteRegistration' })`
  so it works whether the Pixel is inline or fired through GTM.
- **UTMs / GA4:** `utm_*`, `fbclid`, `gclid` are captured from the URL, stashed across
  the Google round-trip, pushed to `dataLayer` (as `CompleteRegistration` + `sign_up`),
  and appended to the app redirect for downstream GA4 attribution.

## Environment variables (`.env.local` — mirror into Vercel)

| Var | Value | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cpozdpirlccmgdrtdyrj.supabase.co` | public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_…` | public client key |
| `NEXT_PUBLIC_CAPTCHA_SITEKEY` | Turnstile site key | **must set** — see below |

## Remaining config to go fully live

1. **Captcha (required for signup):** Supabase auth enforces Cloudflare Turnstile
   (Invisible). Supabase stores a **single Turnstile secret**, so the token must come
   from the widget that owns that secret — a different widget's token is rejected as
   `invalid-input-response`. Two valid setups:
   - **A (simplest):** add `elevatestats.app` + the marketing repo's Vercel preview
     domains to the app's *existing* Turnstile widget's allowed hostnames, and set
     `NEXT_PUBLIC_CAPTCHA_SITEKEY` to that widget's site key. No Supabase/app change.
   - **B:** create one new Invisible widget whose hostnames cover *all* origins (app +
     marketing + both previews), set Supabase's Turnstile secret to the new widget's
     secret, and point the app at the new site key too. Then set
     `NEXT_PUBLIC_CAPTCHA_SITEKEY` here.
   A marketing-only widget with Supabase left unchanged will silently fail every signup.
   Verified working end-to-end with Cloudflare's test key — the invisible challenge
   runs on submit, the token is generated and attached, and Supabase processes it;
   only the real site key (matching the Supabase secret) is missing.
2. **Google OAuth redirect allow-list:** add the marketing origins to Supabase →
   Authentication → URL Configuration → Redirect URLs:
   `http://localhost:3000/parents`, the Vercel preview URL(s), and
   `https://elevatestats.app/parents` (+ `https://www.elevatestats.app/parents` if used).
3. **GTM tag:** add a tag that fires the Meta Pixel `CompleteRegistration` (and the GA4
   `sign_up` event) on the `CompleteRegistration` dataLayer event.

## Verified (end-to-end, real signup on 2026-07-02)

- Renders clean on mobile (form above the fold) and desktop (two-column hero), no
  console errors.
- Invisible Turnstile challenge runs on submit and its token is accepted by Supabase
  (real site key `0x4AAAAAADW-ANmSPNozzp65`, hostnames incl. `localhost`).
- A real email/password signup created the `auth.users` row (provider `email`,
  `email_confirmed: false`) **and** the `profiles` row via the trigger
  (`display_name` = entered name, `plan: free`, `role: owner`) — parity with the app.
- The "Check your email" state shows; no session returned (confirmation required).
- Meta Pixel `CompleteRegistration` fired via both `fbq` and `dataLayer`, carrying the
  UTMs (`utm_source/medium/campaign`); a `sign_up` event fired too.
- Test account was deleted after verification.
- **Not yet tested:** the full Google OAuth round-trip (wired, but needs the redirect
  URLs allow-listed — item 2 above — and a real Google login).
