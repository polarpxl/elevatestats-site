import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

if (!apiKey) {
  // Log once at module load; the action layer surfaces a generic error to users.
  console.warn('[resend] RESEND_API_KEY is not set — outbound email will fail.')
}

const resend = new Resend(apiKey ?? 're_missing_key')

export default resend
