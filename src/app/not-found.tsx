import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Page not found — Elevate Hockey Stats',
  description: "That page isn't here. Head home or check support.",
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-surface-alt py-20 md:py-28 lg:py-32">
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
          <div className="relative mt-4 md:mt-6">
            <div className="h-1.5 w-full bg-brand-blue md:h-2" />
            {/* Skid marks crossing the line, slightly left of center */}
            <svg
              aria-hidden="true"
              viewBox="0 0 40 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="absolute left-[28%] -top-1 h-4 w-10 text-ink/40 md:-top-1.5 md:h-5 md:w-12"
            >
              <line x1="6" y1="2" x2="14" y2="14" />
              <line x1="22" y1="2" x2="30" y2="14" />
            </svg>
          </div>

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
