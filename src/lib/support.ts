export const supportCategories = [
  {
    id: 'getting-started',
    name: 'Getting started',
    description: 'First steps to set up Elevate Hockey Stats and track your first game.',
  },
  {
    id: 'tracking-games',
    name: 'Tracking games',
    description: 'Live tracking, quick mode, and how sync works on the bench.',
  },
  {
    id: 'analytics-insights',
    name: 'Analytics and insights',
    description: 'Make sense of player stats, shot maps, and AI-generated insights.',
  },
  {
    id: 'account-billing',
    name: 'Account and billing',
    description: 'Manage your plan, upgrade to PRO, or cancel anytime.',
  },
] as const

export type SupportCategoryId = (typeof supportCategories)[number]['id']
export type SupportCategory = (typeof supportCategories)[number]

export type CategoryTone = 'blue' | 'orange' | 'gray'

export const categoryTones: Record<SupportCategoryId, CategoryTone> = {
  'getting-started': 'blue',
  'tracking-games': 'orange',
  'analytics-insights': 'blue',
  'account-billing': 'gray',
}

export const toneBgClass: Record<CategoryTone, string> = {
  blue: 'bg-brand-blue',
  orange: 'bg-brand-orange',
  gray: 'bg-brand-gray',
}


