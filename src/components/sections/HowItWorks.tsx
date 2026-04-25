import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { cn } from '@/lib/cn'

type Tone = 'orange' | 'blue' | 'gray'

type Step = {
  number: string
  title: string
  body: string
  tone: Tone
  placeholderLabel: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Sign up, free.',
    body: 'Three free Pro games. No credit card. Just an email.',
    tone: 'blue',
    placeholderLabel: 'Sign up placeholder',
  },
  {
    number: '02',
    title: 'Add your team.',
    body: 'Import a roster from a CSV or add players manually. No accounts needed for players or parents.',
    tone: 'orange',
    placeholderLabel: 'Team setup placeholder',
  },
  {
    number: '03',
    title: 'Track your first game.',
    body: 'Tap once per shift, dot the rink for shots. The app handles ice time, plus-minus, and line combinations automatically. AI insights drop in after the final whistle.',
    tone: 'gray',
    placeholderLabel: 'Game tracking placeholder',
  },
]

function StepRow({ step, index }: { step: Step; index: number }) {
  // On md+, odd-indexed rows (0, 2) put the image on the right: flip order so text comes first.
  // Even-indexed row (1) uses the natural order so image lands on the left.
  const imageRight = index % 2 === 0

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
      <div className={cn(imageRight && 'md:order-2')}>
        <Placeholder
          label={step.placeholderLabel}
          tone={step.tone}
          aspect="4/3"
          className="w-full"
        />
      </div>

      <div className={cn(imageRight && 'md:order-1')}>
        <div
          aria-hidden
          className="font-heading text-6xl font-extrabold leading-none tracking-tight text-brand-orange/20 md:text-7xl"
        >
          {step.number}
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-4 text-lg text-brand-gray">{step.body}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface-alt py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            How it works
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Three taps from whistle to wrap-up.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            From signup to your first game, here&apos;s the path.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {steps.map((step, index) => (
            <StepRow key={step.number} step={step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
