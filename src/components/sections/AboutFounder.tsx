import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'
import { links } from '@/lib/links'

export function AboutFounder() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 rounded-card bg-surface-alt p-7 ring-1 ring-black/5 md:flex-row md:items-start md:gap-8 md:p-10">
            <Avatar
              initials="DM"
              tone="orange"
              size="lg"
              alt="Darrin Moss"
              className="shrink-0"
            />
            <div className="text-center md:text-left">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                The founder
              </p>
              <p className="mt-2 font-heading text-2xl font-extrabold leading-tight tracking-tight text-ink md:text-3xl">
                Darrin Moss, Founder
              </p>
              <p className="mt-4 text-base text-brand-gray md:text-lg">
                I&rsquo;m Darrin. I&rsquo;ve spent years on the bench coaching my kids&rsquo;
                teams, watching coaches around me try to make sense of the game with clipboards and
                spreadsheets while the pro level pulled further and further ahead. I built Elevate
                Stats because amateur hockey deserves the same tools the pros have. If you&rsquo;re
                a coach, parent, or league looking for something better, I&rsquo;d love to hear
                from you.
              </p>
              <Link
                href={links.contact}
                className="mt-5 inline-block font-heading text-base font-semibold text-brand-orange underline-offset-4 hover:underline"
              >
                Get in touch &rarr;
              </Link>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl px-2 text-center text-xs leading-relaxed text-brand-gray/80 md:text-sm">
            Elevate Sports Labs Inc. Incorporated in Ontario, Canada. Parent of the Elevate Sports
            Stats division. Elevate Stats is our first product.
          </p>
        </div>
      </Container>
    </section>
  )
}
