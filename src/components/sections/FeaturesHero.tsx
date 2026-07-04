import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'
import ShotMapBackground from '@/components/sections/ShotMapBackground'

// Scrim gradients between the animated rink canvas and the live copy, keyed to
// the section surface (--color-surface-alt, #F7F7F8 = rgb(247,247,248)) so the
// fade reads as distance haze. The copy is centred here (unlike the old home
// hero), so the protection is a centre radial veil plus top/bottom fades.
// 1. Brand colour wash — warms the ice, adds depth.
const GLOW =
  'radial-gradient(50% 60% at 50% 0%, rgba(255,102,0,0.16), transparent 70%),' +
  'radial-gradient(40% 40% at 15% 75%, rgba(0,191,255,0.10), transparent 70%)'
// 2. Centre veil — protects the centred headline and subhead.
const CENTER_SCRIM =
  'radial-gradient(62% 58% at 50% 32%, rgba(247,247,248,0.9) 0%, rgba(247,247,248,0.62) 55%,' +
  ' rgba(247,247,248,0.2) 78%, rgba(247,247,248,0) 92%)'
// 3. Top/bottom scrim — soft veil under the menu, grounding fade at the bottom
//    where the montage sits.
const TOP_BOTTOM_SCRIM =
  'linear-gradient(180deg, rgba(247,247,248,0.3) 0%, rgba(247,247,248,0.1) 18%,' +
  ' rgba(247,247,248,0) 40%, rgba(247,247,248,0) 62%, rgba(247,247,248,0.78) 92%,' +
  ' rgba(247,247,248,0.92) 100%)'

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-surface-alt pt-12 md:pt-20 lg:pt-28">
      {/* 1. Animated "living shot-map" rink (z-0), moved here from the old
          home hero. On mobile, shift it down behind the montage (clear of the
          copy); on desktop, keep it centred behind the headline. */}
      <ShotMapBackground
        rinkTilt="Tilted"
        motionIntensity="Medium"
        className="[--shot-map-shift:40%] md:[--shot-map-shift:0%]"
      />

      {/* 2. Scrim layers (z-10) — warm the ice, then protect copy legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: GLOW }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: CENTER_SCRIM }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: TOP_BOTTOM_SCRIM }}
      />

      {/* 3. Live copy (z-20) */}
      <Container className="relative z-20 text-center">
        <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
          Features
        </span>

        <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
          Everything you need on the bench, and after.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-gray md:text-xl">
          Elevate Hockey Stats gives you pro-level tracking, insights, and reports. Three free
          PRO games to start. Free forever after that.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={links.appHome} variant="primary" size="lg" className="w-full sm:w-auto">
            Start free
          </Button>
          <Button href={links.pricing} variant="secondary" size="lg" className="w-full sm:w-auto">
            See pricing
          </Button>
        </div>

        <div className="relative mx-auto mt-12 aspect-[4096/2437] max-w-5xl md:mt-16">
          <Image
            src="/app/EHS-Feature-Hero.webp"
            alt="Elevate Stats app screens showing the game summary, shot map, and live tracking views on phone mockups."
            fill
            preload
            loading="eager"
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  )
}
