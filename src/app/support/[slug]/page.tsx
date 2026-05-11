import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { ArticleFeedback } from '@/components/sections/ArticleFeedback'
import { ArticleHeader } from '@/components/sections/ArticleHeader'
import { ArticleRelated } from '@/components/sections/ArticleRelated'
import { ArticleStillStuck } from '@/components/sections/ArticleStillStuck'
import { ArticleToc } from '@/components/sections/ArticleToc'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { ReadingProgress } from '@/components/sections/ReadingProgress'
import { mdxComponents, mdxOptions } from '@/components/mdx/mdx-components'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'
import {
  extractHeadings,
  getAllSlugs,
  getArticleBySlug,
  getArticlesByCategory,
} from '@/lib/support-articles'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article not found — Elevate Hockey Stats Support' }
  const title = `${article.title} — Elevate Hockey Stats Support`
  const canonical = `/support/${slug}`
  return {
    title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title,
      description: article.description,
      url: canonical,
    },
    twitter: { title, description: article.description },
  }
}

export default async function SupportArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const headings = extractHeadings(article.body)
  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <Nav />
      <main>
        <ArticleHeader article={article} />

        <section className="bg-white py-12 md:py-16">
          <Container>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12">
              <div className="min-w-0">
                <div id="article-body" className="max-w-3xl">
                  <MDXRemote
                    source={article.body}
                    components={mdxComponents}
                    options={mdxOptions}
                  />
                </div>
                <div className="max-w-3xl">
                  <ArticleFeedback />
                  <ArticleStillStuck />
                </div>
              </div>
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <ArticleToc headings={headings} />
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <ArticleRelated articles={related} />
      </main>
      <FooterCta
        headline="Ready to get back to coaching?"
        subhead="Three free PRO games. No card. No clock."
        primaryCtaLabel="Start free"
        primaryCtaHref={links.appHome}
        secondaryLabel="See pricing"
        secondaryHref={links.pricing}
      />
    </>
  )
}
