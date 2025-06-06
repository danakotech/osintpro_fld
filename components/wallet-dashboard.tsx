"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Activity, Shield, Clock, Search, Copy, ExternalLink, Coins } from "lucide-react"

interface WalletDashboardProps {
  address: string
  network: string
}

// Datos simulados para demostración
const mockWalletData = {
  balance: 15.5432,
  balanceUSD: 38858.0,
  totalValueUSD: 45230.5,
  transactionCount: 1247,
  firstActivity: "2021-03-15T10:30:00Z",
  lastActivity: "2024-01-15T15:30:00Z",
  riskScore: 2,
  tokens: [
    {
      tokenName: "Uniswap",
      tokenSymbol: "UNI",
      balance: 1250.5,
      balanceUSD: 6252.5,
    },
    {
      tokenName: "Chainlink",
      tokenSymbol: "LINK",
      balance: 850.25,
      balanceUSD: 12753.75,
    },
  ],
  transactions: [
    {
      type: "received",
      amount: 2.5,
      timestamp: "2024-01-15T13:30:00Z",
      hash: "0xabc123def456789012345678901234567890abcdef123456789012345678901234",
    },
    {
      type: "sent",
      amount: 0.8,
      timestamp: "2024-01-15T10:45:00Z",
      hash: "0xdef456abc789012345678901234567890abcdef456789012345678901234567",
    },
  ],
}

export function WalletDashboard({ address, network }: WalletDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // Simular carga de datos
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setWalletData(mockWalletData)
      setLoading(false)
    }
    loadData()
  }, [address])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-white text-xl">Ejecutando análisis OSINT...</div>
        <div className="text-gray-400">Conectando con blockchain y bases de datos</div>
        <div className="text-sm text-gray-500">Esto puede tomar hasta 30 segundos</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header de la wallet */}
      <Card className="bg-black/30 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-purple-400" />
              <div>
                <CardTitle className="text-white text-xl">Análisis OSINT Completo</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {address.slice(0, 10)}...{address.slice(-8)}
                  </code>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyToClipboard(address)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {network.toUpperCase()}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {walletData?.balance?.toFixed(4) || "0.0000"} {network === "ethereum" ? "ETH" : "MATIC"}
              </div>
              <div className="text-sm text-gray-400">{formatCurrency(walletData?.balanceUSD || 0)}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs principales */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-black/30">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="social">OSINT</TabsTrigger>
          <TabsTrigger value="risk">Riesgo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                  Valor Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(walletData?.totalValueUSD || 0)}</div>
                <p className="text-sm text-gray-400">Incluyendo tokens</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-400" />
                  Transacciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{walletData?.transactionCount || "0"}</div>
                <p className="text-sm text-gray-400">Total histórico</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-yellow-400" />
                  Primera Actividad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-white">
                  {walletData?.firstActivity ? formatDate(walletData.firstActivity) : "N/A"}
                </div>
                <p className="text-sm text-gray-400">Fecha de creación</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-400" />
                  Riesgo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{walletData?.riskScore || "0"}/10</div>
                <p className="text-sm text-gray-400">BAJO</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Tokens ERC-20</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletData?.tokens?.length > 0 ? (
                  walletData.tokens.map((token: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{token.tokenSymbol?.charAt(0) || "T"}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{token.tokenName || "Token desconocido"}</div>
                          <div className="text-sm text-gray-400">
                            {token.balance?.toFixed(4) || "0.0000"} {token.tokenSymbol || ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{formatCurrency(token.balanceUSD || 0)}</div>
                        <div className="text-sm text-gray-400">Valor USD</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Coins className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">No se encontraron tokens ERC-20</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nfts" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Colección de NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="h-12 w-12 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
                <p className="text-gray-400">Análisis de NFTs próximamente</p>
                <p className="text-sm text-gray-500">Integración con OpenSea en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Últimas Transacciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {walletData?.transactions?.length > 0 ? (
                  walletData.transactions.map((tx: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${tx.type === "received" ? "bg-green-400" : "bg-red-400"}`}
                        ></div>
                        <div>
                          <div className="text-white text-sm capitalize">
                            {tx.type === "received" ? "Recibido" : "Enviado"}
                          </div>
                          <div className="text-xs text-gray-400">{formatDate(tx.timestamp)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">
                          {tx.type === "received" ? "+" : "-"}
                          {tx.amount?.toFixed(4) || "0.0000"} {network === "ethereum" ? "ETH" : "MATIC"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-6)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">No se encontraron transacciones</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Análisis OSINT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Redes Sociales</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Twitter/X</span>
                      <Badge variant="outline">No encontrado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Reddit</span>
                      <Badge variant="outline">No encontrado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">GitHub</span>
                      <Badge variant="outline">No encontrado</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Bases de Datos</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ENS</span>
                      <Badge variant="outline">No registrado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">OpenSea</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Activo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Etherscan</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Verificado
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Análisis de Riesgo Completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Puntuación de Riesgo</div>
                      <div className="text-sm text-gray-400">Basado en análisis blockchain y OSINT</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">BAJO ({walletData?.riskScore || 0}/10)</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Indicadores de Seguridad</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Sin interacciones con mixers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Actividad consistente y normal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Contratos verificados: 998</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Patrones de Actividad</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Actividad nocturna: Normal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Frecuencia de transacciones: Regular</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Valores de transacción: Variados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
