import Link from 'next/link'

export function ArticleStillStuck() {
  return (
    <div className="mt-6 rounded-card bg-brand-blue/5 p-6 ring-1 ring-black/5 md:p-8">
      <h2 className="font-heading text-xl font-bold text-ink">Still stuck?</h2>
      <p className="mt-2 text-brand-gray">Can&rsquo;t find what you need? Drop us a line.</p>
      <Link
        href="/support#contact"
        className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#E65C00]"
      >
        Contact support
      </Link>
    </div>
  )
}
