import type { Metadata } from 'next'
import { Faq } from '@/components/sections/Faq'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { PricingHero } from '@/components/sections/PricingHero'
import { PricingPlans } from '@/components/sections/PricingPlans'
import { Testimonials } from '@/components/sections/Testimonials'
import { WhyPro } from '@/components/sections/WhyPro'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Pricing — Elevate Hockey Stats',
  description:
    "Start free with 3 PRO games. No credit card. Upgrade to PRO for $14/mo when you're ready to go deeper.",
}

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PricingHero />
        <PricingPlans />
        <Testimonials subhead="The trust we’ve earned, one Saturday morning rink at a time." />
        <WhyPro />
        <Faq />
      </main>
      <FooterCta
        headline="Start free. Upgrade anytime."
        subhead="3 PRO games. No card. No clock. Cancel in two taps."
        primaryCtaLabel="Get started free"
        primaryCtaHref={links.appSignup}
        secondaryLabel="Questions? Contact us"
        secondaryHref={links.contact}
      />
    </>
  )
}
