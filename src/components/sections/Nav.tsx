'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { links } from '@/lib/links'

type NavLink = { label: string; href: string; internal: boolean }

const navLinks: NavLink[] = [
  { label: 'Features', href: links.features, internal: true },
  { label: 'How it works', href: '/#how-it-works', internal: true },
  { label: 'Pricing', href: links.pricing, internal: true },
  { label: 'Support', href: links.support, internal: true },
]

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  )
}

function NavLinkItem({
  link,
  onClick,
  className,
}: {
  link: NavLink
  onClick?: () => void
  className?: string
}) {
  const classes = cn('transition-colors hover:text-brand-orange', className)
  if (link.internal) {
    return (
      <Link href={link.href} onClick={onClick} className={classes}>
        {link.label}
      </Link>
    )
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={classes}
    >
      {link.label}
    </a>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const closeDrawer = () => setOpen(false)

  const drawerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'tween' as const, duration: 0.25, ease: 'easeOut' as const }

  return (
    <>
      <header
        className={cn(
          // The logo's knocked-out HOCKEY lettering pulls the backdrop through,
          // so the unscrolled veil stays white enough (75%) to keep it legible
          // over the dark hero photo while the blur preserves the glass feel.
          'fixed inset-x-0 top-0 z-50 safe-top backdrop-blur-md transition-colors',
          scrolled
            ? 'bg-white/85 border-b border-black/10'
            : 'bg-white/75 border-b border-black/5',
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 md:h-20">
            <Link href="/" className="flex items-center" aria-label="Elevate Hockey Stats home">
              {/* Plain <img> for a 1KB SVG logo — sidesteps next/image's dangerouslyAllowSVG requirement */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-primary.svg?v=3"
                alt="Elevate Hockey Stats"
                width={500}
                height={195}
                className="h-auto w-[116px] -translate-y-[4px] md:w-[147px]"
              />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-8 text-sm font-medium text-ink md:flex"
            >
              {navLinks.map((link) => (
                <NavLinkItem key={link.label} link={link} />
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Button href={links.appLogin} variant="ghost" size="md">
                Log in
              </Button>
              <Button href={links.appHome} variant="primary" size="md">
                Start free
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-black/5"
            >
              <MenuIcon />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-drawer"
            className="fixed inset-0 z-[60] md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/40"
              variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={drawerTransition}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white safe-top shadow-2xl"
              variants={{
                closed: { x: '100%' },
                open: { x: 0 },
              }}
              transition={drawerTransition}
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-brand-gray">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-black/5"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav
                aria-label="Mobile primary"
                className="flex flex-1 flex-col gap-1 px-3 py-4"
              >
                {navLinks.map((link) => (
                  <NavLinkItem
                    key={link.label}
                    link={link}
                    onClick={closeDrawer}
                    className="rounded-xl px-4 py-3 font-heading text-lg font-semibold text-ink hover:bg-surface-alt"
                  />
                ))}
              </nav>

              <div className="safe-bottom flex flex-col gap-3 border-t border-black/5 p-5">
                <Button href={links.appLogin} variant="secondary" size="lg" className="w-full">
                  Log in
                </Button>
                <Button href={links.appHome} variant="primary" size="lg" className="w-full">
                  Start free
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
