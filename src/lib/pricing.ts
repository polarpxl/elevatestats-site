import { links } from '@/lib/links'

export type BillingPeriod = 'monthly' | 'yearly'

export type Plan = {
  key: 'free' | 'pro' | 'teams'
  name: string
  tagline: string
  priceCustomLabel?: string
  priceMonthly: number
  priceYearly: number
  yearlySavingsAmount?: number
  currency: 'CAD'
  featuresIntro: string
  features: readonly string[]
  ctaLabel: string
  ctaHref: string
  showTrialStrip?: boolean
  subPriceLine?: string
}

const free: Plan = {
  key: 'free',
  name: 'Free',
  tagline: 'Your digital game sheet',
  priceMonthly: 0,
  priceYearly: 0,
  currency: 'CAD',
  showTrialStrip: true,
  featuresIntro: 'What you get:',
  features: [
    'Unlimited team-level game tracking',
    'Season record and last 5 games',
    'Add and manage your roster',
    'Add and manage opponents',
    'Team shooting and special teams stats',
  ],
  ctaLabel: 'Get started free',
  ctaHref: links.appSignup,
}

const pro: Plan = {
  key: 'pro',
  name: 'PRO',
  tagline: 'The complete coaching tool',
  priceMonthly: 14,
  priceYearly: 109,
  yearlySavingsAmount: 59,
  currency: 'CAD',
  featuresIntro: 'Everything in Free, plus:',
  features: [
    'Player and goalie stats',
    'AI coaching insights after every game',
    'Opponent analysis and shot maps',
    'Full season analytics and roster analysis',
    'CSV import and export',
    'Full game history',
  ],
  subPriceLine: 'Cancel anytime. Billed in CAD.',
  ctaLabel: 'Upgrade to PRO',
  ctaHref: links.appSignupPro,
}

const teams: Plan = {
  key: 'teams',
  name: 'Teams & Leagues',
  tagline: 'For organizations tracking multiple teams',
  priceCustomLabel: 'Custom',
  priceMonthly: 0,
  priceYearly: 0,
  currency: 'CAD',
  featuresIntro: "What's included:",
  features: [
    'Everything in PRO for every coach',
    'Centralized billing',
    'Onboarding support',
    'Priority email support',
  ],
  subPriceLine: 'Volume pricing for clubs, associations, and leagues.',
  ctaLabel: 'Contact us',
  ctaHref: links.contact,
}

export const pricing = { free, pro, teams } as const
