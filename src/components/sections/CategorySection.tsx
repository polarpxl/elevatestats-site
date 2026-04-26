import Link from 'next/link'
import type { ComponentType, ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import type { CategoryTheme, FeatureCategory, FeatureItem, IconName } from '@/lib/features'

type IconProps = { className?: string }

function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}
function SparkleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l1.8 4.9L18.7 9.7 13.8 11.5 12 16.4 10.2 11.5 5.3 9.7 10.2 7.9z" />
      <path d="M18 16l.9 2.1 2.1.9-2.1.9L18 22l-.9-2.1-2.1-.9 2.1-.9z" />
    </svg>
  )
}
function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
function LayersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 18l9 5 9-5" />
    </svg>
  )
}
function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 19h16" />
    </svg>
  )
}
function CloudDownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 18a4.5 4.5 0 01-.5-8.97A6 6 0 0118 9.5a4 4 0 01-.5 7.97" />
      <path d="M12 12v7" />
      <path d="M9 16l3 3 3-3" />
    </svg>
  )
}
function UploadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V9" />
      <path d="M7 14l5-5 5 5" />
      <path d="M4 5h16" />
    </svg>
  )
}
function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  )
}
function WifiOffIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3l18 18" />
      <path d="M8.5 16.5a5 5 0 017 0" />
      <path d="M5 13a9 9 0 0112-3" />
      <path d="M1.5 9.5A14 14 0 014 8" />
      <path d="M12 20h0" />
    </svg>
  )
}
function LightningIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  )
}
function ChartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-8" />
      <path d="M22 20H2" />
    </svg>
  )
}
function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z" />
    </svg>
  )
}
function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

const iconMap: Record<IconName, ComponentType<IconProps>> = {
  check: CheckIcon,
  sparkle: SparkleIcon,
  'map-pin': MapPinIcon,
  layers: LayersIcon,
  download: DownloadIcon,
  'cloud-download': CloudDownloadIcon,
  upload: UploadIcon,
  phone: PhoneIcon,
  'wifi-off': WifiOffIcon,
  'lightning-bolt': LightningIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
  clock: ClockIcon,
}

const compactIconRotation: IconName[] = [
  'check',
  'lightning-bolt',
  'layers',
  'chart',
  'shield',
  'clock',
  'map-pin',
  'sparkle',
]

type ThemeClasses = {
  section: string
  eyebrow: string
  heading: string
  lede: string
  heroTile: string
  heroTitle: string
  heroDescription: string
  iconCircle: string
  compactDivider: string
  compactTitle: string
  compactDescription: string
  ctaLink: string
}

const themeClasses: Record<CategoryTheme, ThemeClasses> = {
  light: {
    section: 'bg-white',
    eyebrow: 'text-brand-blue',
    heading: 'text-ink',
    lede: 'text-brand-gray',
    heroTile: 'bg-surface-alt ring-1 ring-black/5',
    heroTitle: 'text-ink',
    heroDescription: 'text-brand-gray',
    iconCircle: 'bg-brand-orange/10 text-brand-orange',
    compactDivider: 'divide-black/10',
    compactTitle: 'text-ink',
    compactDescription: 'text-brand-gray',
    ctaLink: 'text-brand-orange hover:text-[#E65C00]',
  },
  surface: {
    section: 'bg-surface-alt',
    eyebrow: 'text-brand-blue',
    heading: 'text-ink',
    lede: 'text-brand-gray',
    heroTile: 'bg-white ring-1 ring-black/5',
    heroTitle: 'text-ink',
    heroDescription: 'text-brand-gray',
    iconCircle: 'bg-brand-orange/10 text-brand-orange',
    compactDivider: 'divide-black/10',
    compactTitle: 'text-ink',
    compactDescription: 'text-brand-gray',
    ctaLink: 'text-brand-orange hover:text-[#E65C00]',
  },
  dark: {
    section: 'bg-surface-dark text-white',
    eyebrow: 'text-brand-orange',
    heading: 'text-white',
    lede: 'text-white/80',
    heroTile: 'bg-white/5 ring-1 ring-white/10',
    heroTitle: 'text-white',
    heroDescription: 'text-white/70',
    iconCircle: 'bg-brand-orange/15 text-brand-orange',
    compactDivider: 'divide-white/10',
    compactTitle: 'text-white',
    compactDescription: 'text-white/60',
    ctaLink: 'text-white hover:text-brand-orange',
  },
}

