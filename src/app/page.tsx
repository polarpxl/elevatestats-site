import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { links } from '@/lib/links'

export default function Home() {
  return (
    <main className="py-24">
      <Container>
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Foundation check
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
          Elevate Hockey Stats
        </h1>
        <p className="mt-4 max-w-xl text-base text-brand-gray md:text-lg">
          This is a scaffolding page. Headings render in Poppins, body in Plus Jakarta Sans, and the
          brand palette is wired up through Tailwind v4 theme tokens.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={links.appHome} variant="primary" size="lg">
            Start free
          </Button>
          <Button href={links.pricing} variant="secondary" size="lg">
            See pricing
          </Button>
          <Button href={links.appLogin} variant="ghost" size="lg">
            Log in
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Placeholder label="Orange token" tone="orange" aspect="4/3" />
          <Placeholder label="Blue token" tone="blue" aspect="4/3" />
          <Placeholder label="Gray token" tone="gray" aspect="4/3" />
        </div>
      </Container>
    </main>
  )
}
