import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { Callout } from './Callout'
import { Screenshot } from './Screenshot'
import { YouTubeEmbed } from './YouTubeEmbed'

const linkClasses =
  'font-medium text-brand-orange underline-offset-4 hover:underline'

// Hosts treated as "ours": same site or sister-app domain.
// Auto-linked URLs to these stay in the same tab; external hosts open in a new tab.
const OWN_HOSTS_PATTERN = /(elevatestats\.app|elevatesportslabs\.com)$/i

function isOwnHttpHost(href: string): boolean {
  try {
    const url = new URL(href)
    return OWN_HOSTS_PATTERN.test(url.hostname)
  } catch {
    return false
  }
}

function MdxLink({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const target = href ?? '#'

  // mailto: and tel: open the OS handler — render as plain <a>, no target/rel.
  if (target.startsWith('mailto:') || target.startsWith('tel:')) {
    return (
      <a href={target} className={linkClasses} {...rest}>
        {children}
      </a>
    )
  }

  // Absolute http(s) URLs: open in a new tab unless they point at one of our own hosts.
  if (/^https?:\/\//i.test(target)) {
    if (isOwnHttpHost(target)) {
      return (
        <a href={target} className={linkClasses} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...rest}
      >
        {children}
      </a>
    )
  }

  // Internal path → next/link, same tab.
  return (
    <Link href={target} className={linkClasses}>
      {children}
    </Link>
  )
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mt-10 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mt-8 font-heading text-xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="mt-6 font-heading text-lg font-semibold text-ink" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mt-5 leading-relaxed text-brand-gray" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-brand-gray marker:text-brand-orange"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-brand-gray marker:text-brand-orange"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: MdxLink,
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="mt-5 overflow-x-auto rounded-card bg-ink/95 p-4 text-sm text-white"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mt-6 border-l-4 border-brand-orange pl-4 italic text-brand-gray"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-black/10" />,
  // GFM tables: wrap in an overflow-x-auto container so wide tables scroll on mobile
  // rather than blowing out the page width. The wrapper carries the rounded ring.
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto rounded-card ring-1 ring-black/10">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-surface-alt text-ink" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-black/10" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => <tr {...props} />,
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-4 py-3 text-left align-top font-heading text-sm font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 align-top text-brand-gray" {...props} />
  ),
  Callout,
  YouTubeEmbed,
  Screenshot,
}

// Shared MDXRemote options. Both /support/[slug] and /privacy + /terms read these
// so GFM (tables, autolinks, strikethrough, task lists) and heading-id anchors
// stay consistent across all MDX content.
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
}
