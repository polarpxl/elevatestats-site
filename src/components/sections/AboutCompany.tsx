import { Container } from '@/components/ui/Container'

export function AboutCompany() {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-heading text-base font-semibold uppercase tracking-[0.18em] text-brand-gray">
            The company
          </h3>
          <p className="mt-4 text-sm text-brand-gray md:text-base">
            Elevate Sports Labs Inc. Incorporated in Ontario, Canada. Parent of the Elevate
            Sports Stats division. Elevate Hockey Stats is our first product.
          </p>
        </div>
      </Container>
    </section>
  )
}
