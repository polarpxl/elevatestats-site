import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'

type FooterLink = { label: string; href: string; internal: boolean }

const productLinks: FooterLink[] = [
  { label: 'Features', href: links.features, internal: true },
  { label: 'Pricing', href: links.pricing, internal: true },
  // TODO: point at /changelog when the page ships
  { label: 'Changelog', href: '#', internal: true },
  // TODO: point at /roadmap when the page ships
  { label: 'Roadmap', href: '#', internal: true },
]

const companyLinks: FooterLink[] = [
  // TODO: point at /about when the page ships
  { label: 'About', href: '#', internal: true },
  { label: 'Blog', href: links.blog, internal: true },
  // TODO: point at /contact when the page ships
  { label: 'Contact', href: '#', internal: true },
]

const legalLinks: FooterLink[] = [
  // TODO: point at /privacy when the page ships
  { label: 'Privacy', href: '#', internal: true },
  // TODO: point at /terms when the page ships
  { label: 'Terms', href: '#', internal: true },
]

// Placeholder social links; wire up real URLs later
const socialLinks: FooterLink[] = [
  { label: 'Twitter', href: '#', internal: false },
  { label: 'YouTube', href: '#', internal: false },
  { label: 'Instagram', href: '#', internal: false },
]

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = 'text-white/70 transition-colors hover:text-white'
  if (link.internal) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
    </a>
  )
}

function LinkColumn({ heading, items }: { heading: string; items: FooterLink[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-white">
        {heading}
      </h3>
      <ul className="mt-5 flex flex-col gap-3 text-sm">
        {items.map((link) => (
          <li key={link.label}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function GradientCta() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          'linear-gradient(135deg, #FF6600 0%, #FF3D7F 55%, #00BFFF 100%)',
      }}
    >
      {/* subtle noise-like darker radial for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 120%, rgba(0, 0, 0, 0.25), transparent 70%)',
        }}
      />
      <Container className="relative text-center">
        <h2 className="font-heading text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
          Ready to elevate your game?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
          Your next whistle is the right time. Free forever plan, no card required.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href={links.appHome} variant="onBrand" size="lg">
            Start free
          </Button>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-surface-dark pt-16 text-white/80 md:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/brandmark.png"
              alt="Elevate Hockey Stats"
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm text-white/70">
              Pro-level hockey stats, without the pro-level workload.
            </p>
            <p className="mt-6 text-xs text-white/50">
              &copy; 2026 Elevate Sports Labs Inc.
            </p>
          </div>

          <LinkColumn heading="Product" items={productLinks} />
          <LinkColumn heading="Company" items={companyLinks} />
          <LinkColumn heading="Legal" items={legalLinks} />
        </div>

        <div className="safe-bottom mt-16 flex flex-col items-start gap-4 border-t border-white/10 pt-6 pb-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>Made in Canada.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <FooterLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

export function FooterCta() {
  return (
    <>
      <GradientCta />
      <Footer />
    </>
  )
}
