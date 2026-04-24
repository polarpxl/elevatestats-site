import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { links } from '@/lib/links'

type Tone = 'orange' | 'blue' | 'gray'

type UseCase = {
  title: string
  body: string
  tone: Tone
  placeholderLabel: string
}

const useCases: UseCase[] = [
  {
    title: 'Head coaches',
    body: 'See your bench in real time and adjust lines without losing track.',
    tone: 'orange',
    placeholderLabel: 'Bench view placeholder',
  },
  {
    title: 'Assistant coaches and parent trackers',
    body: 'No training required. If you can tap a phone, you can track a game.',
    tone: 'blue',
    placeholderLabel: 'Quick-tap placeholder',
  },
  {
    title: 'Team managers',
    body: 'Share polished post-game reports with families in one click.',
    tone: 'gray',
    placeholderLabel: 'Share report placeholder',
  },
]

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <article className="flex flex-col rounded-card bg-white p-6 ring-1 ring-black/5 shadow-sm md:p-8">
      <Placeholder
        label={useCase.placeholderLabel}
        tone={useCase.tone}
        aspect="4/3"
        className="w-full"
      />
      <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-ink">
        {useCase.title}
      </h3>
      <p className="mt-3 text-brand-gray">{useCase.body}</p>
      {/* TODO: link to matching anchor on /features once that page exists */}
      <Link
        href={links.features}
        className="mt-6 inline-flex items-center gap-1 font-heading text-sm font-semibold text-brand-orange transition-colors hover:text-[#E65C00]"
      >
        Learn more
        <span aria-hidden>&rarr;</span>
      </Link>
    </article>
  )
}

export function UseCases() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Who it&apos;s for
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Whoever&apos;s on the bench, we&apos;ve got you.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            From head coaches running the show to parent trackers filling in on a Tuesday night,
            the same clean workflow fits everyone.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.title} useCase={useCase} />
          ))}
        </div>
      </Container>
    </section>
  )
}
