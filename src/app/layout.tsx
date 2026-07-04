import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

// Set NEXT_PUBLIC_GTM_ID in .env.local for local dev, and in Vercel →
// Project → Settings → Environment Variables (Production / Preview / Development)
// for deploys. Without it, the GTM snippet below is skipped entirely.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
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
  metadataBase: new URL('https://elevatestats.app'),
  applicationName: 'Elevate Stats',
  title: 'Elevate Hockey Stats — Pro-level stats for amateur hockey',
  description:
    'Elevate is the simplest hockey stat-tracking app for amateur coaches — capture, share, and learn from pro-quality game stats. Free to start.',
  openGraph: {
    type: 'website',
    siteName: 'Elevate Stats',
    locale: 'en_CA',
    title: 'Elevate Hockey Stats — Pro-level stats for amateur hockey',
    description:
      'Elevate is the simplest hockey stat-tracking app for amateur coaches — capture, share, and learn from pro-quality game stats. Free to start.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Elevate Hockey Stats — Smarter Insights. Better Coaching. Stronger Players.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate Hockey Stats — Pro-level stats for amateur hockey',
    description:
      'Elevate is the simplest hockey stat-tracking app for amateur coaches — capture, share, and learn from pro-quality game stats. Free to start.',
    images: ['/opengraph-image.png'],
  },
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
      <head>
        {GTM_ID ? (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
      </head>
      <body className="min-h-dvh pt-16 md:pt-20">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  )
}
