import { Container } from '@/components/ui/Container'

export function AboutMissionVision() {
  return (
    <section className="bg-surface-alt py-16 md:py-24">
      <Container>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-card bg-white p-8 ring-1 ring-black/5 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-brand-blue/15 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Mission
            </span>
            <p className="mt-5 font-heading text-xl font-semibold leading-snug text-ink">
              Revolutionize the way amateur hockey players, coaches, and teams track, analyze,
              and improve their performance.
            </p>
          </article>
          <article className="rounded-card bg-white p-8 ring-1 ring-black/5 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-brand-orange/15 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
              Vision
            </span>
            <p className="mt-5 font-heading text-xl font-semibold leading-snug text-ink">
              Become the leading digital performance analytics tool for amateur hockey worldwide.
            </p>
          </article>
        </div>
      </Container>
    </section>
  )
}
