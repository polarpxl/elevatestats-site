'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'
import ShotMapBackground from '@/components/sections/ShotMapBackground'

import heroAiInsights from '../../../public/app/hero-ai-insights.webp'
import heroStatBars from '../../../public/app/hero-stat-bars.webp'
import heroTrackingWheel from '../../../public/app/hero-tracking-wheel.webp'

// Scrim gradients layered between the animated rink canvas and the live hero
// copy. Stops are keyed to the hero surface (--color-surface-alt, #F7F7F8 =
// rgb(247,247,248)) so the fade reads as distance haze, not a grey film.
// 1. Brand colour wash — warms the ice, adds depth.
const GLOW =
  'radial-gradient(55% 50% at 78% 42%, rgba(255,102,0,0.16), transparent 70%),' +
  'radial-gradient(40% 40% at 20% 80%, rgba(0,191,255,0.10), transparent 70%)'
// 2. Left-to-right scrim — protects the headline column on the left.
const LEFT_SCRIM =
  'linear-gradient(100deg, rgba(247,247,248,0.92) 0%, rgba(247,247,248,0.74) 30%,' +
  ' rgba(247,247,248,0.42) 50%, rgba(247,247,248,0.14) 66%, rgba(247,247,248,0) 80%)'
// 3. Top/bottom scrim — soft veil under the menu, distance-fade up top,
//    grounding fade at the bottom.
const TOP_BOTTOM_SCRIM =
  'linear-gradient(180deg, rgba(247,247,248,0.18) 0%, rgba(247,247,248,0.1) 13%,' +
  ' rgba(247,247,248,0.04) 30%, rgba(247,247,248,0) 50%, rgba(247,247,248,0) 80%,' +
  ' rgba(247,247,248,0.72) 100%)'

type FloatProps = {
  duration: number
  delay: number
  travel: number
}

function FloatCard({
  children,
  float,
  className,
}: {
  children: React.ReactNode
  float: FloatProps
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -float.travel, 0] }}
      transition={{
        duration: float.duration,
        delay: float.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden bg-surface-alt pt-28 pb-16 md:-mt-20 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24">
      {/* Bleed the section up behind the fixed glass header (body adds pt-16/20
          to clear it). The extra top padding here keeps the copy in place while
          the animated rink fills the strip behind the frosted header bar. */}
      {/* 1. Animated "living shot-map" rink (z-0).
          On mobile, shift it down behind the phone cluster (clear of the copy);
          on desktop, raise it so a sliver tucks up under the glass header. */}
      <ShotMapBackground
        rinkTilt="Tilted"
        motionIntensity="Medium"
        className="[--shot-map-shift:42%] md:[--shot-map-shift:0%]"
      />

      {/* 2. Scrim layers (z-10) — warm the ice, then protect copy legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: GLOW }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: LEFT_SCRIM }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: TOP_BOTTOM_SCRIM }}
      />

      {/* 3. Existing live-text hero (z-20) — sits on top, untouched */}
      <Container className="relative z-20">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-8 lg:items-start lg:gap-16">
          {/* Copy column */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
              For hockey coaches and stat trackers
            </span>

            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:relative lg:z-10 lg:w-[125%] lg:text-6xl">
              <span className="whitespace-nowrap">Pro-level</span> hockey stats, without the{' '}
              <span className="whitespace-nowrap">pro-level</span> workload.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg text-brand-gray md:mx-0 md:text-xl">
              Elevate Hockey Stats helps amateur coaches capture, share, and learn from every
              shift, right from the bench.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
              <Button href={links.appHome} variant="primary" size="lg" className="w-full sm:w-auto">
                Start free
              </Button>
              <Button href={links.pricing} variant="secondary" size="lg" className="w-full sm:w-auto">
                See pricing
              </Button>
            </div>

            <p className="mt-5 text-sm text-brand-gray/80">
              Free forever plan includes 3 pro-level games. No credit card.
            </p>
            <p className="mt-2 text-sm text-brand-gray/70">
              iPhone, iPad, web-based. No install.
            </p>
          </div>

          {/* Image cluster column */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:max-w-none">
            {/* Phone (dominant): stat-bars screenshot inside an abstract frame */}
            <FloatCard
              float={{ duration: 7, delay: 0, travel: 10 }}
              className="absolute left-1/2 top-0 z-10 w-[58%] -translate-x-1/2 md:w-[55%]"
            >
              <div className="rounded-[2.75rem] bg-surface-dark p-[10px] shadow-2xl ring-1 ring-white/10">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-black">
                  <Image
                    src={heroStatBars}
                    alt="Player stat bar chart in the Elevate Hockey Stats app"
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 240px, 55vw"
                    className="object-cover object-top"
                    preload
                  />
                </div>
              </div>
            </FloatCard>

            {/* Loose panel: tracking wheel (square), top-right */}
            <FloatCard
              float={{ duration: 5.5, delay: 0.6, travel: 8 }}
              className="absolute right-[-2%] top-[6%] z-20 w-[40%]"
            >
              <div className="ui-tile overflow-hidden rounded-2xl">
                <Image
                  src={heroTrackingWheel}
                  alt="Shot-tracking wheel showing rink zones"
                  sizes="(min-width: 1024px) 200px, (min-width: 768px) 170px, 38vw"
                  className="h-auto w-full"
                  preload
                />
              </div>
            </FloatCard>

            {/* Loose panel: AI insights (landscape), bottom-left */}
            <FloatCard
              float={{ duration: 6.5, delay: 1.1, travel: 12 }}
              className="absolute left-[-6%] bottom-[6%] z-20 w-[54%]"
            >
              <div className="ui-tile overflow-hidden rounded-2xl">
                <Image
                  src={heroAiInsights}
                  alt="AI-generated coaching insights card"
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 230px, 52vw"
                  className="h-auto w-full"
                  preload
                />
              </div>
            </FloatCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
