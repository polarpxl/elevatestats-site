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
      // Implicit flow (NOT pkce) to match the app's own auth. The email
      // confirmation then arrives as a plain token that redirects to the app
      // with the session in the URL hash (#access_token=...), which the app
      // picks up exactly like a native app signup. PKCE would instead send a
      // ?code that can only be exchanged on the domain/browser that started the
      // signup — which breaks cross-domain (marketing -> app) confirmation and
      // cross-browser email clicks (common on mobile/Facebook traffic).
      // detectSessionInUrl also lets the Google OAuth return to /parents pick up
      // its hash-token session before we forward it into the app.
      flowType: 'implicit',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return client
}
