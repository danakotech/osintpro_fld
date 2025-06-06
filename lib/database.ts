import { supabase } from "./supabase"

export interface WalletAnalysis {
  id?: number
  address: string
  network: string
  balance: number
  balance_usd: number
  total_value_usd: number
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
  gas_price?: number
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

// Funciones de base de datos
export async function saveWalletAnalysis(data: WalletAnalysis) {
  const { data: result, error } = await supabase
    .from("wallet_analysis")
    .upsert(data, { onConflict: "address,network" })
    .select()

  if (error) throw error
  return result
}

export async function getWalletAnalysis(address: string, network: string) {
  const { data, error } = await supabase
    .from("wallet_analysis")
    .select("*")
    .eq("address", address)
    .eq("network", network)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function saveWalletTransactions(transactions: WalletTransaction[]) {
  const { data, error } = await supabase
    .from("wallet_transactions")
    .upsert(transactions, { onConflict: "tx_hash" })
    .select()

  if (error) throw error
  return data
}

export async function getWalletTransactions(address: string, limit = 100) {
  const { data, error } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("wallet_address", address)
    .order("timestamp", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function saveWalletTokens(tokens: WalletToken[]) {
  const { data, error } = await supabase
    .from("wallet_tokens")
    .upsert(tokens, { onConflict: "wallet_address,token_address" })
    .select()

  if (error) throw error
  return data
}

export async function getWalletTokens(address: string) {
  const { data, error } = await supabase
    .from("wallet_tokens")
    .select("*")
    .eq("wallet_address", address)
    .order("balance_usd", { ascending: false })

  if (error) throw error
  return data
}

export async function saveWalletComparison(comparison: WalletComparison) {
  const { data, error } = await supabase.from("wallet_comparisons").insert(comparison).select()

  if (error) throw error
  return data
}

export async function getWalletConnections(address: string) {
  const { data, error } = await supabase
    .from("wallet_connections")
    .select("*")
    .or(`wallet1.eq.${address},wallet2.eq.${address}`)
    .order("interaction_count", { ascending: false })

  if (error) throw error
  return data
}

export async function getOSINTData(address: string) {
  const { data, error } = await supabase.from("osint_social_data").select("*").eq("wallet_address", address)

  if (error) throw error
  return data
}

export async function getRiskAssessments(address: string) {
  const { data, error } = await supabase
    .from("risk_assessments")
    .select("*")
    .eq("wallet_address", address)
    .order("risk_score", { ascending: false })

  if (error) throw error
  return data
}
