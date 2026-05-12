export const APP_URL = 'https://app.elevatestats.app'

// Social URLs left empty until accounts are live. Footer renders icons only
// for entries with a non-empty URL, so no code change is needed when these
// get wired up — just fill in the strings here.
const social: Record<'twitter' | 'youtube' | 'instagram', string> = {
  twitter: '',
  youtube: '',
  instagram: '',
}

export const links = {
  appHome: APP_URL,
  appLogin: `${APP_URL}/login`,
  appSignup: `${APP_URL}/signup`,
  appSignupPro: `${APP_URL}/signup?plan=pro`,

  // Internal marketing site pages
  pricing: '/pricing',
  features: '/features',
  support: '/support',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',

  // Direct contact
  contactEmail: 'mailto:hello@elevatesportslabs.com',

  social,
} as const
