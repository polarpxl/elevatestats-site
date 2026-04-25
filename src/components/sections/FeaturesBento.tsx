import Image, { type StaticImageData } from 'next/image'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { cn } from '@/lib/cn'

import featureShotMapping from '../../../public/app/feature-shot-mapping.webp'
import featureAiInsights from '../../../public/app/feature-ai-insights.webp'
import featureOffline from '../../../public/app/feature-offline.webp'
import featureGoalies from '../../../public/app/feature-goalies.webp'
import featurePlayerProfile from '../../../public/app/feature-player-profile.webp'
import featureLandscape from '../../../public/app/feature-landscape.webp'

type Tone = 'orange' | 'blue' | 'gray'

type Feature = {
  title: string
  body: string
  tone: Tone
  placeholderLabel: string
  placeholderAspect: string
  className: string
  image?: StaticImageData
  imageAlt?: string
  imageSizes?: string
}

const features: Feature[] = [
  {
    title: 'Tap-to-track shot mapping',
    body: "Goals, shots, misses, blocks. Tap the rink, dot drops, stats follow. Colour-coded by position so the shot map tells you who's shooting from where.",
    tone: 'orange',
    placeholderLabel: 'Shot map placeholder',
    placeholderAspect: '16/10',
    className: 'md:col-span-7',
    image: featureShotMapping,
    imageAlt: 'Shot map showing colour-coded shot locations on a hockey rink',
    imageSizes: '(min-width: 1024px) 480px, (min-width: 768px) 380px, 84vw',
  },
  {
    title: 'AI insights after every game',
    body: "Finalize the game and get coaching tips tailored to your team's trends. Built into the app, ready before the parking lot empties.",
    tone: 'blue',
    placeholderLabel: 'AI insights placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-5',
    image: featureAiInsights,
    imageAlt: 'Post-game AI coaching insights card',
    imageSizes: '(min-width: 1024px) 340px, (min-width: 768px) 270px, 84vw',
  },
  {
    title: 'Tracks even with no signal',
    body: "Cold arena, dead WiFi, no problem. Track the whole game offline and everything syncs the moment you're back online.",
    tone: 'gray',
    placeholderLabel: 'Offline sync placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-4',
    image: featureOffline,
    imageAlt: 'Offline sync indicator with queued game data',
    imageSizes: '(min-width: 1024px) 270px, (min-width: 768px) 210px, 84vw',
  },
  {
    title: 'Goalies, done right',
    body: 'Save percentage, GAA, mid-game swaps. Stats follow the right goalie automatically. No spreadsheet gymnastics.',
    tone: 'orange',
    placeholderLabel: 'Goalie stats placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-4',
    image: featureGoalies,
    imageAlt: 'Goalie save percentage and GAA stats card',
    imageSizes: '(min-width: 1024px) 270px, (min-width: 768px) 210px, 84vw',
  },
  {
    title: 'Every player, on the page',
    body: 'Individual stats, shot maps, performance trends. See how each player is actually doing, not just the team total.',
    tone: 'blue',
    placeholderLabel: 'Player stats placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-4',
    image: featurePlayerProfile,
    imageAlt: 'Individual player profile with stats and shot trends',
    imageSizes: '(min-width: 1024px) 270px, (min-width: 768px) 210px, 84vw',
  },
  {
    title: 'The whole rink, in landscape',
    body: 'Rotate to landscape for the full-rink view. Works on phone or tablet, more room to read the play.',
    tone: 'gray',
    placeholderLabel: 'Landscape rink placeholder',
    placeholderAspect: '21/9',
    className: 'md:col-span-12 md:p-10 lg:p-12',
    image: featureLandscape,
    imageAlt: 'Full-rink landscape view of in-game shot tracking',
    imageSizes: '(min-width: 1024px) 830px, (min-width: 768px) 640px, 84vw',
  },
]

function FeatureTile({ feature }: { feature: Feature }) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-card bg-[#FAFAFA] p-7 shadow-md md:p-9',
        feature.className,
      )}
    >
      <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
        {feature.title}
      </h3>
      <span aria-hidden className="brand-underline mt-3" />
      <p className="mt-4 text-brand-gray">{feature.body}</p>
      <div className="mt-7 flex-1 px-[8%]">
        {feature.image ? (
          <Image
            src={feature.image}
            alt={feature.imageAlt ?? ''}
            sizes={feature.imageSizes}
            className="ui-screenshot h-auto w-full rounded-2xl"
          />
        ) : (
          <Placeholder
            label={feature.placeholderLabel}
            tone={feature.tone}
            aspect={feature.placeholderAspect}
            className="h-full w-full"
          />
        )}
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

        <div className="mt-12 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          {features.map((feature) => (
            <FeatureTile key={feature.title} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}
