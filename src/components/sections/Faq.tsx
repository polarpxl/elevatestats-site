'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { faqs, type FaqEntry } from '@/lib/faqs'

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
