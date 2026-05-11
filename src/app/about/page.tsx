import type { Metadata } from 'next'
import { AboutBeliefs } from '@/components/sections/AboutBeliefs'
import { AboutFounder } from '@/components/sections/AboutFounder'
import { AboutHero } from '@/components/sections/AboutHero'
import { AboutStory } from '@/components/sections/AboutStory'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'

const title = 'About — Elevate Hockey Stats'
const description =
  'Built for amateur hockey, by people who have coached it. Pro-level analytics for the rinks where it matters most.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { title, description, url: '/about' },
  twitter: { title, description },
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <AboutBeliefs />
        <AboutStory />
        <AboutFounder />
      </main>
      <FooterCta />
    </>
  )
}
