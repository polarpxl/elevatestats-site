'use client'

import { useState } from 'react'

type FeedbackState = 'pending' | 'yes' | 'no'

const buttonClass =
  'inline-flex h-10 items-center justify-center rounded-full bg-white px-5 font-heading text-sm font-semibold text-ink ring-1 ring-black/10 transition-colors hover:ring-brand-orange/50 hover:text-brand-orange'

export function ArticleFeedback() {
  const [state, setState] = useState<FeedbackState>('pending')

  // TODO: wire to analytics (Plausible/PostHog/etc.) when tool is chosen
  const submit = (value: 'yes' | 'no') => setState(value)

  return (
    <div className="mt-16 rounded-card bg-surface-alt p-6 ring-1 ring-black/5 md:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <h3 className="font-heading text-base font-semibold text-ink">
          Was this article helpful?
        </h3>
        {state === 'pending' ? (
          <div className="flex gap-3">
            <button
              type="button"
              className={buttonClass}
              aria-label="Yes, this was helpful"
              onClick={() => submit('yes')}
            >
              Yes
            </button>
            <button
              type="button"
              className={buttonClass}
              aria-label="No, this was not helpful"
              onClick={() => submit('no')}
            >
              No
            </button>
          </div>
        ) : (
          <p className="text-sm text-brand-gray">Thanks for the feedback.</p>
        )}
      </div>
    </div>
  )
}
