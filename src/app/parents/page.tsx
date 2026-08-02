import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { PoweredBy } from '@/components/ui/PoweredBy'
import { StartSignup } from '@/components/start/StartSignup'
import { Testimonials } from '@/components/sections/Testimonials'
import { MobileCtaBar } from '@/components/start/MobileCtaBar'
import { links } from '@/lib/links'

import phonePlayerStats from '../../../public/app/phone-player-stats.webp'
import boards from '@/assets/imagery/boards.webp'
import sticksTunnel from '@/assets/imagery/sticks-tunnel.webp'

// Low-prominence escape hatches for cautious visitors who want to vet us before
// signing up. New-tab so the funnel (this /parents tab) stays open behind them.
const footerLinks = [
  { label: 'About', href: links.about },
  { label: 'Features', href: links.features },
  { label: 'Pricing', href: links.pricing },
  { label: 'Contact', href: links.contact },
  { label: 'Privacy', href: links.privacy },
  { label: 'Terms', href: links.terms },
]

// Cold-traffic (paid Facebook) landing page. Single purpose: get a hockey parent
// to create a free account. Deliberately NO global nav or footer links — every
// exit is a lost conversion. The only exceptions are the legally-required
// Privacy/Terms links in the footer.
export const metadata: Metadata = {
  title: 'Know how your player is doing, every game | Elevate Stats',
  description:
    'See how your player is doing, every game. Track shots, goals, and trends from the stands, plus shot maps and AI game insights. Free to track, with 3 games of every PRO feature included. No credit card.',
  alternates: { canonical: '/parents' },
  // Paid-traffic landing page: intentionally kept out of organic search so it
  // doesn't compete with the main marketing pages. Flip to index:true only if
  // you decide you want it discoverable in Google.
  robots: { index: false, follow: false },
  // Page-specific social preview (otherwise it inherits the generic site card).
  openGraph: {
    type: 'website',
    siteName: 'Elevate Stats',
    locale: 'en_CA',
    url: '/parents',
    title: 'Track your player’s hockey stats, free',
    description:
      'Pro-level hockey stats for parents. Track shots, goals, and trends from the stands, with shot maps and AI insights. Free to track, with 3 games of every PRO feature included. No credit card.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Elevate Stats: pro-level stats for parents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track your player’s hockey stats, free',
    description:
      'Pro-level hockey stats for parents. Track shots, goals, and trends from the stands, with shot maps and AI insights. Free to track, with 3 games of every PRO feature included. No credit card.',
    images: ['/opengraph-image.png'],
  },
}

