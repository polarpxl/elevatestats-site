import { Container } from '@/components/ui/Container'

export function AboutHero() {
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
        <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
          About
        </span>
        <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
          Built for amateur hockey, by people who&rsquo;ve coached it.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-gray md:text-xl">
          We&rsquo;re bringing pro-level analytics to the rinks where it matters most: the ones
          with kids, parents, and volunteer coaches trying to help their teams get better.
        </p>
      </Container>
    </section>
  )
}
