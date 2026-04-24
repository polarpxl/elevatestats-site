import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-orange text-white hover:bg-[#E65C00]',
  secondary: 'bg-white text-ink ring-1 ring-black/10 hover:bg-surface-alt',
  ghost: 'text-ink hover:bg-black/5',
  onDark: 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href)

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
