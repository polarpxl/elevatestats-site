import { BlogPreview } from '@/components/sections/BlogPreview'
import { CtaPanel } from '@/components/sections/CtaPanel'
import { FeaturesBento } from '@/components/sections/FeaturesBento'
import { FooterCta } from '@/components/sections/FooterCta'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Nav } from '@/components/sections/Nav'
import { Testimonials } from '@/components/sections/Testimonials'
import { UseCases } from '@/components/sections/UseCases'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16 md:pt-20">
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
