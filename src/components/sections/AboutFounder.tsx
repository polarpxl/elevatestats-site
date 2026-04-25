import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'

export function AboutFounder() {
  return (
    <section className="bg-surface-alt py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-base text-brand-gray md:text-lg">
            Elevate Stats is built by{' '}
            <span className="font-semibold text-ink">Darrin Moss</span>, a hockey parent and
            product builder based in Ontario, Canada. Have feedback or want to chat?{' '}
            <Link
              href={links.contact}
              className="font-medium text-brand-orange underline-offset-4 hover:underline"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}
