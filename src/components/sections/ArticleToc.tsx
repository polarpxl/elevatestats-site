'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import type { TocHeading } from '@/lib/support-articles'

export function ArticleToc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.slug ?? null)

  useEffect(() => {
    if (headings.length === 0) return
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the heading highest on screen that's currently intersecting the active band
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
        if (intersecting.length > 0) {
          const top = intersecting.reduce((a, b) =>
            a.getBoundingClientRect().top < b.getBoundingClientRect().top ? a : b,
          )
          setActiveId(top.id)
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray">
        On this page
      </p>
      <ul className="mt-4 flex flex-col gap-2 border-l border-black/10 pl-4">
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              className={cn(
                'block transition-colors',
                activeId === h.slug
                  ? 'font-semibold text-brand-orange'
                  : 'text-brand-gray hover:text-ink',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
