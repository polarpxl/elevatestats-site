'use client'

import { useEffect, useState } from 'react'

// Mobile-only sticky bottom bar. On mobile the signup form is in the normal flow
// near the top (it's only sticky at lg+), so a visitor who scrolls past it has no
// way to convert. This bar gives them a persistent path back to the form.
//
// It deliberately hides itself while the form is on screen, so it can never cover
// the form's submit button or the invisible Turnstile challenge. It does NOT fire
// any analytics — conversion tracking stays on the real form submission.
export function MobileCtaBar() {
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const form = document.getElementById('signup')
    if (!form) return

    // Show the bar only when NO part of the form is on screen, so it can never
    // cover the form's submit button or the invisible Turnstile challenge.
    const update = () => {
      const r = form.getBoundingClientRect()
      const inView = r.bottom > 0 && r.top < window.innerHeight
      setShowBar(!inView)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function scrollToForm(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-brand-orange shadow-[0_-2px_16px_rgba(0,0,0,0.16)] transition-transform duration-300 lg:hidden ${
        showBar ? 'translate-y-0' : 'translate-y-full'
      }`}
      // Extend the orange background through the iOS home-indicator safe area.
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href="#signup"
        onClick={scrollToForm}
        className="flex h-[60px] w-full items-center justify-center font-heading text-base font-semibold text-white active:bg-[#E65C00]"
      >
        Create my free account
      </a>
    </div>
  )
}
