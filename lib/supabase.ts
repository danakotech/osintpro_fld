import { createClient } from "@supabase/supabase-js"

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://srwyafqvpnhjzgmastuo.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd3lhZnF2cG5oanpnbWFzdHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjc0NzYsImV4cCI6MjA2NDgwMzQ3Nn0.89PDDVg8aVQrTulrzXYBrd4K0WbKsA19Es86P5Vibss"

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
