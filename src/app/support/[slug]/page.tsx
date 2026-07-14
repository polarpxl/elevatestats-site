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
import { supportCategories } from '@/lib/support'
import {
  extractHeadings,
  getAllSlugs,
  getArticleBySlug,
  getArticlesByCategory,
} from '@/lib/support-articles'

const SITE_URL = 'https://elevatestats.app'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article not found | Elevate Stats Support' }
  const title = `${article.title} | Elevate Stats Support`
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

  const category = supportCategories.find((c) => c.id === article.category)
  const articleUrl = `${SITE_URL}/support/${slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.updated,
    dateModified: article.updated,
    inLanguage: 'en-CA',
    author: { '@type': 'Organization', '@id': 'https://elevatesportslabs.com/#organization', name: 'Elevate Sports Labs Inc.' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://elevatesportslabs.com/#organization',
      name: 'Elevate Sports Labs Inc.',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Support', item: `${SITE_URL}/support` },
      ...(category
        ? [{ '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/support#${category.id}` }]
        : []),
      {
        '@type': 'ListItem',
        position: category ? 4 : 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
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
