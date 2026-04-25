import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/legal')

export type LegalSlug = 'privacy' | 'terms'

export type LegalDoc = {
  slug: LegalSlug
  title: string
  description: string
  updated: string
  body: string
}

export function getLegalDoc(slug: LegalSlug): LegalDoc | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    updated: String(data.updated ?? ''),
    body: content,
  }
}
