import type { Metadata } from 'next'
import { CtaPanel } from '@/components/sections/CtaPanel'
import { FeaturesBento } from '@/components/sections/FeaturesBento'
import { FooterCta } from '@/components/sections/FooterCta'
import { HashScrollOnMount } from '@/components/sections/HashScrollOnMount'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Nav } from '@/components/sections/Nav'
import { StatBand } from '@/components/sections/StatBand'
import { Testimonials } from '@/components/sections/Testimonials'
import { UseCases } from '@/components/sections/UseCases'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://elevatesportslabs.com/#organization',
  name: 'Elevate Sports Labs Inc.',
  url: 'https://elevatesportslabs.com',
  logo: 'https://elevatestats.app/icon.png',
  email: 'hello@elevatesportslabs.com',
  foundingLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressRegion: 'ON', addressCountry: 'CA' },
  },
  founder: { '@type': 'Person', name: 'Darrin Moss' },
}

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://elevatestats.app/#software',
  name: 'Elevate Stats',
  url: 'https://elevatestats.app',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Elevate Stats is a hockey stats tracking app for amateur coaches. Capture, share, and learn from every shift, right from the bench, even when the rink has no signal.',
  publisher: { '@id': 'https://elevatesportslabs.com/#organization' },
  screenshot: [
    'https://elevatestats.app/app/feature-shot-mapping.webp',
    'https://elevatestats.app/app/feature-player-profile.webp',
    'https://elevatestats.app/app/feature-ai-insights.webp',
  ],
  featureList: [
    'Live game tracking on a rink visual',
    'Player and goalie stats',
    'Shot maps and zone analysis',
    'AI coaching insights after every game',
    'Opponent analysis',
    'Full season analytics',
    'Works offline at the rink',
    'CSV import and export',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'CAD',
      url: 'https://elevatestats.app/pricing',
    },
    {
      '@type': 'Offer',
      name: 'PRO (monthly)',
      price: '14',
      priceCurrency: 'CAD',
      url: 'https://elevatestats.app/pricing',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '14',
        priceCurrency: 'CAD',
        billingDuration: 1,
        unitCode: 'MON',
      },
    },
    {
      '@type': 'Offer',
      name: 'PRO (yearly)',
      price: '109',
      priceCurrency: 'CAD',
      url: 'https://elevatestats.app/pricing',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '109',
        priceCurrency: 'CAD',
        billingDuration: 1,
        unitCode: 'ANN',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <HashScrollOnMount />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema).replace(/</g, '\\u003c') }}
      />
      <Nav />
      <main>
        <Hero />
        <FeaturesBento />
        <HowItWorks />
        <UseCases />
        <StatBand />
        <Testimonials />
        <CtaPanel />
      </main>
      <FooterCta />
    </>
  )
}
