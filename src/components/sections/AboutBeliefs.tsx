import { Container } from '@/components/ui/Container'

const beliefs = [
  {
    headline: 'Amateur hockey deserves pro-level tools.',
    body: 'The kids playing Saturday morning games deserve the same caliber of analytics as the pros.',
  },
  {
    headline: 'Built for the rink, not the boardroom.',
    body: 'Cold hands. Bad wifi. Three minutes between periods. Every design decision starts there.',
  },
  {
    headline: 'Coaches over corporations.',
    body: 'We answer to the people on the bench, not to enterprise sales targets.',
  },
]

export function AboutBeliefs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <h2 className="text-center font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
          What we believe
        </h2>
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-10 md:mt-16 md:gap-12">
          {beliefs.map((b) => (
            <div key={b.headline} className="text-center">
              <p className="font-heading text-xl font-bold leading-snug text-ink md:text-2xl">
                {b.headline}
              </p>
              <p className="mt-3 text-base text-brand-gray md:text-lg">{b.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
