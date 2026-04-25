import type { ReactElement } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'

type IconProps = { className?: string }

function PlayerIcon({ className }: IconProps) {
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
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      <circle cx="18.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

function SparkleIcon({ className }: IconProps) {
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
      <path d="M12 3l1.8 4.9L18.7 9.7 13.8 11.5 12 16.4 10.2 11.5 5.3 9.7 10.2 7.9z" />
      <path d="M18.5 16l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" />
      <path d="M5 14l.5 1.2 1.2.5-1.2.5L5 17.4l-.5-1.2L3.3 15.7l1.2-.5z" />
    </svg>
  )
}

function VaultIcon({ className }: IconProps) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="13" cy="12" r="3.2" />
      <path d="M13 8.8v.8M13 14.4v.8M16.2 12h.8M9 12h.8" />
      <path d="M5 19v1.5M19 19v1.5" />
    </svg>
  )
}

type Row = {
  eyebrow: string
  headline: string
  body: string
  Icon: (props: IconProps) => ReactElement
}

const rows: Row[] = [
  {
    eyebrow: "Know who's doing the work",
    headline: 'Every shot, goal, and assist tied to a player.',
    body: 'On Free, every event belongs to your team. On Pro, every event belongs to a player. See who’s getting chances from the slot, who’s shooting from the perimeter, who’s actually driving your offence.',
    Icon: PlayerIcon,
  },
  {
    eyebrow: 'Coaching tips after every game',
    headline: 'AI breakdowns that catch what you missed.',
    body: 'After every finalized game, Pro generates 3 to 4 coaching insights tailored to your team. Defensive patterns, scoring trends, special teams gaps. The kind of read that used to take a Sunday morning of video.',
    Icon: SparkleIcon,
  },
  {
    eyebrow: 'Never lose what you tracked',
    headline: 'Cancel anytime. Your data stays put.',
    body: 'Drop to Free, come back next season, your stats are exactly where you left them. We never delete game data. The plan just controls what’s visible. Upgrade later and everything reappears, including AI insights from past games.',
    Icon: VaultIcon,
  },
]

function VisualPlaceholder({ Icon, flipped }: { Icon: Row['Icon']; flipped: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-card ring-1 ring-black/5',
        flipped
          ? 'bg-gradient-to-br from-brand-blue/15 via-brand-pink/10 to-brand-orange/15'
          : 'bg-gradient-to-tr from-brand-orange/15 via-brand-pink/10 to-brand-blue/15',
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Icon className="h-24 w-24 text-ink/70 md:h-28 md:w-28" />
      </div>
    </div>
  )
}

export function WhyPro() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Why upgrade
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            The Pro difference.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            Free covers game day. Pro tells you the story the data is telling.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {rows.map((row, i) => {
            const flipped = i % 2 === 1
            return (
              <div
                key={row.headline}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className={cn(flipped && 'md:order-2')}>
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                    {row.eyebrow}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-ink md:text-3xl">
                    {row.headline}
                  </h3>
                  <p className="mt-4 text-lg text-brand-gray">{row.body}</p>
                </div>
                <div className={cn(flipped && 'md:order-1')}>
                  <VisualPlaceholder Icon={row.Icon} flipped={flipped} />
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
