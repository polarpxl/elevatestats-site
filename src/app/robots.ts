import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://elevatestats.app/sitemap.xml',
    host: 'https://elevatestats.app',
  }
}
