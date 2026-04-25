import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

type TrialBandProps = {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export function TrialBand({ eyebrow, headline, body, ctaLabel, ctaHref }: TrialBandProps) {
  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <p className="mt-5 text-lg text-brand-gray">{body}</p>
          <div className="mt-8 flex justify-center">
            <Button href={ctaHref} variant="primary" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
