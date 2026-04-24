'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'sent'

const initialForm = { name: '', email: '', subject: '', message: '' }

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-heading text-sm font-semibold text-ink"
    >
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl bg-white px-4 py-3 text-base text-ink ring-1 ring-black/10 placeholder:text-brand-gray/60 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-orange'

export function SupportContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState(initialForm)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    // TODO: Replace this entire form block with AIDbase embed when ready
    window.setTimeout(() => setStatus('sent'), 600)
  }

  function reset() {
    setForm(initialForm)
    setStatus('idle')
  }

  if (status === 'sent') {
    return (
      <div className="rounded-card bg-white p-8 ring-1 ring-black/5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <div>
            <h3 className="font-heading text-xl font-bold text-ink">
              Thanks, {form.name.split(' ')[0] || 'there'}.
            </h3>
            <p className="mt-2 text-brand-gray">
              We&rsquo;ll be in touch within one business day.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex items-center gap-1 font-heading text-sm font-semibold text-brand-orange transition-colors hover:text-[#E65C00]"
            >
              Send another message
              <span aria-hidden>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card bg-white p-6 ring-1 ring-black/5 shadow-sm md:p-8"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="support-name">Name</Label>
          <input
            id="support-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor="support-email">Email</Label>
          <input
            id="support-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="support-subject">Subject</Label>
        <input
          id="support-subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="support-message">Message</Label>
        <textarea
          id="support-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${inputClass} resize-y`}
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand-orange px-7 font-heading text-base font-semibold text-white transition-colors hover:bg-[#E65C00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-60 w-full sm:w-auto"
        >
          {sending ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
