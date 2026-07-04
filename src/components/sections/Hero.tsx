'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'

import heroStatBars from '../../../public/app/hero-stat-bars.webp'
import sticksTunnel from '../../../public/imagery/sticks-tunnel.jpg'

// Big-graphic hero (design system v2): two duotone layers of the same photo.
// The base takes the deep Stats tone; the upper layer, clipped on the arrow
// lean, takes the lighter tone. Inline position styles (not utilities) because
// elevate-treatments.css is unlayered and its `.duotone { position: relative }`
// would win over Tailwind's layered `absolute`.
const ARROW_LEAN_CLIP = 'polygon(54% 0, 100% 0, 100% 100%, 34% 100%)'

function FloatingPhone({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="big-graphic relative -mt-16 overflow-hidden bg-surface-dark pt-28 pb-16 text-white md:-mt-20 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
      {/* Bleed the section up behind the fixed glass header (body adds pt-16/20
          to clear it), so the duotone photo runs edge to edge under it. */}

      {/* 1. Duotone base — deep Stats tone, full bleed */}
      <div className="duotone duotone--stats-deep" style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={sticksTunnel}
          alt=""
          fill
          preload
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 2. Duotone upper layer — lighter Stats tone, clipped on the arrow lean */}
      <div
        aria-hidden
        className="duotone duotone--stats"
        style={{ position: 'absolute', inset: 0, clipPath: ARROW_LEAN_CLIP }}
      >
        <Image
          src={sticksTunnel}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 3. Orange glow stripes on the lean */}
      <div className="big-graphic__stripe" style={{ left: '60%' }} />
      <div className="big-graphic__stripe big-graphic__stripe--thin" style={{ left: '72%', opacity: 0.7 }} />

      {/* 4. Copy scrim — protects the headline column on the left */}
      <div className="big-graphic__scrim" />

      {/* 5. Mobile-only tint — the copy spans the full width there, including
          the lighter duotone zone, so it needs a stronger even scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgba(8,10,14,0.45)] md:hidden"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-16">
          {/* Copy column */}
          <div className="text-center md:text-left">
            <span className="glass-chip">For hockey coaches and stat trackers</span>

            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              <span className="whitespace-nowrap">Pro-level</span> hockey stats, without the{' '}
              <span className="whitespace-nowrap">pro-level</span> workload.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80 md:mx-0 md:text-xl">
              Elevate Hockey Stats helps amateur coaches capture, share, and learn from every
              shift, right from the bench.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
              <Button href={links.appHome} variant="primary" size="lg" className="w-full shadow-lg shadow-brand-orange/40 sm:w-auto">
                Start free
              </Button>
              <Button href={links.pricing} variant="onDark" size="lg" className="w-full sm:w-auto">
                See pricing
              </Button>
            </div>

            <p className="mt-5 text-sm text-white/70">
              Free forever plan includes 3 pro-level games. No credit card.
            </p>
            <p className="mt-2 text-sm text-white/60">
              iPhone, iPad, web-based. No install.
            </p>
          </div>

          {/* Phone column — one framed real app shot */}
          <div className="mx-auto w-[min(240px,72%)] md:w-[min(270px,90%)] md:justify-self-center">
            <FloatingPhone>
              <div className="rounded-[2.5rem] bg-surface-dark p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.9rem] bg-black">
                  <Image
                    src={heroStatBars}
                    alt="Player stat bar chart in the Elevate Hockey Stats app"
                    fill
                    sizes="(min-width: 768px) 270px, 240px"
                    className="object-cover object-top"
                    preload
                  />
                </div>
              </div>
            </FloatingPhone>
          </div>
        </div>
      </Container>
    </section>
  )
}
