'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'

type FaqEntry = { question: string; answer: string }

const faqs: FaqEntry[] = [
  {
    question: 'What counts as a "Pro game" on the free tier?',
    answer:
      "Only finalized games count toward your 3-game Pro trial. Games you start but don't finalize don't burn a trial game, and games you delete before finalizing don't count either. The counter is per account, so creating a new team won't reset it.",
  },
  {
    question: 'What happens after my 3 Pro games?',
    answer:
      "You drop to the Free tier automatically. You can keep tracking unlimited games at the team level forever. You'll lose access to player-level stats, AI insights, opponent analysis, full game history, and CSV import/export until you upgrade. Your data stays put. Nothing is deleted.",
  },
  {
    question: 'Does Pro auto-renew?',
    answer:
      'Yes. Monthly Pro renews every month, yearly Pro renews every year, until you cancel. We send a reminder before any yearly renewal.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Yes, in two taps from your account settings. You'll keep Pro access until the end of your current billing period, then drop to Free. No further charges.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "No, but we make it easy to avoid needing one. The Free tier is genuinely free forever, and you get 3 full Pro games to try everything before you pay. If Pro isn't working for you, cancel anytime in two taps and you won't be charged again.",
  },
  {
    question: 'What happens to my data if I cancel?',
    answer:
      "Nothing. Your account stays active and all your game data stays in your account. You'll keep seeing team-level stats and your last 5 games. Player stats, AI insights, and full history get hidden until you re-subscribe, at which point everything reappears exactly as it was.",
  },
  {
    question: 'Why is pricing in CAD?',
    answer:
      "We're a Canadian company building for Canadian hockey first. Stripe handles the conversion automatically if your card is in another currency.",
  },
  {
    question: 'Do you have team or league plans?',
    answer:
      "Yes. If you're a club, association, or league looking to roll out Elevate Stats across multiple teams, contact us and we'll put together a plan that fits.",
  },
  {
    question: 'Can I export my data?',
    answer:
      'Pro users can export every game, roster, and stat to CSV. Free users can’t export. If you upgrade, then cancel, you can re-subscribe later to export. Your data is always there waiting.',
  },
  {
    question: 'How do I delete my account?',
    answer:
      "Account deletion is available from your account settings. This permanently deletes all your data and can't be undone. Contact us if you need help.",
  },
]

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  )
}

function FaqRow({
  entry,
  open,
  onToggle,
}: {
  entry: FaqEntry
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-ink md:text-lg">
          {entry.question}
        </span>
        <ChevronIcon
          className={cn(
            'h-5 w-5 shrink-0 text-brand-gray transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-brand-gray">{entry.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            FAQ
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">
            Everything we get asked most. Something missing? Contact us.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          {faqs.map((entry, i) => (
            <FaqRow
              key={entry.question}
              entry={entry}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
