import { type NextRequest, NextResponse } from "next/server"
import { getWalletBalance, getWalletTransactions, getETHPrice, analyzeWalletRisk } from "@/lib/blockchain-apis"
import {
  saveWalletAnalysis,
  getWalletAnalysis,
  saveWalletTransactions,
  getWalletTokens,
  getWalletConnections,
  getOSINTData,
  getRiskAssessments,
} from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  const { searchParams } = new URL(request.url)
  const network = searchParams.get("network") || "ethereum"
  const address = params.address

  try {
    // Verificar si ya tenemos datos recientes en la base de datos
    const existingData = await getWalletAnalysis(address, network)
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    if (existingData && new Date(existingData.updated_at || existingData.created_at || 0) > oneHourAgo) {
      // Obtener datos adicionales
      const [tokens, connections, osintData, riskData] = await Promise.all([
        getWalletTokens(address),
        getWalletConnections(address),
        getOSINTData(address),
        getRiskAssessments(address),
      ])

      return NextResponse.json({
        ...existingData,
        tokens,
        connections,
        osintData,
        riskData,
        fromCache: true,
      })
    }

    // Obtener datos frescos de la blockchain
    console.log(`Analizando wallet ${address} en ${network}...`)

    const [balance, transactions, ethPrice] = await Promise.all([
      getWalletBalance(address, network),
      getWalletTransactions(address, network),
      getETHPrice(),
    ])

    const balanceUSD = balance * ethPrice

    // Análisis de riesgo
    const riskAnalysis = await analyzeWalletRisk(address, transactions)

    // Calcular primera y última actividad
    const firstActivity =
      transactions.length > 0 ? new Date(Math.min(...transactions.map((tx) => new Date(tx.timestamp).getTime()))) : null

    const lastActivity =
      transactions.length > 0 ? new Date(Math.max(...transactions.map((tx) => new Date(tx.timestamp).getTime()))) : null

    // Preparar datos para guardar
    const walletData = {
      address,
      network,
      balance,
      balance_usd: balanceUSD,
      total_value_usd: balanceUSD, // Se actualizará con el valor de tokens
      transaction_count: transactions.length,
      first_activity: firstActivity?.toISOString(),
      last_activity: lastActivity?.toISOString(),
      risk_score: riskAnalysis.riskScore,
      security_flags: {
        mixer_interactions: 0,
        sanctioned_addresses: 0,
        phishing_flags: 0,
        verified_contracts: transactions.filter((tx) => tx.method_id !== "0x").length,
      },
      osint_data: {
        social_media: { twitter: null, reddit: null, github: null },
        databases: { ens: null, opensea: null, etherscan: "verified" },
        risk_factors: riskAnalysis.riskFactors,
      },
    }

    // Guardar en base de datos
    await Promise.all([
      saveWalletAnalysis(walletData),
      transactions.length > 0
        ? saveWalletTransactions(transactions.map((tx) => ({ ...tx, wallet_address: address })))
        : Promise.resolve(),
    ])

    // Obtener datos adicionales
    const [tokens, connections, osintData, riskData] = await Promise.all([
      getWalletTokens(address),
      getWalletConnections(address),
      getOSINTData(address),
      getRiskAssessments(address),
    ])

    // Respuesta con datos completos
    const response = {
      ...walletData,
      transactions: transactions.slice(0, 20), // Solo las últimas 20 para la respuesta
      tokens,
      connections,
      osintData,
      riskData,
      riskAnalysis,
      ethPrice,
      analysis_timestamp: new Date().toISOString(),
      fromCache: false,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error analizando wallet:", error)
    return NextResponse.json(
      { error: "Error al analizar la wallet", details: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    )
  }
}
