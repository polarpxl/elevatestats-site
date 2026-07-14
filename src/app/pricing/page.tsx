import type { Metadata } from 'next'
import { Faq } from '@/components/sections/Faq'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { PricingHero } from '@/components/sections/PricingHero'
import { PricingPlans } from '@/components/sections/PricingPlans'
import { Testimonials } from '@/components/sections/Testimonials'
import { WhyPro } from '@/components/sections/WhyPro'
import { faqs } from '@/lib/faqs'
import { links } from '@/lib/links'

const title = 'Pricing | Elevate Stats'
const description =
  "Start free with 3 PRO games. No credit card. Upgrade to PRO for $14/mo when you're ready to go deeper."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: { title, description, url: '/pricing' },
  twitter: { title, description },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
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
