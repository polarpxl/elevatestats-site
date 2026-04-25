import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { Container } from '@/components/ui/Container'
import type { LegalDoc } from '@/lib/legal'

function formatDate(iso: string): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
  },
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-surface-alt py-12 md:py-16">
          <Container>
            <header className="mx-auto max-w-3xl">
              <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-5xl">
                {doc.title}
              </h1>
              {doc.description && (
                <p className="mt-4 text-lg text-brand-gray">{doc.description}</p>
              )}
              <p className="mt-3 text-sm text-brand-gray">
                Last updated: {formatDate(doc.updated)}
              </p>
            </header>
          </Container>
        </section>

        <section className="bg-white py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <MDXRemote
                source={doc.body}
                components={mdxComponents}
                options={mdxOptions}
              />
            </div>
          </Container>
        </section>
      </main>
      <FooterCta />
    </>
  )
}
