import Link from 'next/link'
import type { SupportCategory } from '@/lib/support'
import type { ArticleMeta } from '@/lib/support-articles'

function ArticleCard({ article }: { article: ArticleMeta }) {
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

export function SupportCategoryBlock({
  category,
  articles,
}: {
  category: SupportCategory
  articles: ArticleMeta[]
}) {
  return (
    <section id={category.id} className="scroll-mt-24">
      <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {category.name}
      </h2>
      <p className="mt-2 text-brand-gray">{category.description}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
