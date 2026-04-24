// TODO: wire these buttons to analytics once we have a feedback endpoint.
export function ArticleFeedback() {
  const buttonClass =
    'inline-flex h-10 items-center justify-center rounded-full bg-white px-5 font-heading text-sm font-semibold text-ink ring-1 ring-black/10 transition-colors hover:ring-brand-orange/50 hover:text-brand-orange'
  return (
    <div className="mt-16 rounded-card bg-surface-alt p-6 ring-1 ring-black/5 md:p-8">
      <h3 className="font-heading text-base font-semibold text-ink">
        Was this article helpful?
      </h3>
      <div className="mt-4 flex gap-3">
        <button type="button" className={buttonClass} aria-label="Yes, this was helpful">
          Yes
        </button>
        <button type="button" className={buttonClass} aria-label="No, this was not helpful">
          No
        </button>
      </div>
    </div>
  )
}
