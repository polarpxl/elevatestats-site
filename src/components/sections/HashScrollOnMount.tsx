'use client'

import { useEffect } from 'react'

// Workaround for the App Router not reliably scrolling to a hash target after a
// cross-route navigation. The framework resolves the hash before destination-page
// sections have mounted, so the lookup silently fails. Running scrollIntoView in a
// useEffect on the destination page bypasses the race: by the time this runs, the
// DOM is committed and the target id exists. Covers click navigation, direct URL
// visits, and refreshes equally.
export function HashScrollOnMount() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    if (!id) return
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ block: 'start' })
    })
  }, [])

  return null
}
