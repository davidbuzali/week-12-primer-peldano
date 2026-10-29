import VentureApp from '@/src/components/VentureApp'
import { isSupabaseConfigured } from '@/src/lib/supabase'

export default function Home() {
  return <VentureApp supabaseConfigured={isSupabaseConfigured()} />
}
