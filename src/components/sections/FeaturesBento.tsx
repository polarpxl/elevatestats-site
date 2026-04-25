import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { cn } from '@/lib/cn'

type Tone = 'orange' | 'blue' | 'gray'

type Feature = {
  title: string
  body: string
  tone: Tone
  placeholderLabel: string
  placeholderAspect: string
  className: string
}

const features: Feature[] = [
  {
    title: 'Tap-to-track shot mapping',
    body: "Goals, shots, misses, blocks. Tap the rink, dot drops, stats follow. Faster than your scorekeeper's clipboard.",
    tone: 'orange',
    placeholderLabel: 'Shot map placeholder',
    placeholderAspect: '16/10',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'AI insights after every game',
    body: "Finalize the game and get coaching tips tailored to your team's trends. Built into the app, ready before the parking lot empties.",
    tone: 'blue',
    placeholderLabel: 'AI insights placeholder',
    placeholderAspect: '4/3',
    className: '',
  },
  {
    title: 'Tracks even with no signal',
    body: "Cold arena, dead WiFi, no problem. Track the whole game offline and everything syncs the moment you're back online.",
    tone: 'gray',
    placeholderLabel: 'Offline sync placeholder',
    placeholderAspect: '4/3',
    className: '',
  },
  {
    title: 'Goalies, done right',
    body: 'Save percentage, GAA, mid-game swaps. Stats follow the right goalie automatically. No spreadsheet gymnastics.',
    tone: 'orange',
    placeholderLabel: 'Goalie stats placeholder',
    placeholderAspect: '4/3',
    className: '',
  },
  {
    title: 'Built for pond to pro',
    body: 'From U9 house league to Junior A. Same app, same workflow.',
    tone: 'blue',
    placeholderLabel: 'Age group placeholder',
    placeholderAspect: '16/9',
    className: 'md:col-span-2',
  },
]

function FeatureTile({ feature }: { feature: Feature }) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-card bg-white p-6 ring-1 ring-black/5 shadow-sm md:p-8',
        feature.className,
      )}
    >
      <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
        {feature.title}
      </h3>
      <p className="mt-3 text-brand-gray">{feature.body}</p>
      <div className="mt-6 flex-1">
        <Placeholder
          label={feature.placeholderLabel}
          tone={feature.tone}
          aspect={feature.placeholderAspect}
          className="h-full w-full"
        />
      </div>
    </article>
  )
}

export function FeaturesBento() {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Everything in one place
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Built for the bench, not the boardroom.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            The tools coaches actually reach for on game day, in one simple workflow.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {features.map((feature) => (
            <FeatureTile key={feature.title} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}
