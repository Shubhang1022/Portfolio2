import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Server-side client (uses service role key — never expose to browser)
export const supabase = createClient(supabaseUrl, supabaseKey)

// Public client (safe for browser — uses anon key)
export const supabasePublic = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