const benefits = [
  {
    title: 'Track every game in taps',
    body: 'Tap the ice, and the shot is logged. Goals, assists, shots, saves, from the stands or the bench. No spreadsheets, no clipboard.',
    icon: (
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
    ),
  },
  {
    title: 'See real progress, not just goals',
    body: 'Shot maps and season trends show where your player shoots from, how they’re trending, and what’s actually changing game over game.',
    icon: (
      <path d="M4 19V5m0 14h16M8 15l3-3 2 2 5-6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'AI insights after every game',
    body: 'Instant post-game breakdowns turn the numbers into plain English: what went well, what to work on next.',
    icon: (
      <path d="M12 3a6 6 0 0 1 3 11v3H9v-3a6 6 0 0 1 3-11zM9.5 21h5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function StartPage() {
  return (
    <main className="-mt-16 md:-mt-20">
      {/* One relative surface for the whole page. On lg the content scrolls in the
          left column while the signup form is pinned (sticky) in the right column;
          below lg it collapses to a single column with the form near the top.
          NOTE: no `overflow-hidden` here — it would break `position: sticky`. */}
      <section className="relative bg-surface-alt pb-16 lg:pb-24">
        {/* FULL-BLEED HERO IMAGE — edge-to-edge duotone "big-graphic takeover" that
            fades into the light page below. Copy and the signup card float over it.
            pointer-events-none so it never blocks the form. */}
        <div
          className="big-graphic pointer-events-none inset-x-0 top-0 h-[600px] lg:h-[680px]"
          style={{ position: 'absolute' }}
          aria-hidden
        >
          {/* Duotone base — deep Stats blue over the full image */}
          <div className="duotone duotone--stats-deep" style={{ position: 'absolute', inset: 0 }}>
            {/* LCP element — preloaded, never lazy. `preload` replaces the
                deprecated `priority` prop in Next 16. The clipped layer below
                resolves to this same optimized URL, so it costs one fetch. */}
            <Image src={sticksTunnel} alt="" fill sizes="100vw" preload placeholder="blur" className="object-cover" />
          </div>
          {/* Lighter Stats-blue layer, clipped on the arrow lean */}
          <div
            className="duotone duotone--stats"
            style={{ position: 'absolute', inset: 0, clipPath: 'polygon(54% 0,100% 0,100% 100%,34% 100%)' }}
          >
            {/* Second duotone layer of the same photo (not a duplicate) — the
                lighter Stats tone clipped to the arrow lean. Eager, not
                preloaded: `preload` is already on the base layer. */}
            <Image src={sticksTunnel} alt="" fill sizes="100vw" loading="eager" placeholder="blur" className="object-cover" />
          </div>
          {/* Orange glow stripes on the lean */}
          <div className="big-graphic__stripe" style={{ left: '64%' }} />
          <div className="big-graphic__stripe big-graphic__stripe--thin" style={{ left: '76%', opacity: 0.7 }} />
          {/* Scrim to protect copy legibility */}
          <div className="big-graphic__scrim" />
          {/* Hard bottom edge (no fade) — the signup card overhangs this line. */}
        </div>

        {/* Coaching doodles — decorative background in the right column, below the
            hero. z-0 keeps them under ALL Container content (form + text), so the
            sticky form glides over them on scroll and text stays readable. Desktop
            only. top offset ~ the hero image height so they live in the content. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[680px] bottom-0 z-0 hidden overflow-hidden lg:block"
          aria-hidden
        >
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/doodles/Coach-Doodle1-1.svg" alt="" className="absolute right-6 top-10 w-[300px] opacity-[0.4]" />
          <img src="/doodles/Coach-Doodle4-1.svg" alt="" className="absolute right-[360px] top-[300px] w-[110px] opacity-[0.35]" />
          <img src="/doodles/Coach-Doodle3-1.svg" alt="" className="absolute -right-12 top-[560px] w-[440px] opacity-[0.3]" />
          {/* eslint-enable @next/next/no-img-element */}
        </div>

        <Container className="relative z-10 pt-8 lg:pt-14">
          {/* Logo knocked out to white so it reads over the hero image. Swap in an
              official reversed asset here if the design system ships one. */}
          <div className="mb-6 flex justify-center lg:mb-10 lg:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-primary-wht.svg"
              alt="Elevate Stats"
              width={528}
              height={192}
              className="h-auto w-[221px] md:w-[255px]"
            />
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-x-16">
            {/* HERO COPY — white, floating over the full-bleed image */}
            <div className="order-1 text-center text-white lg:col-start-1 lg:row-start-1 lg:pt-6 lg:text-left">
              <span className="glass-chip">For hockey parents</span>

              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[3.1rem]">
                Know exactly how your player is doing. Every game.
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:mt-5 md:text-lg lg:mx-0">
                Track shots, goals, and trends from the stands, right on your phone. Free all
                season, no credit card. Your first 3 games also unlock every PRO feature, including
                personal shot maps and AI game insights.
              </p>

              {/* Reinforcing checklist — hidden on the smallest screens so the form
                  clears the fold; shown from sm up and in the desktop column. */}
              <ul className="mx-auto mt-7 hidden max-w-md flex-col gap-3 text-left sm:flex lg:mx-0">
                {[
                  'Tracking a game takes taps, not spreadsheets',
                  'Works at the rink, even with no signal',
                  '3 full-featured games free, no credit card',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-white/85">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIGNUP FORM — near the top on mobile; sticky right rail on lg.
                Spans both left-column rows so it stays pinned through the whole scroll. */}
            <div
              id="signup"
              className="order-2 mt-8 scroll-mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start lg:sticky lg:top-8"
            >
              <StartSignup />
            </div>

            {/* PERSUASION CONTENT — continues the scrolling left column.
                Extra top margin gives ~40px clearance below the hero image. */}
            <div className="order-3 mt-24 space-y-14 lg:col-start-1 lg:row-start-2 lg:mt-[104px] lg:space-y-20">
              {/* Benefits */}
              <div>
                <span className="brand-underline mx-auto lg:mx-0" />
                <h2 className="mt-5 text-center font-heading text-2xl font-bold text-ink md:text-3xl lg:text-left">
                  Your player’s whole season, in one place
                </h2>

                <ul className="mt-8 space-y-6">
                  {benefits.map((b) => (
                    <li key={b.title} className="flex items-start gap-4">
                      <span className="step-icon-ring inline-flex h-12 w-12 shrink-0 items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-6 w-6 text-brand-orange"
                          aria-hidden
                        >
                          {b.icon}
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-ink">{b.title}</h3>
                        <p className="mt-1 text-brand-gray">{b.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social proof — static on purpose. Auto-advancing quotes pull
                  attention away from the form on a paid landing page. */}
              <Testimonials
                autoplay={false}
                embedded
                heading="What hockey families say"
                authors={['Sarah K.', 'Tom R.']}
              />

              {/* Screenshot + trust */}
              <div className="grid items-center gap-8 sm:grid-cols-2">
                <div className="relative mx-auto w-[55%] max-w-[240px] sm:w-full">
                  <div className="rounded-[2.75rem] bg-surface-dark p-[10px] shadow-2xl ring-1 ring-white/10">
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-black">
                      <Image
                        src={phonePlayerStats}
                        alt="A player’s profile and shot map in the Elevate Stats app"
                        fill
                        sizes="(min-width: 640px) 240px, 55vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
                    Real stats. Real progress. Right from the stands.
                  </h2>
                  <p className="mt-3 text-brand-gray">
                    No clipboards, no guessing whether the good game was actually a good game.
                    Elevate Stats shows you your kid’s season the way pro teams see theirs. Tracking
                    is free forever, and your first 3 games include every PRO feature.
                  </p>
                  <p className="mt-5 font-heading text-sm font-semibold uppercase tracking-wide text-brand-gray/70">
                    Built by hockey parents and coaches · Your data stays private
                  </p>
                </div>
              </div>

              {/* Closing CTA — only below lg, where the form isn't pinned in view.
                  On lg the sticky form is the persistent call to action. */}
              <div className="rounded-card bg-brand-orange px-8 py-10 text-center shadow-xl lg:hidden">
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                  Start tracking your player’s season today
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-white/90">
                  Free forever plan. No credit card. You can be set up before the next game.
                </p>
                <a
                  href="#signup"
                  className="mt-7 inline-flex h-13 items-center justify-center rounded-full bg-white px-8 font-heading text-base font-semibold text-brand-orange shadow-lg shadow-black/10 transition-colors hover:bg-white/95"
                >
                  Create my free account
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION-BAND — full-bleed duotone stat strip (design move #5). Real numbers,
          chunky Poppins-900 over a Stats-blue duotone photo with a legibility scrim. */}
      <section className="relative overflow-hidden bg-surface-dark">
        <div className="duotone duotone--stats" style={{ position: 'absolute', inset: 0 }} aria-hidden>
          {/* Below the fold — stays lazy (next/image default). Full-bleed band,
              so it renders at viewport width. */}
          <Image src={boards} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        </div>
        <div className="band-scrim" aria-hidden />
        <Container className="relative z-[2]">
          <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-10 py-16 text-center text-white md:py-24">
            {[
              { num: '2 min', label: 'To set up your team' },
              { num: '1 tap', label: 'To log a shot' },
              { num: '$0', label: 'To track all season' },
            ].map((stat) => (
              <div key={stat.label} className="relative pt-5">
                <span className="absolute left-1/2 top-0 h-1.5 w-11 -translate-x-1/2 rounded-full bg-brand-orange" />
                <span className="block font-heading text-6xl font-black leading-none tracking-tight md:text-7xl">
                  {stat.num}
                </span>
                <span className="mt-3 block font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/90 md:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Minimal text footer — muted escape hatches, all open in a new tab so the
          landing page stays open behind them. No top nav by design. */}
      {/* Extra bottom padding on mobile so the sticky CTA bar can't cover the
          footer links when scrolled all the way down. */}
      <footer className="border-t border-black/5 bg-surface-alt pt-10 pb-28 lg:pb-10">
        <Container>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-gray/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col items-center gap-3">
            {/* Branded bug line — the standard Elevate Sports Labs attribution.
                `!text-` overrides the component's dark-bg white so it reads on this
                light footer (the wordmark follows currentColor). */}
            <PoweredBy className="!text-brand-gray/70" />
            <p className="text-xs text-brand-gray/50">
              © {new Date().getFullYear()} Elevate Sports Labs · All rights reserved.
            </p>
          </div>
        </Container>
      </footer>

      {/* Mobile-only sticky CTA back to the form (hidden while the form is on screen). */}
      <MobileCtaBar />
    </main>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path d="M8 12.5l2.5 2.5 5.5-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
