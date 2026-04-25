import { BlogPreview } from '@/components/sections/BlogPreview'
import { CtaPanel } from '@/components/sections/CtaPanel'
import { FeaturesBento } from '@/components/sections/FeaturesBento'
import { FooterCta } from '@/components/sections/FooterCta'
import { HashScrollOnMount } from '@/components/sections/HashScrollOnMount'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Nav } from '@/components/sections/Nav'
import { Testimonials } from '@/components/sections/Testimonials'
import { UseCases } from '@/components/sections/UseCases'

export default function Home() {
  return (
    <>
      <HashScrollOnMount />
      <Nav />
      <main>
        <Hero />
        <FeaturesBento />
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <CtaPanel />
        <BlogPreview />
      </main>
      <FooterCta />
    </>
  )
}
