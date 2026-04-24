'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0)
  const targetRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    targetRef.current = el

    const update = () => {
      const target = targetRef.current
      if (!target) return
      const rect = target.getBoundingClientRect()
      const topAbsolute = rect.top + window.scrollY
      const height = target.offsetHeight
      if (height === 0) return
      const viewportBottom = window.scrollY + window.innerHeight
      const raw = (viewportBottom - topAbsolute) / height
      const clamped = Math.max(0, Math.min(1, raw))
      setProgress(clamped)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetId])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]"
    >
      <div
        className="h-full bg-brand-orange"
        style={{
          width: `${progress * 100}%`,
          transition: prefersReducedMotion ? 'none' : 'width 80ms linear',
        }}
      />
    </div>
  )
}
