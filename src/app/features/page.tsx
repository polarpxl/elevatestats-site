import type { Metadata } from 'next'
import { CategorySection } from '@/components/sections/CategorySection'
import { FeaturesHero } from '@/components/sections/FeaturesHero'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { featureCategories } from '@/lib/features'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Features — Elevate Hockey Stats',
  description:
    'Live game tracking, team and season analytics, and a rink-ready PWA. Everything you need on the bench, and after.',
}

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 md:pt-20">
        <FeaturesHero />
        {featureCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </main>
      <FooterCta
        headline="Ready to elevate your team?"
        subhead="Three free PRO games. No card. No clock."
        primaryCtaLabel="Start tracking free"
        primaryCtaHref={links.appHome}
        secondaryLabel="See pricing"
        secondaryHref={links.pricing}
      />
    </>
  )
}
