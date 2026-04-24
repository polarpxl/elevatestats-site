import { Container } from '@/components/ui/Container'

type IconProps = { className?: string }

function SparkleIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l1.8 4.9L18.7 9.7 13.8 11.5 12 16.4 10.2 11.5 5.3 9.7 10.2 7.9z" />
      <path d="M18 16l.9 2.1 2.1.9-2.1.9L18 22l-.9-2.1-2.1-.9 2.1-.9z" />
    </svg>
  )
}

function MapPinIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function DownloadIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 19h16" />
    </svg>
  )
}

type Value = {
  title: string
  body: string
  Icon: (props: IconProps) => React.ReactElement
}

const values: Value[] = [
  {
    title: 'AI Insights',
    body: 'Post-game AI breakdowns that tell you what actually moved the needle.',
    Icon: SparkleIcon,
  },
  {
    title: 'Shot Maps',
    body: 'See exactly where every shot came from, for and against.',
    Icon: MapPinIcon,
  },
  {
    title: 'CSV Export',
    body: 'Your data, your way. Bring it anywhere.',
    Icon: DownloadIcon,
  },
]

export function WhyPro() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Why PRO
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Upgrade when you&rsquo;re ready to go deeper.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            The free plan covers game day. PRO is for coaches who want to see the story the data
            is telling.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {values.map(({ title, body, Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-card bg-surface-alt p-6 ring-1 ring-black/5 md:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 text-brand-gray">{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
