import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GradientPhoneFrame } from '@/components/ui/GradientPhoneFrame'
import { links } from '@/lib/links'

import ctaPhone from '../../../public/app/cta-phone.webp'

export function CtaPanel() {
  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <Container>
        <div className="relative rounded-[2rem] bg-surface-dark px-8 py-5 text-white ring-1 ring-white/10 shadow-xl md:px-14 md:py-8">
          {/* glow: warm in the bottom-right, cool in the top-left for depth.
              Wrapped so it stays clipped to the panel even though the panel
              itself no longer hides overflow (the phone breaks out the top). */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(50% 60% at 85% 85%, rgba(255, 102, 0, 0.30), transparent 70%), radial-gradient(40% 50% at 10% 0%, rgba(0, 191, 255, 0.18), transparent 70%)',
              }}
            />
            {/* Quiet arrow-pattern corner fade (design system v2) — the one
                permitted use on the site. Inline position because the class
                comes from unlayered elevate-treatments.css. */}
            <div aria-hidden className="arrow-pattern arrow-pattern--corner" style={{ opacity: 0.1 }} />
          </div>

          <div className="relative grid items-center gap-10 text-center md:grid-cols-[1.22fr_1fr] md:gap-8 md:text-left">
            <div>
              <h2 className="font-heading text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
                The rink is waiting.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-white/70 md:mx-0">
                Start free with your next game. No credit card. No time limit.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
                <Button
                  href={links.appHome}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Create your team
                </Button>
                <Button
                  href={links.pricing}
                  variant="onDark"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  See the free plan
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-[60%] max-w-[260px] md:-mt-28 md:w-[70%] md:max-w-[280px] lg:-mt-36 lg:w-[64%]">
                <GradientPhoneFrame
                  src={ctaPhone}
                  alt="Elevate Hockey Stats app on a phone"
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 240px, 60vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
