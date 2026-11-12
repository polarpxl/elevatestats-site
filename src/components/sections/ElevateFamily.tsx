import { Container } from '@/components/ui/Container'

type Product = {
  name: string
  brandmark: string
  /** Product identity colour. Tints the status chip only. */
  color: string
  status: string
  copy: string
  link?: { label: string; href: string }
}

const products: Product[] = [
  {
    name: 'Elevate Stats',
    brandmark: '/brand/brandmark.png',
    color: '#00BFFF',
    status: 'You’re here',
    copy: 'Track every shot live from the bench, even with no signal.',
  },
  {
    name: 'Elevate Coach',
    brandmark: '/brand/elevate-coach-brandmark.svg',
    color: '#00C853',
    status: 'Early access',
    copy: 'Where coaches make decisions. Real game stats become player ratings, lineups and practice plans.',
    link: { label: 'Request early access', href: 'https://elevatecoach.app' },
  },
  {
    name: 'Elevate Hub',
    brandmark: '/brand/elevate-hub-brandmark.svg',
    color: '#FFC400',
    status: 'Live',
    copy: 'Where players find their edge. A directory of hockey trainers helping players get better, faster.',
    link: { label: 'Find a trainer', href: 'https://hockeytrainerhub.com' },
  },
]

function StatusChip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex h-[24px] items-center gap-1.5 whitespace-nowrap rounded-full border border-solid px-2.5 font-heading text-[12px] font-semibold leading-none text-ink"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 14%, white)`,
        borderColor: `color-mix(in srgb, ${color} 45%, white)`,
      }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-card bg-white p-7 ring-1 ring-black/5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.brandmark} alt="" width={44} height={44} className="h-11 w-11" />
        <StatusChip label={product.status} color={product.color} />
      </div>
      <h3 className="mt-5 font-heading text-xl font-bold tracking-tight text-ink">
        {product.name}
      </h3>
      <p className="mt-2 text-brand-gray">{product.copy}</p>
      {product.link && (
        <a
          href={product.link.href}
          target="_blank"
          rel="noopener"
          className="group mt-5 inline-flex items-center gap-2 self-start font-heading text-base font-semibold text-ink"
        >
          <span className="underline-offset-4 group-hover:underline">{product.link.label}</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </article>
  )
}

export function ElevateFamily() {
  return (
    <section aria-labelledby="elevate-family-heading" className="bg-surface-alt py-20 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-gray">
            More from Elevate Sports Labs
          </p>
          <h2
            id="elevate-family-heading"
            className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
          >
            One platform. Every part of your season.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Container>
    </section>
  )
}
