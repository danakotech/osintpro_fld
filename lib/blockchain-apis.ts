// Claves API para Etherscan y Polygonscan
const ETHERSCAN_API_KEY = "BMNRGSSGX4TK28KMG1RQSSE4E1AN8KAA82"
const POLYGONSCAN_API_KEY = "2H2XVRFJDJA5MYDKDT716TWJMD6U6UI2DU"

// Configuración para diferentes blockchains
interface BlockchainConfig {
  baseUrl: string
  apiKey: string
  nativeCurrency: string
}

const BLOCKCHAIN_CONFIGS: Record<string, BlockchainConfig> = {
  ethereum: {
    baseUrl: "https://api.etherscan.io/api",
    apiKey: ETHERSCAN_API_KEY,
    nativeCurrency: "ETH",
  },
  polygon: {
    baseUrl: "https://api.polygonscan.com/api",
    apiKey: POLYGONSCAN_API_KEY,
    nativeCurrency: "MATIC",
  },
}

// Función para obtener el balance de una wallet
export async function getWalletBalance(address: string, network = "ethereum"): Promise<number> {
  try {
    const config = BLOCKCHAIN_CONFIGS[network]
    if (!config) {
      console.error(`Red no soportada: ${network}`)
      return 0
    }

    const response = await fetch(
      `${config.baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${config.apiKey}`,
    )
    const data = await response.json()

    if (data.status === "1") {
      // Convertir de wei a ETH/MATIC
      const balanceInWei = BigInt(data.result)
      const balance = Number(balanceInWei) / 1e18
      return balance
    }
    return 0
  } catch (error) {
    console.error("Error obteniendo balance:", error)
    return 0
  }
}

// Función para obtener las transacciones de una wallet
export async function getWalletTransactions(address: string, network = "ethereum", page = 1, limit = 100) {
  try {
    const config = BLOCKCHAIN_CONFIGS[network]
    if (!config) {
      console.error(`Red no soportada: ${network}`)
      return []
    }

    const response = await fetch(
      `${config.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${limit}&sort=desc&apikey=${config.apiKey}`,
    )
    const data = await response.json()

    if (data.status === "1") {
      return data.result.map((tx: any) => ({
        tx_hash: tx.hash,
        block_number: Number.parseInt(tx.blockNumber),
        from_address: tx.from.toLowerCase(),
        to_address: tx.to ? tx.to.toLowerCase() : null,
        value: Number(BigInt(tx.value) / BigInt(1e14)) / 10000,
        gas_used: Number.parseInt(tx.gasUsed),
        gas_price: tx.gasPrice,
        transaction_fee: (Number.parseInt(tx.gasUsed) * Number.parseInt(tx.gasPrice)) / 1e18,
        timestamp: new Date(Number.parseInt(tx.timeStamp) * 1000).toISOString(),
        transaction_type: tx.to && tx.to.toLowerCase() === address.toLowerCase() ? "received" : "sent",
        method_id: tx.methodId || "0x",
      }))
    }
    return []
  } catch (error) {
    console.error("Error obteniendo transacciones:", error)
    return []
  }
}

// Función para obtener los tokens ERC-20 de una wallet
export async function getWalletTokens(address: string, network = "ethereum") {
  try {
    const config = BLOCKCHAIN_CONFIGS[network]
    if (!config) {
      console.error(`Red no soportada: ${network}`)
      return []
    }

    const response = await fetch(
      `${config.baseUrl}?module=account&action=tokenlist&address=${address}&apikey=${config.apiKey}`,
    )
    const data = await response.json()

    if (data.status === "1") {
      return data.result.map((token: any) => ({
        token_address: token.contractAddress.toLowerCase(),
        token_name: token.name,
        token_symbol: token.symbol,
        token_decimals: Number.parseInt(token.decimals),
        balance: Number(token.balance) / Math.pow(10, Number.parseInt(token.decimals)),
        balance_usd: 0, // Se actualizará con precios reales
      }))
    }
    return []
  } catch (error) {
    console.error("Error obteniendo tokens:", error)
    return []
  }
}

// Función para obtener el precio de ETH
export async function getETHPrice(): Promise<number> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
    const data = await response.json()
    return data.ethereum?.usd || 2500 // Valor por defecto si falla
  } catch (error) {
    console.error("Error obteniendo precio de ETH:", error)
    return 2500 // Valor por defecto
  }
}

// Función para obtener el precio de MATIC
export async function getMATICPrice(): Promise<number> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd")
    const data = await response.json()
    return data["matic-network"]?.usd || 0.5 // Valor por defecto si falla
  } catch (error) {
    console.error("Error obteniendo precio de MATIC:", error)
    return 0.5 // Valor por defecto
  }
}

// Función para analizar el riesgo de una wallet
export function analyzeWalletRisk(transactions: any[]) {
  let riskScore = 0
  const riskFactors = []

  // Análisis de patrones sospechosos
  if (transactions.length > 1000) {
    riskScore += 1
    riskFactors.push("Alto volumen de transacciones")
  }

  // Análisis de horarios (actividad nocturna)
  const nightTransactions = transactions.filter((tx) => {
    const hour = new Date(tx.timestamp).getHours()
    return hour >= 2 && hour <= 6
  })

  if (nightTransactions.length > transactions.length * 0.3) {
    riskScore += 2
    riskFactors.push("Actividad nocturna sospechosa")
  }

  // Análisis de valores (transacciones redondas)
  const roundTransactions = transactions.filter((tx) => tx.value % 1 === 0 && tx.value > 0)

  if (roundTransactions.length > transactions.length * 0.5) {
    riskScore += 1
    riskFactors.push("Muchas transacciones con valores redondos")
  }

  return {
    riskScore: Math.min(riskScore, 10),
    riskFactors,
    riskLevel: riskScore <= 2 ? "BAJO" : riskScore <= 5 ? "MEDIO" : "ALTO",
  }
}
