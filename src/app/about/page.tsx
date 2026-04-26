import type { Metadata } from 'next'
import { AboutBeliefs } from '@/components/sections/AboutBeliefs'
import { AboutFounder } from '@/components/sections/AboutFounder'
import { AboutHero } from '@/components/sections/AboutHero'
import { AboutStory } from '@/components/sections/AboutStory'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'

export const metadata: Metadata = {
  title: 'About — Elevate Hockey Stats',
  description:
    'Built for amateur hockey, by people who have coached it. Pro-level analytics for the rinks where it matters most.',
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
