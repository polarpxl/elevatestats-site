export const APP_URL = 'https://elevatestats.vercel.app'

export const links = {
  // External app (will move to a custom domain later)
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
} as const
