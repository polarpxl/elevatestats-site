import type { Metadata } from 'next'
import { CategorySection } from '@/components/sections/CategorySection'
import { FeaturesHero } from '@/components/sections/FeaturesHero'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { featureCategories } from '@/lib/features'
import { links } from '@/lib/links'

const title = 'Features | Elevate Stats'
const description =
  'Live game tracking, team and season analytics, an app that installs on any phone, and stats keeper invites so you never track alone. Everything you need on the bench, and after.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/features' },
  openGraph: { title, description, url: '/features' },
  twitter: { title, description },
}

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main>
        <FeaturesHero />
        {featureCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </main>
      <FooterCta
        headline="Ready to elevate your team?"
        subhead="Free forever. Unlimited team tracking, plus 3 PRO games. No card."
        primaryCtaLabel="Start tracking free"
        primaryCtaHref={links.appHome}
        secondaryLabel="See pricing"
        secondaryHref={links.pricing}
      />
    </>
  )
}
