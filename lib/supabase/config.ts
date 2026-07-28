/**
 * Coordonnées publiques du projet Supabase.
 *
 * L'URL et la clé « publishable » (anon) sont conçues pour être exposées côté
 * navigateur — la sécurité repose sur la Row Level Security de Postgres, pas
 * sur le secret de cette clé. On les lit d'abord depuis les variables
 * d'environnement (recommandé en production), avec repli sur les valeurs du
 * projet pour que l'app fonctionne sans configuration supplémentaire.
 *
 * ⚠️ Ne JAMAIS mettre ici la clé « service_role » / `sb_secret_…` : celle-ci
 * reste uniquement dans les variables d'environnement du serveur (Vercel).
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dhhmreryjfkkjnbcisgr.supabase.co'

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_-qd2pab48d3NLDCCD1oHzw_KN3yoHY3'
