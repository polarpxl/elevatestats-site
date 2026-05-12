'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { initialState, submitForm, type SubmitFormState } from '@/app/actions/submit-form'

type FormType = 'contact' | 'support'

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

const idPrefixCounter = { current: 0 }

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages || messages.length === 0) return null
  return (
    <p className="mt-2 text-sm text-red-600" role="alert">
      {messages[0]}
    </p>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-7 font-heading text-base font-semibold text-white transition-colors hover:bg-[#E65C00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-60 sm:w-auto"
    >
      {pending ? 'Sending…' : 'Send message'}
    </button>
  )
}

function getFormError(state: SubmitFormState, formType: FormType): string | null {
  if (state.status !== 'error') return null
  if (state.error === 'rate_limit') {
    return "You've sent a few messages recently. Please try again in a few minutes."
  }
  if (state.error === 'send_failed') {
    const fallback =
      formType === 'support' ? 'support@elevatesportslabs.com' : 'hello@elevatesportslabs.com'
    return `Something went wrong on our end. Please try again, or email us directly at ${fallback}.`
  }
  return null
}

export function MarketingContactForm({
  formType = 'contact',
  successCopy,
  idPrefix,
}: {
  formType?: FormType
  successCopy?: string
  idPrefix?: string
}) {
  const [prefix] = useState(() => {
    if (idPrefix) return idPrefix
    idPrefixCounter.current += 1
    return `mcf-${idPrefixCounter.current}`
  })
  const [submittedName, setSubmittedName] = useState<string>('')
  const [state, formAction] = useActionState<SubmitFormState, FormData>(
    async (prev, formData) => {
      setSubmittedName(formData.get('name')?.toString() ?? '')
      return submitForm(prev, formData)
    },
    initialState,
  )

  const resolvedSuccessCopy =
    successCopy ??
    (formType === 'support'
      ? 'Thanks for reaching out. Someone from our team will get back to you within one business day, often sooner.'
      : "Thanks for reaching out. We'll get back to you within one to two business days.")

  if (state.status === 'success') {
    const firstName = submittedName.split(' ')[0] || 'there'
    return (
      <div className="rounded-card bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <div>
            <h3 className="font-heading text-xl font-bold text-ink">Thanks, {firstName}.</h3>
            <p className="mt-2 text-brand-gray">{resolvedSuccessCopy}</p>
          </div>
        </div>
      </div>
    )
  }

  const fieldErrors = state.status === 'error' && state.error === 'validation' ? state.fieldErrors : {}
  const formError = getFormError(state, formType)

  return (
    <form
      action={formAction}
      className="rounded-card bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8"
      noValidate
    >
      <input type="hidden" name="formType" value={formType} />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor={`${prefix}-website`}>
          Leave this field empty
          <input
            id={`${prefix}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`${prefix}-name`}>Name</Label>
          <input
            id={`${prefix}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
          <FieldError messages={fieldErrors.name} />
        </div>
        <div>
          <Label htmlFor={`${prefix}-email`}>Email</Label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
          <FieldError messages={fieldErrors.email} />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor={`${prefix}-subject`}>
          Subject{formType === 'contact' ? <span className="ml-1 text-brand-gray/70">(optional)</span> : null}
        </Label>
        <input
          id={`${prefix}-subject`}
          name="subject"
          type="text"
          required={formType === 'support'}
          className={inputClass}
        />
        <FieldError messages={fieldErrors.subject} />
      </div>
      <div className="mt-4">
        <Label htmlFor={`${prefix}-message`}>Message</Label>
        <textarea
          id={`${prefix}-message`}
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
        />
        <FieldError messages={fieldErrors.message} />
      </div>

      {formError ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  )
}
