import type { MetadataRoute } from 'next'
import { getAllArticleMeta } from '@/lib/support-articles'

const SITE_URL = 'https://elevatestats.app'

// Bump this when the marketing/static pages get a meaningful content update.
// Using a fixed date (rather than build time) keeps the sitemap's freshness
// signal honest — crawlers only see a change when the content actually changed.
const STATIC_CONTENT_UPDATED = new Date('2026-06-25')

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = STATIC_CONTENT_UPDATED

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/features`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/support`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const supportArticles: MetadataRoute.Sitemap = getAllArticleMeta().map((article) => ({
    url: `${SITE_URL}/support/${article.slug}`,
    lastModified: article.updated ? new Date(article.updated) : STATIC_CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...supportArticles]
}
