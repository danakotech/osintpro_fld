import { supabase } from "./supabase"

// Interfaces para los tipos de datos
export interface WalletAnalysis {
  id?: number
  address: string
  network: string
  balance: number
  balance_usd: number
  total_value_usd?: number
  transaction_count: number
  first_activity?: string
  last_activity?: string
  risk_score: number
  security_flags?: any
  osint_data?: any
  created_at?: string
  updated_at?: string
}

export interface WalletTransaction {
  id?: number
  wallet_address: string
  tx_hash: string
  block_number?: number
  from_address?: string
  to_address?: string
  value: number
  gas_used?: number
  gas_price?: string
  transaction_fee?: number
  timestamp: string
  transaction_type?: string
  method_id?: string
  created_at?: string
}

export interface WalletToken {
  id?: number
  wallet_address: string
  token_address: string
  token_name: string
  token_symbol: string
  token_decimals: number
  balance: number
  balance_usd: number
  created_at?: string
}

export interface WalletComparison {
  id?: number
  wallet1: string
  wallet2: string
  common_wallets: number
  similarity_score: number
  risk_level: string
  comparison_data?: any
  created_at?: string
}

// Funciones para interactuar con la base de datos
export async function saveWalletAnalysis(data: WalletAnalysis) {
  try {
    const { data: result, error } = await supabase
      .from("wallet_analysis")
      .upsert(data, { onConflict: "address,network" })
      .select()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error guardando análisis de wallet:", error)
    return null
  }
}

export async function getWalletAnalysis(address: string, network: string) {
  try {
    const { data, error } = await supabase
      .from("wallet_analysis")
      .select("*")
      .eq("address", address.toLowerCase())
      .eq("network", network)
      .single()

    if (error && error.code !== "PGRST116") throw error
    return data
  } catch (error) {
    console.error("Error obteniendo análisis de wallet:", error)
    return null
  }
}

export async function saveWalletTransactions(transactions: WalletTransaction[]) {
  try {
    if (transactions.length === 0) return []

    const { data, error } = await supabase
      .from("wallet_transactions")
      .upsert(transactions, { onConflict: "tx_hash" })
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error guardando transacciones:", error)
    return []
  }
}

export async function getWalletTransactions(address: string, limit = 100) {
  try {
    const { data, error } = await supabase
      .from("wallet_transactions")
      .select("*")
      .eq("wallet_address", address.toLowerCase())
      .order("timestamp", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error obteniendo transacciones:", error)
    return []
  }
}

export async function saveWalletTokens(tokens: WalletToken[]) {
  try {
    if (tokens.length === 0) return []

    const { data, error } = await supabase
      .from("wallet_tokens")
      .upsert(tokens, { onConflict: "wallet_address,token_address" })
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error guardando tokens:", error)
    return []
  }
}

export async function getWalletTokens(address: string) {
  try {
    const { data, error } = await supabase
      .from("wallet_tokens")
      .select("*")
      .eq("wallet_address", address.toLowerCase())
      .order("balance_usd", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error obteniendo tokens:", error)
    return []
  }
}

export async function saveWalletComparison(comparison: WalletComparison) {
  try {
    const { data, error } = await supabase.from("wallet_comparisons").insert(comparison).select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error guardando comparación:", error)
    return null
  }
}

export async function getWalletConnections(address: string) {
  try {
    const { data, error } = await supabase
      .from("wallet_connections")
      .select("*")
      .or(`wallet1.eq.${address.toLowerCase()},wallet2.eq.${address.toLowerCase()}`)
      .order("interaction_count", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error obteniendo conexiones:", error)
    return []
  }
}

export async function getOSINTData(address: string) {
  try {
    const { data, error } = await supabase
      .from("osint_social_data")
      .select("*")
      .eq("wallet_address", address.toLowerCase())

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error obteniendo datos OSINT:", error)
    return []
  }
}

export async function getRiskAssessments(address: string) {
  try {
    const { data, error } = await supabase
      .from("risk_assessments")
      .select("*")
      .eq("wallet_address", address.toLowerCase())
      .order("risk_score", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error obteniendo evaluaciones de riesgo:", error)
    return []
  }
}
