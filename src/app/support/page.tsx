import type { Metadata } from 'next'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { SupportCategoryBlock } from '@/components/sections/SupportCategoryBlock'
import { MarketingContactForm } from '@/components/sections/MarketingContactForm'
import { SupportHero } from '@/components/sections/SupportHero'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'
import { supportCategories } from '@/lib/support'
import { getArticlesByCategory } from '@/lib/support-articles'

const title = 'Support | Elevate Stats'
const description =
  'Guides, answers, and how-tos for Elevate Stats. Browse by topic or drop us a line.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/support' },
  openGraph: { title, description, url: '/support' },
  twitter: { title, description },
}

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main>
        <SupportHero />

        <section className="bg-white py-16 md:py-24">
          <Container>
            <div className="flex flex-col gap-16 md:gap-20">
              {supportCategories.map((category) => (
                <SupportCategoryBlock
                  key={category.id}
                  category={category}
                  articles={getArticlesByCategory(category.id)}
                />
              ))}
            </div>
          </Container>
        </section>

        <section id="contact" className="scroll-mt-24 bg-brand-blue/5 py-16 md:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <div>
                <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                  Still stuck?
                </h2>
                <p className="mt-4 text-lg text-brand-gray">
                  Drop us a line and we&rsquo;ll help you sort it out.
                </p>
                <p className="mt-4 text-sm text-brand-gray/80">
                  We usually respond within one business day.
                </p>
              </div>
              <MarketingContactForm formType="support" idPrefix="support-contact" />
            </div>
          </Container>
        </section>
      </main>
      <FooterCta
        headline="Ready to get back to coaching?"
        subhead="Free forever. Unlimited team tracking, plus 3 PRO games. No card."
        primaryCtaLabel="Start free"
        primaryCtaHref={links.appHome}
        secondaryLabel="See pricing"
        secondaryHref={links.pricing}
      />
    </>
  )
}
