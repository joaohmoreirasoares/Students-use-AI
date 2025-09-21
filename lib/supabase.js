import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nnetwklqcubrfxtoygyc.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXR3a2xxY3VicmZ4dG95Z3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODU3OTIsImV4cCI6MjA3NDA2MTc5Mn0.Wkjblz_GsikPZnFo50DnN5llQEH3enVe2uh_ZlcW_5g'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tabelas do banco
export const TABLES = {
  USERS: 'users',
  MESSAGES: 'messages',
  CONVERSATIONS: 'conversations'
}