import type { Metadata } from 'next'
import { Faq } from '@/components/sections/Faq'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { PricingHero } from '@/components/sections/PricingHero'
import { PricingPlans } from '@/components/sections/PricingPlans'
import { WhyPro } from '@/components/sections/WhyPro'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Pricing — Elevate Hockey Stats',
  description:
    'Start on the free plan forever. Upgrade to PRO for AI insights, shot maps, full player stats, and more.',
}

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PricingHero />
        <PricingPlans />
        <WhyPro />
        <Faq />
      </main>
      <FooterCta
        headline="Start free. Upgrade anytime."
        subhead="Three free PRO games. No card. No clock."
        primaryCtaLabel="Start free"
        primaryCtaHref={links.appHome}
        secondaryLabel="Questions? Contact us"
        secondaryHref={links.contact}
      />
    </>
  )
}
