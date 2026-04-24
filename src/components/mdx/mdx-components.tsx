import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { Callout } from './Callout'
import { Screenshot } from './Screenshot'
import { YouTubeEmbed } from './YouTubeEmbed'

function MdxLink({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const target = href ?? '#'
  const isExternal = /^https?:\/\//i.test(target)
  const classes =
    'font-medium text-brand-orange underline-offset-4 hover:underline'
  if (isExternal) {
    return (
      <a href={target} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={target} className={classes}>
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
  Callout,
  YouTubeEmbed,
  Screenshot,
}
