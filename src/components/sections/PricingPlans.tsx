'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { pricing, type BillingPeriod, type Plan } from '@/lib/pricing'

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10.5l3.5 3.5L16 6" />
    </svg>
  )
}

function BillingToggle({
  period,
  onChange,
}: {
  period: BillingPeriod
  onChange: (p: BillingPeriod) => void
}) {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
      <div
        role="group"
        aria-label="Billing period"
        className="relative inline-flex rounded-full bg-white p-1 ring-1 ring-black/10"
      >
        <motion.span
          aria-hidden
          className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-brand-orange"
          animate={{ x: period === 'monthly' ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          style={{ left: '0.25rem' }}
        />
        {(['monthly', 'yearly'] as const).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={period === p}
            onClick={() => onChange(p)}
            className={cn(
              'relative z-10 h-10 w-28 rounded-full font-heading text-sm font-semibold transition-colors',
              period === p ? 'text-white' : 'text-ink',
            )}
          >
            {p === 'monthly' ? 'Monthly' : 'Yearly'}
          </button>
        ))}
      </div>
      <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
        Save 17%
      </span>
    </div>
  )
}

function formatMonthlyEquivalent(priceYearly: number): string {
  // Exact figure, two-decimal format, so the savings math reads truthfully.
  return (priceYearly / 12).toLocaleString('en-CA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function PriceBlock({ plan, period }: { plan: Plan; period: BillingPeriod }) {
  const isFree = plan.priceMonthly === 0 && plan.priceYearly === 0

  if (isFree) {
    return (
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-heading text-5xl font-extrabold text-ink">$0</span>
        <span className="text-brand-gray">forever</span>
      </div>
    )
  }

  if (period === 'monthly') {
    return (
      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-5xl font-extrabold text-ink">
            ${plan.priceMonthly}
          </span>
          <span className="text-brand-gray">/mo</span>
        </div>
        <p className="mt-1 text-sm text-brand-gray">Billed monthly in {plan.currency}.</p>
      </div>
    )
  }

  const monthlyEquivalent = formatMonthlyEquivalent(plan.priceYearly)
  const savings = 'yearlySavingsPercent' in plan ? plan.yearlySavingsPercent : 0
  return (
    <div className="mt-6">
      <div className="flex items-baseline gap-2">
        <span className="font-heading text-5xl font-extrabold text-ink">
          ${plan.priceYearly}
        </span>
        <span className="text-brand-gray">/year</span>
      </div>
      <p className="mt-1 text-sm text-brand-gray">
        That&rsquo;s ${monthlyEquivalent}/mo billed annually. Save {savings}%.
      </p>
    </div>
  )
}

function PlanCard({
  plan,
  period,
  popular = false,
}: {
  plan: Plan
  period: BillingPeriod
  popular?: boolean
}) {
  return (
    <article
      className={cn(
        'relative flex flex-col rounded-card bg-white p-6 shadow-sm md:p-8',
        popular ? 'ring-2 ring-brand-orange/40' : 'ring-1 ring-black/5',
      )}
    >
      {popular && (
        <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-brand-orange px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
          Most Popular
        </span>
      )}

      <h3 className="font-heading text-xl font-bold tracking-tight text-ink">{plan.name}</h3>
      <p className="mt-1 text-sm text-brand-gray">{plan.tagline}</p>

      <PriceBlock plan={plan} period={period} />

      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={plan.ctaHref}
        variant={popular ? 'primary' : 'secondary'}
        size="lg"
        className="mt-8 w-full"
      >
        {plan.ctaLabel}
      </Button>
    </article>
  )
}

export function PricingPlans() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly')

  return (
    <section className="bg-surface-alt pb-20 md:pb-28">
      <Container>
        <div className="flex justify-center">
          <BillingToggle period={period} onChange={setPeriod} />
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:mt-14 md:grid-cols-2">
          <PlanCard plan={pricing.free} period={period} />
          <PlanCard plan={pricing.pro} period={period} popular />
        </div>
      </Container>
    </section>
  )
}
