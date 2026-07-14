import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/sections/LegalPage'
import { getLegalDoc } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy | Elevate Stats',
  description: 'How Elevate Stats handles your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyRoute() {
  const doc = getLegalDoc('privacy')
  if (!doc) notFound()
  return <LegalPage doc={doc} />
}
