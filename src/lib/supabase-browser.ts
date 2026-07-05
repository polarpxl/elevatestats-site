import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Browser-side Supabase client for the /parents signup landing page. Talks to the
// same project the app uses so accounts created here work when the visitor lands
// in the app. Both env values are public client keys.
//
// Created lazily as a singleton so the client (and its ~40kb of JS) only loads on
// routes that actually import it — i.e. /parents — keeping the rest of the marketing
// site lean.
let client: SupabaseClient | null = null

export function getSupabaseBrowserClient(): SupabaseClient {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Set them in .env.local and Vercel.',
    )
  }

  client = createClient(url, anonKey, {
    auth: {
      // PKCE + detectSessionInUrl lets the client complete the Google OAuth
      // round-trip (?code=...) when the provider redirects back to /parents.
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return client
}
