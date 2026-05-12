// In-memory rate limiter keyed by IP. State lives in the Node process and
// resets on server restart / cold start. Fine for the current marketing-site
// volume — swap for Vercel KV or Upstash if abuse becomes an issue.

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 3

const hits = new Map<string, number[]>()

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfter: number }

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now()
  const cutoff = now - WINDOW_MS
  const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff)

  if (recent.length >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((recent[0] + WINDOW_MS - now) / 1000)
    hits.set(ip, recent)
    return { allowed: false, retryAfter }
  }

  recent.push(now)
  hits.set(ip, recent)
  return { allowed: true }
}
