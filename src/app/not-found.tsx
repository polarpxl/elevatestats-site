import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Page not found | Elevate Stats',
  description: "That page isn't here. Head home or check support.",
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-surface-alt py-8 md:py-12 lg:py-16">
          <Container>
            <div className="text-center">
              <span className="sr-only">Error 404 — page not found.</span>
              <p
                aria-hidden="true"
                className="font-heading text-7xl font-extrabold leading-none tracking-tight text-ink md:text-8xl lg:text-9xl"
              >
                404
              </p>
            </div>
          </Container>

          {/* Off-side rink line: full-bleed sibling of Container */}
          <div className="mt-4 h-15 w-full bg-brand-blue md:mt-6 md:h-18" />

          <Container>
            <div className="text-center">
              <h1 className="mt-8 font-heading text-4xl font-extrabold tracking-tight text-ink md:mt-10 md:text-5xl lg:text-6xl">
                Off-side.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-brand-gray md:text-xl">
                You&apos;re a step ahead of us. That page isn&apos;t here yet.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/" variant="primary" size="lg">
                  Take me home
                </Button>
                <Button href={links.support} variant="secondary" size="lg">
                  Visit support
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <FooterCta />
    </>
  )
}
