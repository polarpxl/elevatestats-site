import Link from 'next/link'
import { links } from '@/lib/links'

export function ContactInfoBlock() {
  return (
    <div>
      <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
        Get in touch
      </h1>
      <p className="mt-5 text-lg text-brand-gray">
        Have a question, partnership idea, or feedback? Drop us a line and we&rsquo;ll get back
        to you.
      </p>

      <p className="mt-4 text-sm text-brand-gray/80">
        We typically reply within 1-2 business days.
      </p>

      <div className="mt-8 rounded-card bg-surface-alt p-5 ring-1 ring-black/5">
        <p className="font-heading text-sm font-semibold text-ink">
          Looking for help with the app?
        </p>
        <p className="mt-1 text-sm text-brand-gray">
          Browse our{' '}
          <Link
            href={links.support}
            className="font-medium text-brand-orange underline-offset-4 hover:underline"
          >
            support guides
          </Link>{' '}
          for setup, tracking, and account questions.
        </p>
      </div>

      <div className="mt-8">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-brand-gray">
          Other ways to reach us
        </p>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-brand-gray">
          <li>
            Email:{' '}
            <a
              href={links.contactEmail}
              className="font-medium text-ink underline-offset-4 hover:underline hover:text-brand-orange"
            >
              hello@elevatesportslabs.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
