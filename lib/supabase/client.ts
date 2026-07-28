/**
 * Client Supabase — contexte navigateur (composants « use client »).
 * La session est stockée dans les cookies (via @supabase/ssr) afin d'être
 * lisible côté serveur et par le middleware.
 */

import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
