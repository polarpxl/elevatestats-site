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

const WORDS_PER_MINUTE = 180

export function calculateReadTime(content: string): number {
  const stripped = content
    // Fenced code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Inline code
    .replace(/`[^`]*`/g, '')
    // Self-closing JSX/MDX component tags (<YouTubeEmbed id="..." />)
    .replace(/<[A-Za-z][^>]*\/>/g, '')
    // Opening and closing JSX/MDX tags — keep their inner text
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    // Markdown image syntax
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')

  const words = stripped.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}


