import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { links } from '@/lib/links'

export function CtaPanel() {
  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark p-8 text-white ring-1 ring-white/10 shadow-xl md:p-14">
          {/* glow: warm in the bottom-right, cool in the top-left for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 60% at 85% 85%, rgba(255, 102, 0, 0.30), transparent 70%), radial-gradient(40% 50% at 10% 0%, rgba(0, 191, 255, 0.18), transparent 70%)',
            }}
          />

          <div className="relative grid items-center gap-10 text-center md:grid-cols-2 md:gap-12 md:text-left">
            <div>
              <h2 className="font-heading text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
                The rink is waiting.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-white/70 md:mx-0">
                Start free with your next game. No card, no clock on the free tier.
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

            <div>
              <Placeholder
                label="Game view placeholder"
                tone="dark"
                aspect="4/3"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
