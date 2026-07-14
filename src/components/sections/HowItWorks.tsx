import Image, { type StaticImageData } from 'next/image'
import { Container } from '@/components/ui/Container'

import howitworksSignup from '../../../public/app/howitworks-signup.webp'
import howitworksRoster from '../../../public/app/howitworks-roster.webp'
import howitworksTracking from '../../../public/app/howitworks-tracking.webp'

type Step = {
  number: string
  title: string
  body: string
  image: StaticImageData
  imageAlt: string
  imageSizes: string
  Icon: (props: { className?: string }) => React.ReactElement
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  )
}

function RosterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="17" rx="2" />
      <path d="M9 3.5h6v3H9z" fill="currentColor" stroke="none" />
      <path d="M8 11h8M8 14.5h8M8 18h5" />
    </svg>
  )
}

function TargetRinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </svg>
  )
}

const STEP_SIZES = '(min-width: 1024px) 230px, (min-width: 768px) 180px, 100vw'

const steps: Step[] = [
  {
    number: '01',
    title: 'Sign up, free.',
    body: 'Three free Pro games. No credit card, no account required for players or parents. Just an email to get started.',
    image: howitworksSignup,
    imageAlt: 'Email signup form for Elevate Stats',
    imageSizes: STEP_SIZES,
    Icon: EnvelopeIcon,
  },
  {
    number: '02',
    title: 'Add your team and opponents.',
    body: "Import rosters and opponent lists from a CSV, or add players manually if you're starting from scratch. Set up the rest of your season schedule whenever you're ready.",
    image: howitworksRoster,
    imageAlt: 'Team roster card with player names',
    imageSizes: STEP_SIZES,
    Icon: RosterIcon,
  },
  {
    number: '03',
    title: 'Track your first game.',
    body: 'Tap once per shift, dot the rink for shots. The app handles ice time, plus-minus, and line combinations automatically. AI coaching insights drop in after the final whistle, ready before the parking lot empties.',
    image: howitworksTracking,
    imageAlt: 'In-game tracking wheel for shot location entry',
    imageSizes: STEP_SIZES,
    Icon: TargetRinkIcon,
  },
]

function StepRow({ step }: { step: Step }) {
  const { Icon } = step
  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
      {/* Icon — circular gradient ring */}
      <div className="flex justify-center md:col-span-3 md:justify-start">
        <div className="step-icon-ring flex h-32 w-32 items-center justify-center md:h-36 md:w-36 lg:h-40 lg:w-40">
          <Icon className="h-14 w-14 text-ink/80 md:h-16 md:w-16 lg:h-[72px] lg:w-[72px]" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center md:col-span-6 md:text-left">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
          Step {step.number}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
          {step.title}
        </h3>
        <p className="mx-auto mt-4 max-w-prose text-lg text-brand-gray md:mx-0">
          {step.body}
        </p>
      </div>

      {/* UI snippet */}
      <div className="md:col-span-3">
        <Image
          src={step.image}
          alt={step.imageAlt}
          sizes={step.imageSizes}
          className="ui-screenshot h-auto w-full rounded-2xl"
        />
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

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {steps.map((step) => (
            <StepRow key={step.number} step={step} />
          ))}
        </div>
      </Container>
    </section>
  )
}
