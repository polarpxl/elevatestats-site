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
  name: 'Elevate Stats',
  url: 'https://elevatestats.app',
  logo: 'https://elevatestats.app/icon.png',
}

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Elevate Hockey Stats',
  url: 'https://elevatestats.app',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'The simplest way for amateur hockey coaches and stat trackers to capture, share, and learn from pro-quality game stats.',
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
      category: 'free',
    },
    {
      '@type': 'Offer',
      name: 'PRO (monthly)',
      price: '14',
      priceCurrency: 'CAD',
      billingDuration: 'P1M',
    },
    {
      '@type': 'Offer',
      name: 'PRO (yearly)',
      price: '109',
      priceCurrency: 'CAD',
      billingDuration: 'P1Y',
    },
  ],
}

export default function Home() {
  return (
    <>
      <HashScrollOnMount />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
