import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import type { ArticleMeta } from '@/lib/support-articles'
import { categoryTones, supportCategories, toneBgClass } from '@/lib/support'

function formatDate(iso: string): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function ArticleHeader({ article }: { article: ArticleMeta }) {
  const category = supportCategories.find((c) => c.id === article.category)
  const tone = categoryTones[article.category]
  const toneBg = toneBgClass[tone]

  return (
    <section className="bg-surface-alt py-12 md:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12">
          <header className="max-w-3xl">
            <div className={cn('h-[2px] w-10', toneBg)} aria-hidden />

          <Link
            href="/support"
            className="mt-5 inline-flex items-center gap-1 font-heading text-sm font-medium text-brand-gray transition-colors hover:text-brand-orange"
          >
            <span aria-hidden>&larr;</span>
            All support articles
          </Link>
          {category && (
            <span className="font-heading text-sm font-medium text-brand-gray/80">
              {' '}
              / {category.name}
            </span>
          )}

          {category && (
            <div className="mt-6 flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', toneBg)} aria-hidden />
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray">
                {category.name}
              </p>
            </div>
          )}

          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-4 text-sm text-brand-gray">
            Updated {formatDate(article.updated)} &middot; {article.readTime} min read
          </p>
          </header>
          {/* Empty second column mirrors the body grid so header and body share a left edge on lg+ */}
          <div aria-hidden className="hidden lg:block" />
        </div>
      </Container>
    </section>
  )
}
