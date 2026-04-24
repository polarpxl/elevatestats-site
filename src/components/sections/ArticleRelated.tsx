import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { ArticleMeta } from '@/lib/support-articles'

function RelatedCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/support/${article.slug}`}
      className="group flex flex-col rounded-card bg-white p-6 ring-1 ring-black/5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-black/10"
    >
      <h3 className="font-heading text-lg font-semibold tracking-tight text-ink group-hover:text-brand-orange">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-brand-gray">{article.description}</p>
      <p className="mt-auto pt-4 text-xs font-medium uppercase tracking-[0.16em] text-brand-gray/80">
        {article.readTime} min read
      </p>
    </Link>
  )
}

export function ArticleRelated({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null
  return (
    <section className="bg-surface-alt py-16 md:py-20">
      <Container>
        <h2 className="text-center font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Keep reading
        </h2>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:mt-12 md:grid-cols-3">
          {articles.map((article) => (
            <RelatedCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  )
}
