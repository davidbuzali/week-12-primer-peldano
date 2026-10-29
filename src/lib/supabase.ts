import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey)
}

export function createPublicSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) return null
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
