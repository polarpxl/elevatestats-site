export const APP_URL = 'https://elevatestats.vercel.app'

export const links = {
  appHome: APP_URL,
  appLogin: `${APP_URL}/login`,
  appSignup: `${APP_URL}/signup`,
  appSignupPro: `${APP_URL}/signup?plan=pro`,

  pricing: '/pricing',
  features: '/features',
  blog: '/blog',
  support: '/support',
  contact: '/contact',
} as const
