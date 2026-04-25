import type { Metadata, Viewport } from 'next'
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Elevate Hockey Stats — Pro-level stats for amateur hockey',
  description:
    'The simplest way for amateur hockey coaches and stat trackers to capture, share, and learn from pro-quality game stats.',
}

export const viewport: Viewport = {
  themeColor: '#FF6600',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${poppins.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh pt-16 md:pt-20">{children}</body>
    </html>
  )
}
