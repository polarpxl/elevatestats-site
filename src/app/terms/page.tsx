import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/sections/LegalPage'
import { getLegalDoc } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms of Service | Elevate Stats',
  description: 'The rules of the road for using Elevate Stats.',
  alternates: { canonical: '/terms' },
}

export default function TermsRoute() {
  const doc = getLegalDoc('terms')
  if (!doc) notFound()
  return <LegalPage doc={doc} />
}
