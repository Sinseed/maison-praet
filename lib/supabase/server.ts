/**
 * Client Supabase — contexte serveur (Server Components, Route Handlers,
 * Server Actions). La session est portée par les cookies de la requête.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Appelé depuis un Server Component : l'écriture de cookies y est
          // interdite. Sans effet si le middleware rafraîchit la session.
        }
      },
    },
  })
}
