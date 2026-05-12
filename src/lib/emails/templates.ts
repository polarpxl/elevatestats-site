const LOGO_URL = 'https://elevatestats.app/brand/EmailLogo-EHS-logo-primary.png'
const SUPPORT_URL = 'https://elevatestats.app/support'
const SUPPORT_EMAIL = 'support@elevatesportslabs.com'

const COLOURS = {
  orange: '#FF6600',
  orangeHover: '#E65C00',
  heading: '#4D4D4D',
  body: '#4D4D4D',
  muted: '#808080',
  card: '#FFFFFF',
  page: '#F7F7F8',
  border: '#E0E0E0',
  borderSoft: '#F0F0F0',
}

const FONT_STACK =
  "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function preserveLineBreaks(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br />')
}

function wrap({ title, body }: { title: string; body: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLOURS.page};font-family:${FONT_STACK};color:${COLOURS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOURS.page};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <img src="${LOGO_URL}" alt="Elevate Stats" width="160" style="display:block;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLOURS.card};border:1px solid ${COLOURS.borderSoft};border-radius:12px;padding:32px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 8px 0;font-size:12px;line-height:1.6;color:${COLOURS.muted};">
                Elevate Stats is a product of Elevate Sports Labs Inc.<br />
                Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:${COLOURS.muted};text-decoration:underline;">${SUPPORT_EMAIL}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function heading(text: string): string {
  return `<h1 style="margin:0 0 20px;font-family:${FONT_STACK};font-size:22px;line-height:1.3;font-weight:600;color:${COLOURS.heading};">${escapeHtml(text)}</h1>`
}

function field(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;font-size:13px;font-weight:600;color:${COLOURS.muted};width:90px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;font-size:14px;color:${COLOURS.body};vertical-align:top;">${value}</td>
  </tr>`
}

function messageBlock(message: string): string {
  return `<div style="margin-top:8px;background-color:${COLOURS.page};border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:${COLOURS.body};white-space:pre-wrap;">${preserveLineBreaks(message)}</div>`
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 8px;">
    <tr>
      <td style="border-radius:999px;background-color:${COLOURS.orange};">
        <a href="${href}" style="display:inline-block;padding:12px 24px;font-family:${FONT_STACK};font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`
}

function metaLine(text: string): string {
  return `<p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:${COLOURS.muted};">${escapeHtml(text)}</p>`
}

function infoTable(rows: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:8px;">${rows}</table>`
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${COLOURS.body};">${preserveLineBreaks(text)}</p>`
}

export function contactNotificationEmail(params: {
  name: string
  email: string
  subject?: string
  message: string
  ip: string
  submittedAt: string
}): string {
  const { name, email, subject, message, ip, submittedAt } = params
  const subjectRow = subject && subject.trim().length > 0 ? field('Subject', escapeHtml(subject)) : ''
  const body =
    heading('New contact form submission') +
    infoTable(
      subjectRow +
        field('Name', escapeHtml(name)) +
        field('Email', `<a href="mailto:${email}" style="color:${COLOURS.orange};text-decoration:none;">${escapeHtml(email)}</a>`),
    ) +
    messageBlock(message) +
    ctaButton(`mailto:${email}`, `Reply to ${name}`) +
    metaLine(`Submitted ${submittedAt} from IP ${ip}`)
  return wrap({ title: 'New contact form submission', body })
}

export function supportNotificationEmail(params: {
  name: string
  email: string
  subject: string
  message: string
  ip: string
  submittedAt: string
}): string {
  const { name, email, subject, message, ip, submittedAt } = params
  const body =
    heading('New support request') +
    `<p style="margin:0 0 16px;font-size:13px;font-weight:600;color:${COLOURS.muted};text-transform:uppercase;letter-spacing:0.04em;">Subject</p>
     <p style="margin:0 0 20px;font-size:17px;font-weight:600;color:${COLOURS.heading};">${escapeHtml(subject)}</p>` +
    infoTable(
      field('Name', escapeHtml(name)) +
        field('Email', `<a href="mailto:${email}" style="color:${COLOURS.orange};text-decoration:none;">${escapeHtml(email)}</a>`),
    ) +
    messageBlock(message) +
    ctaButton(`mailto:${email}`, `Reply to ${name}`) +
    metaLine(`Submitted ${submittedAt} from IP ${ip}`)
  return wrap({ title: 'New support request', body })
}

export function contactAutoReplyEmail(params: { name: string }): string {
  const { name } = params
  const body =
    heading('Thanks for reaching out') +
    paragraph(`Hi ${name},`) +
    paragraph(
      'Thanks for reaching out to Elevate Stats. We got your message and will get back to you within one to two business days.',
    ) +
    paragraph('In the meantime, you can check out our support articles at elevatestats.app/support.') +
    ctaButton(SUPPORT_URL, 'Browse support articles') +
    paragraph('The Elevate Stats team')
  return wrap({ title: 'Thanks for reaching out', body })
}

export function supportAutoReplyEmail(params: { name: string; subject: string }): string {
  const { name, subject } = params
  const body =
    heading('We got your support request') +
    paragraph(`Hi ${name},`) +
    paragraph(
      `Thanks for reaching out. We've received your support request about "${subject}" and someone from our team will get back to you within one business day, often sooner.`,
    ) +
    paragraph(
      'If you need an answer right away, our support articles at elevatestats.app/support cover most common questions.',
    ) +
    ctaButton(SUPPORT_URL, 'Browse support articles') +
    paragraph('The Elevate Stats team')
  return wrap({ title: 'We got your support request', body })
}
