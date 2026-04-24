'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { links } from '@/lib/links'

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
    <section className="relative overflow-hidden bg-surface-alt pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-28 lg:pb-36">
      {/* soft radial glow behind the image cluster */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 50% at 78% 42%, rgba(255, 102, 0, 0.16), transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(0, 191, 255, 0.10), transparent 70%)',
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-8 lg:gap-16">
          {/* Copy column */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
              For coaches and stat trackers
            </span>

            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
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
          </div>

          {/* Image cluster column */}
          <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-none">
            {/* Primary card: portrait, orange, centre-ish */}
            <FloatCard
              float={{ duration: 7, delay: 0, travel: 10 }}
              className="absolute left-[10%] top-[8%] z-10 w-[60%] drop-shadow-xl"
            >
              <Placeholder
                label="Stat entry UI placeholder"
                tone="orange"
                aspect="4/5"
              />
            </FloatCard>

            {/* Secondary card: small square, blue, top-right */}
            <FloatCard
              float={{ duration: 5.5, delay: 0.6, travel: 8 }}
              className="absolute right-[2%] top-[0%] z-20 w-[38%] drop-shadow-xl"
            >
              <Placeholder
                label="Live score placeholder"
                tone="blue"
                aspect="1/1"
              />
            </FloatCard>

            {/* Tertiary card: wide rectangle, gray, bottom-left */}
            <FloatCard
              float={{ duration: 6.5, delay: 1.1, travel: 12 }}
              className="absolute left-[0%] bottom-[4%] z-20 w-[52%] drop-shadow-xl"
            >
              <Placeholder
                label="Player card placeholder"
                tone="gray"
                aspect="3/2"
              />
            </FloatCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
