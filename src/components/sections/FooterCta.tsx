import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { links } from '@/lib/links'

type FooterLink = { label: string; href: string; internal: boolean }

const productLinks: FooterLink[] = [
  { label: 'Home', href: '/', internal: true },
  { label: 'Pricing', href: links.pricing, internal: true },
  { label: 'Features', href: links.features, internal: true },
  { label: 'Support', href: links.support, internal: true },
]

const companyLinks: FooterLink[] = [
  { label: 'About', href: links.about, internal: true },
  { label: 'Contact', href: links.contact, internal: true },
]

const legalLinks: FooterLink[] = [
  { label: 'Privacy', href: links.privacy, internal: true },
  { label: 'Terms', href: links.terms, internal: true },
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

type GradientCtaContent = {
  eyebrow?: string
  headline: string
  subhead: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

function SecondaryLink({ label, href }: { label: string; href: string }) {
  const classes =
    'inline-flex items-center gap-1 font-heading text-sm font-semibold text-white underline-offset-4 transition-colors hover:underline'
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  )
}

function GradientCta({
  eyebrow,
  headline,
  subhead,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryLabel,
  secondaryHref,
}: GradientCtaContent) {
  const hasSecondary = Boolean(secondaryLabel && secondaryHref)
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          'linear-gradient(135deg, var(--color-brand-orange) 0%, var(--color-brand-pink) 55%, var(--color-brand-blue) 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 120%, rgba(0, 0, 0, 0.25), transparent 70%)',
        }}
      />
      <Container className="relative text-center">
        {eyebrow && (
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            'font-heading text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl',
            eyebrow && 'mt-4',
          )}
        >
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">{subhead}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Button href={primaryCtaHref} variant="onBrand" size="lg">
            {primaryCtaLabel}
          </Button>
          {hasSecondary && <SecondaryLink label={secondaryLabel!} href={secondaryHref!} />}
        </div>
      </Container>
    </section>
  )
}

const DEFAULT_GRADIENT: GradientCtaContent = {
  headline: 'Ready to elevate your game?',
  subhead: 'Your next whistle is the right time. Free forever plan, no card required.',
  primaryCtaLabel: 'Start free',
  primaryCtaHref: links.appHome,
}

type SocialIconProps = { className?: string }

function XIcon({ className }: SocialIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon({ className }: SocialIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

type SocialEntry = {
  label: string
  href: string
  Icon: (props: SocialIconProps) => React.ReactElement
}

function SocialLinks() {
  const entries: SocialEntry[] = [
    { label: 'X', href: links.social.twitter, Icon: XIcon },
    { label: 'YouTube', href: links.social.youtube, Icon: YouTubeIcon },
    { label: 'Instagram', href: links.social.instagram, Icon: InstagramIcon },
  ]
  const visible = entries.filter((e) => e.href)
  if (visible.length === 0) return null
  return (
    <ul className="mt-6 flex items-center gap-6">
      {visible.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Elevate Hockey Stats on ${label}`}
            className="inline-flex text-white/70 transition-colors hover:text-white"
          >
            <Icon className="h-6 w-6" />
          </a>
        </li>
      ))}
    </ul>
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
            <SocialLinks />
          </div>

          <LinkColumn heading="Product" items={productLinks} />
          <LinkColumn heading="Company" items={companyLinks} />
          <LinkColumn heading="Legal" items={legalLinks} />
        </div>

        <div className="safe-bottom mt-16 flex flex-col items-start gap-2 border-t border-white/10 pt-6 pb-20 text-sm text-white/60 md:flex-row md:items-center md:justify-between md:pb-24">
          <p>Made in Canada.</p>
          <p>&copy; 2026 Elevate Sports Labs Inc.</p>
        </div>
      </Container>
    </footer>
  )
}

export function FooterCta(props: Partial<GradientCtaContent> = {}) {
  const content: GradientCtaContent = { ...DEFAULT_GRADIENT, ...props }
  return (
    <>
      <GradientCta {...content} />
      <Footer />
    </>
  )
}
