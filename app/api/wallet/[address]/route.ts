import { type NextRequest, NextResponse } from "next/server"
import {
  getWalletBalance,
  getWalletTransactions,
  getWalletTokens,
  getETHPrice,
  analyzeWalletRisk,
  performOSINTAnalysis,
} from "@/lib/blockchain-apis"
import {
  saveWalletAnalysis,
  getWalletAnalysis,
  saveWalletTransactions,
  saveWalletTokens,
  getWalletConnections,
  getOSINTData,
  getRiskAssessments,
} from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  const { searchParams } = new URL(request.url)
  const network = searchParams.get("network") || "ethereum"
  const address = params.address

  try {
    console.log(`🔍 Iniciando análisis OSINT para ${address} en ${network}...`)

    // Verificar si ya tenemos datos recientes en la base de datos
    const existingData = await getWalletAnalysis(address, network)
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    if (existingData && new Date(existingData.updated_at || existingData.created_at || 0) > oneHourAgo) {
      console.log("📋 Usando datos en caché...")

      // Obtener datos adicionales
      const [connections, osintData, riskData] = await Promise.all([
        getWalletConnections(address),
        getOSINTData(address),
        getRiskAssessments(address),
      ])

      return NextResponse.json({
        ...existingData,
        connections,
        osintData,
        riskData,
        fromCache: true,
      })
    }

    // Obtener datos frescos de la blockchain
    console.log("🌐 Obteniendo datos frescos de blockchain...")

    const [balance, transactions, tokens, ethPrice] = await Promise.all([
      getWalletBalance(address, network),
      getWalletTransactions(address, network),
      getWalletTokens(address, network),
      getETHPrice(),
    ])

    console.log(`💰 Balance: ${balance} ${network === "ethereum" ? "ETH" : "MATIC"}`)
    console.log(`📊 Transacciones encontradas: ${transactions.length}`)
    console.log(`🪙 Tokens encontrados: ${tokens.length}`)

    const balanceUSD = balance * ethPrice

    // Análisis de riesgo
    console.log("🛡️ Ejecutando análisis de riesgo...")
    const riskAnalysis = await analyzeWalletRisk(address, transactions)

    // Análisis OSINT
    console.log("🕵️ Ejecutando análisis OSINT...")
    const osintAnalysis = await performOSINTAnalysis(address)

    // Calcular primera y última actividad
    const firstActivity =
      transactions.length > 0 ? new Date(Math.min(...transactions.map((tx) => new Date(tx.timestamp).getTime()))) : null

    const lastActivity =
      transactions.length > 0 ? new Date(Math.max(...transactions.map((tx) => new Date(tx.timestamp).getTime()))) : null

    // Calcular valor total incluyendo tokens
    const totalTokenValue = tokens.reduce((sum, token) => sum + (token.balance_usd || 0), 0)
    const totalValueUSD = balanceUSD + totalTokenValue

    // Preparar datos para guardar
    const walletData = {
      address,
      network,
      balance,
      balance_usd: balanceUSD,
      total_value_usd: totalValueUSD,
      transaction_count: transactions.length,
      first_activity: firstActivity?.toISOString(),
      last_activity: lastActivity?.toISOString(),
      risk_score: riskAnalysis.riskScore,
      security_flags: {
        mixer_interactions: 0,
        sanctioned_addresses: 0,
        phishing_flags: 0,
        verified_contracts: transactions.filter((tx) => tx.method_id !== "0x").length,
        high_gas_transactions: transactions.filter((tx) => (tx.gas_price || 0) > 50000000000).length,
      },
      osint_data: {
        ...osintAnalysis,
        risk_factors: riskAnalysis.riskFactors,
        analysis_timestamp: new Date().toISOString(),
      },
    }

    console.log("💾 Guardando datos en base de datos...")

    // Guardar en base de datos
    await Promise.all([
      saveWalletAnalysis(walletData),
      transactions.length > 0
        ? saveWalletTransactions(transactions.map((tx) => ({ ...tx, wallet_address: address })))
        : Promise.resolve(),
      tokens.length > 0
        ? saveWalletTokens(tokens.map((token) => ({ ...token, wallet_address: address })))
        : Promise.resolve(),
    ])

    // Obtener datos adicionales
    const [connections, osintData, riskData] = await Promise.all([
      getWalletConnections(address),
      getOSINTData(address),
      getRiskAssessments(address),
    ])

    // Respuesta con datos completos
    const response = {
      ...walletData,
      transactions: transactions.slice(0, 50), // Últimas 50 para la respuesta
      tokens,
      connections,
      osintData,
      riskData,
      riskAnalysis,
      osintAnalysis,
      ethPrice,
      analysis_timestamp: new Date().toISOString(),
      fromCache: false,
    }

    console.log("✅ Análisis OSINT completado exitosamente")

    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Error analizando wallet:", error)
    return NextResponse.json(
      {
        error: "Error al analizar la wallet",
        details: error instanceof Error ? error.message : "Error desconocido",
        address,
        network,
      },
      { status: 500 },
    )
  }
}
