import { Container } from '@/components/ui/Container'

type IconProps = { className?: string }

// Icon paths sourced from Lucide (lucide.dev). Inlined to match the
// codebase convention of no icon-library dependency.
function ClipboardListIcon({ className }: IconProps) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}

function TargetIcon({ className }: IconProps) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function UsersRoundIcon({ className }: IconProps) {
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
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
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
    Icon: ClipboardListIcon,
  },
  {
    title: 'Players',
    body: "See where you're shooting from, where your goals are coming from, and how you're trending game-to-game. The data parents and coaches see, you see too.",
    Icon: TargetIcon,
  },
  {
    title: 'Parents',
    body: "Follow your kid's season without standing at the boards trying to count shots. Stats are there when the game ends, win or lose.",
    Icon: UsersRoundIcon,
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
