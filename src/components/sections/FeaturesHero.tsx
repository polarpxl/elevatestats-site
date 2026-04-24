import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { links } from '@/lib/links'

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-surface-alt pt-12 pb-20 md:pt-20 md:pb-24 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 0%, rgba(255, 102, 0, 0.16), transparent 70%)',
        }}
      />
      <Container className="relative text-center">
        <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
          Features
        </span>

        <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
          Everything you need on the bench, and after.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-gray md:text-xl">
          Elevate Hockey Stats gives you pro-level tracking, insights, and reports. Three free
          PRO games to start. Free forever after that.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={links.appHome} variant="primary" size="lg" className="w-full sm:w-auto">
            Start free
          </Button>
          <Button href={links.pricing} variant="secondary" size="lg" className="w-full sm:w-auto">
            See pricing
          </Button>
        </div>

        <div className="mx-auto mt-12 max-w-5xl md:mt-16">
          <Placeholder
            label="Features overview placeholder"
            tone="orange"
            aspect="16/9"
            className="w-full"
          />
        </div>
      </Container>
    </section>
  )
}
