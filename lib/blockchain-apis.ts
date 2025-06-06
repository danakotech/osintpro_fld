const ETHERSCAN_API_KEY = "BMNRGSSGX4TK28KMG1RQSSE4E1AN8KAA82"
const POLYGONSCAN_API_KEY = "2H2XVRFJDJA5MYDKDT716TWJMD6U6UI2DU"

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

export async function getWalletBalance(address: string, network = "ethereum") {
  const config = BLOCKCHAIN_CONFIGS[network]
  if (!config) throw new Error(`Red no soportada: ${network}`)

  try {
    const response = await fetch(
      `${config.baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${config.apiKey}`,
    )
    const data = await response.json()

    if (data.status === "1") {
      const balanceWei = BigInt(data.result)
      const balanceEth = Number(balanceWei) / Math.pow(10, 18)
      return balanceEth
    }
    return 0
  } catch (error) {
    console.error("Error obteniendo balance:", error)
    return 0
  }
}

export async function getWalletTransactions(address: string, network = "ethereum", page = 1) {
  const config = BLOCKCHAIN_CONFIGS[network]
  if (!config) throw new Error(`Red no soportada: ${network}`)

  try {
    const response = await fetch(
      `${config.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=100&sort=desc&apikey=${config.apiKey}`,
    )
    const data = await response.json()

    if (data.status === "1") {
      return data.result.map((tx: any) => ({
        tx_hash: tx.hash,
        block_number: Number.parseInt(tx.blockNumber),
        from_address: tx.from,
        to_address: tx.to,
        value: Number(tx.value) / Math.pow(10, 18),
        gas_used: Number.parseInt(tx.gasUsed),
        gas_price: Number.parseInt(tx.gasPrice),
        transaction_fee: (Number.parseInt(tx.gasUsed) * Number.parseInt(tx.gasPrice)) / Math.pow(10, 18),
        timestamp: new Date(Number.parseInt(tx.timeStamp) * 1000).toISOString(),
        transaction_type: tx.to === address ? "received" : "sent",
        method_id: tx.methodId || "0x",
      }))
    }
    return []
  } catch (error) {
    console.error("Error obteniendo transacciones:", error)
    return []
  }
}

export async function getETHPrice() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
    const data = await response.json()
    return data.ethereum?.usd || 0
  } catch (error) {
    console.error("Error obteniendo precio de ETH:", error)
    return 2500 // Precio por defecto
  }
}

export async function analyzeWalletRisk(address: string, transactions: any[]) {
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
