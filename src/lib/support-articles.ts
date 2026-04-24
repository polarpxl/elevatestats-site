import fs from 'node:fs'
import path from 'node:path'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import { calculateReadTime, type SupportCategoryId } from '@/lib/support'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/support')

export type ArticleMeta = {
  slug: string
  title: string
  description: string
  category: SupportCategoryId
  order: number
  updated: string
  readTime: number
}

export type ArticleWithContent = ArticleMeta & { body: string }

type RawArticle = { meta: ArticleMeta; body: string }

function readAllArticles(): RawArticle[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8')
    const { data, content } = matter(raw)
    return {
      meta: {
        slug,
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        category: data.category as SupportCategoryId,
        order: Number(data.order ?? 0),
        updated: String(data.updated ?? ''),
        readTime: calculateReadTime(content),
      },
      body: content,
    }
  })
}

export function getAllArticleMeta(): ArticleMeta[] {
  return readAllArticles()
    .map((a) => a.meta)
    .sort((a, b) => a.order - b.order)
}

export function getArticlesByCategory(id: SupportCategoryId): ArticleMeta[] {
  return getAllArticleMeta().filter((a) => a.category === id)
}

export function getArticleBySlug(slug: string): ArticleWithContent | null {
  const found = readAllArticles().find((a) => a.meta.slug === slug)
  return found ? { ...found.meta, body: found.body } : null
}

export function getAllSlugs(): string[] {
  return readAllArticles().map((a) => a.meta.slug)
}

export type TocHeading = { text: string; slug: string }

export function extractHeadings(body: string): TocHeading[] {
  const slugger = new GithubSlugger()
  const headings: TocHeading[] = []
  const lines = body.split('\n')
  let inCode = false
  for (const line of lines) {
    if (line.startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const m = line.match(/^##\s+(.+?)\s*$/)
    if (m) {
      const text = m[1].trim()
      headings.push({ text, slug: slugger.slug(text) })
    }
  }
  return headings
}
