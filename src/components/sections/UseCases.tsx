import { Container } from '@/components/ui/Container'

type IconProps = { className?: string }

function WhistleIcon({ className }: IconProps) {
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
      <path d="M3 11c0-2.8 2.2-5 5-5h6.5l4.5-2 2.5 1v9l-2.5 1-4.5-2H8c-2.8 0-5-1.2-5-2z" />
      <circle cx="6.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function HockeyStickIcon({ className }: IconProps) {
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
      <path d="M19 3l-12 12" />
      <path d="M7 15l-3 3h5" />
      <ellipse cx="15" cy="20" rx="3" ry="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FamilyIcon({ className }: IconProps) {
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
      <circle cx="5.5" cy="7.5" r="2.4" />
      <path d="M1.8 18c0-2.6 1.7-4.5 3.7-4.5s3.7 1.9 3.7 4.5" />
      <circle cx="18.5" cy="7.5" r="2.4" />
      <path d="M14.8 18c0-2.6 1.7-4.5 3.7-4.5s3.7 1.9 3.7 4.5" />
      <circle cx="12" cy="13" r="1.8" />
      <path d="M9.6 20c0-1.7 1.1-3.2 2.4-3.2s2.4 1.5 2.4 3.2" />
    </svg>
  )
}

type UseCase = {
  title: string
  body: string
  Icon: (props: IconProps) => React.ReactElement
}

const useCases: UseCase[] = [
  {
    title: 'Coaches',
    body: "See your bench in real time. Spot the line that's working, the player who's hot, the matchup to watch. Make in-game adjustments without flipping through a notebook.",
    Icon: WhistleIcon,
  },
  {
    title: 'Players',
    body: "See where you're shooting from, where your goals are coming from, and how you're trending game-to-game. The data parents and coaches see, you see too.",
    Icon: HockeyStickIcon,
  },
  {
    title: 'Parents',
    body: "Follow your kid's season without standing at the boards trying to count shots. Stats are there when the game ends, win or lose.",
    Icon: FamilyIcon,
  },
]

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const { Icon } = useCase
  return (
    <article className="flex flex-col rounded-card bg-white p-6 ring-1 ring-black/5 shadow-sm md:p-8">
      <div className="step-icon-ring flex h-28 w-28 items-center justify-center md:h-32 md:w-32">
        <Icon className="h-12 w-12 text-ink/80 md:h-14 md:w-14" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-ink">
        {useCase.title}
      </h3>
      <p className="mt-3 text-brand-gray">{useCase.body}</p>
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
            Coaches track. Players grow. Parents see.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            One app. Three perspectives. Everyone gets the data that matters to them.
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
