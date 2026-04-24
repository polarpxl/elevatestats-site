import { Container } from '@/components/ui/Container'

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-surface-alt pt-12 pb-12 md:pt-20 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 0%, rgba(255, 102, 0, 0.14), transparent 70%)',
        }}
      />
      <Container className="relative text-center">
        <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
          Pick your plan.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-brand-gray md:text-xl">
          Start on the free plan forever. Upgrade to PRO when the season heats up.
        </p>
      </Container>
    </section>
  )
}
