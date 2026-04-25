import { Container } from '@/components/ui/Container'

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-surface-alt pt-20 pb-10 md:pt-32 md:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 0%, rgba(255, 102, 0, 0.14), transparent 70%)',
        }}
      />
      <Container className="relative text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
          Plans &amp; pricing
        </p>
        <h1 className="mt-4 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
          Pick your plan.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-gray md:text-xl md:leading-relaxed">
          Start free. Upgrade when the season heats up. Every plan unlocks unlimited tracking,
          with Pro adding the depth coaches need to see what&rsquo;s actually moving the needle.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm text-brand-gray md:text-base">
          Includes a <span className="font-semibold text-brand-orange">3-game Pro trial</span>.
          No credit card. No clock.
        </p>
      </Container>
    </section>
  )
}
