import type { ReactElement } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'

type IconProps = { className?: string }

function TrophyIcon({ className }: IconProps) {
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
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a3 3 0 0 0 3 3" />
      <path d="M17 6h3a3 3 0 0 1-3 3" />
      <path d="M10 14h4l-.5 3h-3z" />
      <path d="M8 20h8" />
      <path d="M12 17v3" />
    </svg>
  )
}

function SnowflakeIcon({ className }: IconProps) {
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
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M4.9 4.9l14.2 14.2" />
      <path d="M19.1 4.9L4.9 19.1" />
      <path d="M9 4l3 2 3-2" />
      <path d="M9 20l3-2 3 2" />
      <path d="M4 9l2 3-2 3" />
      <path d="M20 9l-2 3 2 3" />
    </svg>
  )
}

function UsersIcon({ className }: IconProps) {
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
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M16 14h.5c2.5 0 4.5 2 4.5 4.5V20" />
    </svg>
  )
}

type Belief = {
  headline: string
  body: string
  Icon: (props: IconProps) => ReactElement
  gradient: 'a' | 'b' | 'c'
}

const beliefs: Belief[] = [
  {
    headline: 'Amateur hockey deserves pro-level tools.',
    body: 'The kids playing Saturday morning games deserve the same caliber of analytics as the pros.',
    Icon: TrophyIcon,
    gradient: 'a',
  },
  {
    headline: 'Built for the rink, not the boardroom.',
    body: 'Cold hands. Bad wifi. Three minutes between periods. Every design decision starts there.',
    Icon: SnowflakeIcon,
    gradient: 'b',
  },
  {
    headline: 'Coaches over corporations.',
    body: 'We answer to the people on the bench, not to enterprise sales targets.',
    Icon: UsersIcon,
    gradient: 'c',
  },
]

const gradients: Record<Belief['gradient'], string> = {
  a: 'bg-gradient-to-tr from-brand-orange/20 via-brand-pink/15 to-brand-blue/20',
  b: 'bg-gradient-to-br from-brand-blue/20 via-brand-pink/15 to-brand-orange/20',
  c: 'bg-gradient-to-tr from-brand-pink/20 via-brand-orange/15 to-brand-blue/20',
}

function VisualPlaceholder({
  Icon,
  gradient,
}: {
  Icon: Belief['Icon']
  gradient: Belief['gradient']
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-card ring-1 ring-black/5',
        gradients[gradient],
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Icon className="h-1/2 w-1/2 text-ink/70" />
      </div>
    </div>
  )
}

export function AboutBeliefs() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            What we believe
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Three things we won&rsquo;t compromise on.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {beliefs.map((b) => (
            <article
              key={b.headline}
              className="flex flex-col rounded-card bg-surface-alt p-6 ring-1 ring-black/5 md:p-7"
            >
              <VisualPlaceholder Icon={b.Icon} gradient={b.gradient} />
              <h3 className="mt-6 font-heading text-xl font-extrabold leading-tight tracking-tight text-ink md:text-2xl">
                {b.headline}
              </h3>
              <p className="mt-3 text-brand-gray">{b.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
