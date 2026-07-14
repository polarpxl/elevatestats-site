import type { Metadata } from 'next'
import { ContactInfoBlock } from '@/components/sections/ContactInfoBlock'
import { FooterCta } from '@/components/sections/FooterCta'
import { MarketingContactForm } from '@/components/sections/MarketingContactForm'
import { Nav } from '@/components/sections/Nav'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'

const title = 'Contact | Elevate Stats'
const description =
  "Have a question, partnership idea, or feedback? Drop us a line and we'll get back to you."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title, description, url: '/contact' },
  twitter: { title, description },
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-white py-16 md:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <ContactInfoBlock />
              <MarketingContactForm formType="contact" idPrefix="contact-page" />
            </div>
          </Container>
        </section>
      </main>
      <FooterCta
        eyebrow="Ready to track smarter?"
        headline="Start free. Unlimited team tracking. No card."
        subhead="Spin up a team, track a game, and share a pro-quality report before the Zamboni hits the ice."
        primaryCtaLabel="Get started free"
        primaryCtaHref={links.appSignup}
        secondaryLabel="See pricing"
        secondaryHref={links.pricing}
      />
    </>
  )
}
