'use server'

import { headers } from 'next/headers'
import { z } from 'zod'
import resend from '@/lib/resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { formSchema, type FormFieldErrors, type SubmitFormState } from '@/lib/schemas/form'
import {
  contactAutoReplyEmail,
  contactNotificationEmail,
  supportAutoReplyEmail,
  supportNotificationEmail,
} from '@/lib/emails/templates'

const FROM_NOTIFICATION = 'Elevate Stats <no-reply@elevatesportslabs.com>'
const FROM_AUTO_REPLY = 'Elevate Stats Team <no-reply@elevatesportslabs.com>'

async function getClientIp(): Promise<string> {
  const h = await headers()
  const fwd = h.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return h.get('x-real-ip')?.trim() ?? 'unknown'
}

export async function submitForm(
  _prev: SubmitFormState,
  formData: FormData,
): Promise<SubmitFormState> {
  const raw = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    subject: formData.get('subject')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
    formType: formData.get('formType')?.toString() ?? '',
  }

  const parsed = formSchema.safeParse(raw)
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error)
    return {
      status: 'error',
      error: 'validation',
      fieldErrors: flat.fieldErrors as FormFieldErrors,
    }
  }

  const data = parsed.data

  // Honeypot: silently succeed so bots don't learn they were caught.
  if (data.website.trim() !== '') {
    return { status: 'success' }
  }

  const ip = await getClientIp()
  const rate = checkRateLimit(ip)
  if (!rate.allowed) {
    return { status: 'error', error: 'rate_limit' }
  }

  const submittedAt = new Date().toLocaleString('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  })

  const notificationTo =
    data.formType === 'support'
      ? process.env.SUPPORT_NOTIFICATION_EMAIL ?? 'support@elevatesportslabs.com'
      : process.env.CONTACT_NOTIFICATION_EMAIL ?? 'hello@elevatesportslabs.com'

  const notificationSubject =
    data.formType === 'support'
      ? `Support request: ${data.subject} — from ${data.name}`
      : `New contact form submission from ${data.name}`

  const notificationHtml =
    data.formType === 'support'
      ? supportNotificationEmail({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          ip,
          submittedAt,
        })
      : contactNotificationEmail({
          name: data.name,
          email: data.email,
          subject: data.subject || undefined,
          message: data.message,
          ip,
          submittedAt,
        })

  const autoReplyHtml =
    data.formType === 'support'
      ? supportAutoReplyEmail({ name: data.name, subject: data.subject })
      : contactAutoReplyEmail({ name: data.name })

  const autoReplySubject =
    data.formType === 'support'
      ? 'We got your support request'
      : 'Thanks for reaching out to Elevate Stats'

  try {
    const [notify, reply] = await Promise.all([
      resend.emails.send({
        from: FROM_NOTIFICATION,
        to: notificationTo,
        replyTo: data.email,
        subject: notificationSubject,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: FROM_AUTO_REPLY,
        to: data.email,
        subject: autoReplySubject,
        html: autoReplyHtml,
      }),
    ])

    if (notify.error || reply.error) {
      console.error('[submit-form] resend error', {
        notify: notify.error,
        reply: reply.error,
      })
      return { status: 'error', error: 'send_failed' }
    }
  } catch (err) {
    console.error('[submit-form] unexpected error', err)
    return { status: 'error', error: 'send_failed' }
  }

  return { status: 'success' }
}
