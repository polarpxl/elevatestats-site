import { links } from '@/lib/links'

export type BillingPeriod = 'monthly' | 'yearly'

export const pricing = {
  free: {
    name: 'Free',
    tagline: 'Your digital game sheet',
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'CAD',
    features: [
      '3 free PRO-level games to start',
      'Unlimited game tracking',
      'Team scores and shots',
      'Season record',
      'Add and manage opponents',
    ],
    ctaLabel: 'Start free',
    ctaHref: links.appHome,
  },
  pro: {
    name: 'PRO',
    tagline: 'The complete coaching tool',
    priceMonthly: 14,
    priceYearly: 140,
    currency: 'CAD',
    yearlySavingsPercent: 17,
    features: [
      'Everything in Free',
      'Player and goalie stats',
      'AI coaching insights',
      'Opponent analysis',
      'Full season analytics',
      'CSV import and export',
      'Full game history',
    ],
    ctaLabel: 'Upgrade to PRO',
    ctaHref: links.appSignupPro,
  },
} as const

export type PlanKey = keyof typeof pricing
export type Plan = (typeof pricing)[PlanKey]
