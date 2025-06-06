import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://srwyafqvpnhjzgmastuo.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd3lhZnF2cG5oanpnbWFzdHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjc0NzYsImV4cCI6MjA2NDgwMzQ3Nn0.89PDDVg8aVQrTulrzXYBrd4K0WbKsA19Es86P5Vibss"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Configuración de la base de datos
export const DATABASE_URL =
  "postgresql://postgres:Controller2025!bbdd@db.srwyafqvpnhjzgmastuo.supabase.co:5432/postgres"
