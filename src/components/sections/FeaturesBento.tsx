import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { ProChip } from '@/components/ui/ProChip'
import { cn } from '@/lib/cn'
import { links } from '@/lib/links'

import featureAiInsights from '../../../public/app/feature-ai-insights.webp'
import featureShotMapping from '../../../public/app/feature-shot-mapping.webp'
import featurePlayerProfile from '../../../public/app/feature-player-profile.webp'
import featureKeepers from '../../../public/app/feature-keepers.webp'
import featureOffline from '../../../public/app/feature-offline.webp'
import featureDetails from '../../../public/app/feature-details.webp'

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
  /** Tailwind class controlling horizontal padding around the image
      slot. Wider cards take more, narrower cards less, so the rendered
      screenshot feels comparably sized across the grid. */
  imagePadX?: string
  pro?: boolean
}

const features: Feature[] = [
  {
    title: 'AI insights powered by ElevateIQ',
    body: "Finalize the game and get coaching tips tailored to your team's trends. Built into the app, ready before the parking lot empties.",
    tone: 'orange',
    placeholderLabel: 'AI insights placeholder',
    placeholderAspect: '16/10',
    className: 'md:col-span-7',
    image: featureAiInsights,
    imageAlt: 'ElevateIQ post-game insight card for the Ridgeview Raptors',
    imageSizes: '(min-width: 1024px) 410px, (min-width: 768px) 320px, 76vw',
    imagePadX: 'px-[12%]',
    pro: true,
  },
  {
    title: 'Tap-to-track shot mapping',
    body: 'Goals, shots, misses and blocks. Tap the rink, the dot drops, the stats follow. Every event lands on the shot map, for both teams.',
    tone: 'blue',
    placeholderLabel: 'Shot map placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-5',
    image: featureShotMapping,
    imageAlt: 'Live tracker with shots and goals marked on the rink',
    imageSizes: '(min-width: 1024px) 285px, (min-width: 768px) 225px, 80vw',
    imagePadX: 'px-[10%]',
  },
  {
    title: 'Every player, on the page',
    body: 'Season stats, plus-minus, faceoffs and shot maps for every player. See how each one is actually doing, not just the team total.',
    tone: 'gray',
    placeholderLabel: 'Player stats placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-4',
    image: featurePlayerProfile,
    imageAlt: 'Player page with season stats, plus-minus and faceoffs',
    imageSizes: '(min-width: 1024px) 235px, (min-width: 768px) 185px, 88vw',
    imagePadX: 'px-[6%]',
    pro: true,
  },
  {
    title: 'Hand the phone to a parent',
    body: 'Invite a parent or team manager as your stats keeper. They sign up free, land on your team and track the game. Your roster and settings stay yours.',
    tone: 'orange',
    placeholderLabel: 'Stats keepers placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-4',
    image: featureKeepers,
    imageAlt: 'Manage screen with the stats keepers list and the invite button',
    imageSizes: '(min-width: 1024px) 235px, (min-width: 768px) 185px, 88vw',
    imagePadX: 'px-[6%]',
  },
  {
    title: 'Tracks even with no signal',
    body: "Cold arena, dead WiFi, no problem. Start the game with signal and tracking keeps going if the rink has none. Everything syncs the moment you're back online.",
    tone: 'blue',
    placeholderLabel: 'Offline sync placeholder',
    placeholderAspect: '4/3',
    className: 'md:col-span-4',
    image: featureOffline,
    imageAlt: 'Live tracker with no signal, still recording the game',
    imageSizes: '(min-width: 1024px) 235px, (min-width: 768px) 185px, 88vw',
    imagePadX: 'px-[6%]',
  },
  {
    title: 'The details coaches ask for',
    body: 'Plus-minus on every goal that counts. Faceoffs by zone. Power play and penalty kill by player. Goalie save percentage and GAA that follow mid-game swaps.',
    tone: 'gray',
    placeholderLabel: 'Game detail placeholder',
    placeholderAspect: '21/9',
    className: 'md:col-span-7 md:p-10 lg:p-12',
    image: featureDetails,
    imageAlt: 'Game detail page showing faceoffs won and lost by zone',
    imageSizes: '(min-width: 1024px) 450px, (min-width: 768px) 360px, 88vw',
    imagePadX: 'px-[6%]',
    pro: true,
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
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
          {feature.title}
        </h3>
        {feature.pro && <ProChip />}
      </div>
      <span aria-hidden className="brand-underline mt-3" />
      <p className="mt-4 text-brand-gray">{feature.body}</p>
      <div
        className={cn(
          'mt-7 flex flex-1 items-center',
          feature.imagePadX ?? 'px-[8%]',
        )}
      >
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

          <div className="flex flex-col justify-center px-2 text-center md:col-span-5 md:px-6 md:text-left lg:px-10">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
              More where this came from.
            </h3>
            <Link
              href={links.features}
              className="group mt-4 inline-flex items-center gap-2 self-center font-heading text-base font-semibold text-brand-orange md:self-start"
            >
              <span className="group-hover:underline underline-offset-4">
                See the full feature list
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
