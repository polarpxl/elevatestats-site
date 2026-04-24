import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { links } from '@/lib/links'

type Tone = 'orange' | 'blue' | 'gray'

type Post = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  tone: Tone
  placeholderLabel: string
}

const posts: Post[] = [
  {
    slug: 'why-plus-minus-lies-in-minor-hockey',
    title: 'Why plus-minus lies in minor hockey (and what to track instead)',
    category: 'Coaching',
    date: 'Apr 2, 2026',
    readTime: '6 min read',
    tone: 'orange',
    placeholderLabel: 'Cover image placeholder',
  },
  {
    slug: 'building-a-line-chart-parents-understand',
    title: 'Building a line chart parents actually understand',
    category: 'Product',
    date: 'Mar 18, 2026',
    readTime: '4 min read',
    tone: 'blue',
    placeholderLabel: 'Cover image placeholder',
  },
  {
    slug: 'from-clipboard-to-iphone-5-minute-migration',
    title: 'From clipboard to iPhone: a 5-minute migration',
    category: 'How-to',
    date: 'Mar 2, 2026',
    readTime: '5 min read',
    tone: 'gray',
    placeholderLabel: 'Cover image placeholder',
  },
]

function PostCard({ post }: { post: Post }) {
  return (
    // TODO: link to /blog/{post.slug} once the blog route exists
    <Link
      href="#"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-black/5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-black/10"
    >
      <Placeholder
        label={post.placeholderLabel}
        tone={post.tone}
        aspect="16/9"
        className="w-full rounded-none rounded-t-card"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="font-heading text-xs font-medium uppercase tracking-[0.18em] text-brand-orange">
          {post.category}
        </span>
        <h3 className="mt-3 line-clamp-2 font-heading text-lg font-semibold leading-snug tracking-tight text-ink group-hover:text-brand-orange md:text-xl">
          {post.title}
        </h3>
        <p className="mt-auto pt-6 text-sm text-brand-gray">
          {post.date} &middot; {post.readTime}
        </p>
      </div>
    </Link>
  )
}

export function BlogPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              From the blog
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
              From the Elevate blog.
            </h2>
            <p className="mt-5 text-lg text-brand-gray">
              Short reads on what we are learning, shipping, and hearing from coaches who use the
              app every weekend.
            </p>
          </div>
          <Link
            href={links.blog}
            className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-brand-orange transition-colors hover:text-[#E65C00]"
          >
            View all posts
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}