function ProPill() {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-orange px-2 py-0.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-white">
      PRO
    </span>
  )
}

function HeroTile({
  feature,
  theme,
}: {
  feature: FeatureItem
  theme: ThemeClasses
}) {
  const Icon = feature.icon ? iconMap[feature.icon] : CheckIcon
  return (
    <article className={cn('flex flex-col rounded-card p-6 md:p-8', theme.heroTile)}>
      <span
        className={cn(
          'inline-flex h-12 w-12 items-center justify-center rounded-full',
          theme.iconCircle,
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3
          className={cn(
            'font-heading text-xl font-semibold tracking-tight',
            theme.heroTitle,
          )}
        >
          {feature.title}
        </h3>
        {feature.pro && <ProPill />}
      </div>
      <p className={cn('mt-3 text-base', theme.heroDescription)}>{feature.description}</p>
    </article>
  )
}

function CompactRow({
  feature,
  icon,
  theme,
}: {
  feature: FeatureItem
  icon: IconName
  theme: ThemeClasses
}) {
  const Icon = iconMap[icon]
  return (
    <div className="flex items-start gap-3 py-4">
      <span
        className={cn(
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          theme.iconCircle,
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className={cn('font-heading text-sm font-semibold', theme.compactTitle)}>
            {feature.title}
          </p>
          {feature.pro && <ProPill />}
        </div>
        <p className={cn('mt-1 text-sm', theme.compactDescription)}>{feature.description}</p>
      </div>
    </div>
  )
}

function CategoryContent({
  category,
  theme,
}: {
  category: FeatureCategory
  theme: ThemeClasses
}): ReactNode {
  const heroFeatures = category.features.filter((f) => f.hero)
  const compactFeatures = category.features.filter((f) => !f.hero)
  const isExternalCta = /^https?:\/\//i.test(category.cta.href)

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <p
          className={cn(
            'font-heading text-sm font-semibold uppercase tracking-[0.2em]',
            theme.eyebrow,
          )}
        >
          {category.eyebrow}
        </p>
        <h2
          className={cn(
            'mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl',
            theme.heading,
          )}
        >
          {category.heading}
        </h2>
        <p className={cn('mt-5 text-lg', theme.lede)}>{category.lede}</p>
      </div>

      {heroFeatures.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {heroFeatures.map((feature) => (
            <HeroTile key={feature.title} feature={feature} theme={theme} />
          ))}
        </div>
      )}

      {compactFeatures.length > 0 && (
        <div className="mx-auto mt-12 max-w-4xl md:mt-16">
          <div
            className={cn(
              'grid grid-cols-1 gap-x-8 md:grid-cols-2',
              theme.compactDivider,
              'divide-y md:divide-y-0',
            )}
          >
            {compactFeatures.map((feature, i) => (
              <CompactRow
                key={feature.title}
                feature={feature}
                icon={compactIconRotation[i % compactIconRotation.length]}
                theme={theme}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-center md:mt-16">
        <Link
          href={category.cta.href}
          {...(isExternalCta ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cn(
            'inline-flex items-center gap-1 font-heading text-sm font-semibold transition-colors',
            theme.ctaLink,
          )}
        >
          {category.cta.label}
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </>
  )
}

export function CategorySection({ category }: { category: FeatureCategory }) {
  const theme = themeClasses[category.theme]

  // Dark theme renders as a contained rounded panel inside a white section, so the
  // "differentiator" gets visual weight without a full-bleed gear shift.
  if (category.theme === 'dark') {
    return (
      <section id={category.id} className="scroll-mt-24 bg-white py-20 md:py-28">
        <Container>
          <div
            className={cn(
              'rounded-[2rem] p-8 md:p-14 shadow-xl ring-1 ring-white/10',
              theme.section,
            )}
          >
            <CategoryContent category={category} theme={theme} />
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section
      id={category.id}
      className={cn('scroll-mt-24 py-20 md:py-28', theme.section)}
    >
      <Container>
        <CategoryContent category={category} theme={theme} />
      </Container>
    </section>
  )
}
