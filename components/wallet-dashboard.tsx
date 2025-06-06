"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  TrendingUp,
  Activity,
  Shield,
  Clock,
  Search,
  Copy,
  ExternalLink,
  AlertTriangle,
  Users,
  Zap,
  BarChart3,
} from "lucide-react"

interface WalletDashboardProps {
  address: string
  network: string
}

export function WalletDashboard({ address, network }: WalletDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError("")

      try {
        console.log(`🔍 Cargando datos para ${address}...`)
        const response = await fetch(`/api/wallet/${address}?network=${network}`)

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setWalletData(data)
        console.log("✅ Datos cargados exitosamente")
      } catch (err) {
        console.error("❌ Error cargando datos:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [address, network])

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
    })
  }

  const getRiskColor = (score: number) => {
    if (score <= 2) return "text-green-400"
    if (score <= 5) return "text-yellow-400"
    return "text-red-400"
  }

  const getRiskLevel = (score: number) => {
    if (score <= 2) return "BAJO"
    if (score <= 5) return "MEDIO"
    return "ALTO"
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-white text-xl">Ejecutando análisis OSINT...</div>
        <div className="text-gray-400">Conectando con blockchain y bases de datos</div>
        <div className="text-sm text-gray-500">Esto puede tomar unos segundos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>
        <div className="text-white text-xl">Error en el análisis</div>
        <div className="text-gray-400 text-center max-w-md">{error}</div>
        <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
          Reintentar Análisis
        </Button>
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
                  {walletData?.fromCache && (
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      CACHE
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {walletData?.balance?.toFixed(4) || "0.0000"} {network === "ethereum" ? "ETH" : "MATIC"}
              </div>
              <div className="text-sm text-gray-400">{formatCurrency(walletData?.balance_usd || 0)}</div>
              {walletData?.ethPrice && (
                <div className="text-xs text-gray-500">1 ETH = ${walletData.ethPrice.toLocaleString()}</div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs principales */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-black/30">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="social">OSINT</TabsTrigger>
          <TabsTrigger value="risk">Riesgo</TabsTrigger>
          <TabsTrigger value="network">Red</TabsTrigger>
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
                <div className="text-2xl font-bold text-white">{formatCurrency(walletData?.total_value_usd || 0)}</div>
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
                <div className="text-2xl font-bold text-white">
                  {walletData?.transaction_count?.toLocaleString() || "0"}
                </div>
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
                  {walletData?.first_activity ? formatDate(walletData.first_activity) : "N/A"}
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
                <div className={`text-2xl font-bold ${getRiskColor(walletData?.risk_score || 0)}`}>
                  {walletData?.risk_score || "0"}/10
                </div>
                <p className="text-sm text-gray-400">{getRiskLevel(walletData?.risk_score || 0)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Security Flags */}
          {walletData?.security_flags && (
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Indicadores de Seguridad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {walletData.security_flags.verified_contracts}
                    </div>
                    <div className="text-sm text-gray-400">Contratos Verificados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {walletData.security_flags.mixer_interactions}
                    </div>
                    <div className="text-sm text-gray-400">Interacciones Mixer</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {walletData.security_flags.high_gas_transactions}
                    </div>
                    <div className="text-sm text-gray-400">Transacciones Gas Alto</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{walletData.security_flags.phishing_flags}</div>
                    <div className="text-sm text-gray-400">Flags de Phishing</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Tokens ERC-20</CardTitle>
            </CardHeader>
            <CardContent>
              {walletData?.tokens && walletData.tokens.length > 0 ? (
                <div className="space-y-4">
                  {walletData.tokens.map((token: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{token.token_symbol?.charAt(0) || "T"}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{token.token_name || "Token Desconocido"}</div>
                          <div className="text-sm text-gray-400">
                            {token.balance?.toFixed(2) || "0.00"} {token.token_symbol || ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{formatCurrency(token.balance_usd || 0)}</div>
                        <div className="text-sm text-gray-400">{token.token_address?.slice(0, 8)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Zap className="h-12 w-12 mx-auto mb-4" />
                  <p>No se encontraron tokens ERC-20</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Últimas Transacciones</CardTitle>
            </CardHeader>
            <CardContent>
              {walletData?.transactions && walletData.transactions.length > 0 ? (
                <div className="space-y-3">
                  {walletData.transactions.slice(0, 20).map((tx: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${tx.transaction_type === "received" ? "bg-green-400" : "bg-red-400"}`}
                        ></div>
                        <div>
                          <div className="text-white text-sm">
                            {tx.transaction_type === "received" ? "Recibido" : "Enviado"}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(tx.timestamp).toLocaleDateString("es-ES")}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">
                          {tx.transaction_type === "received" ? "+" : "-"}
                          {tx.value?.toFixed(6) || "0.000000"} ETH
                        </div>
                        <div className="text-xs text-gray-400">{tx.tx_hash?.slice(0, 10)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Activity className="h-12 w-12 mx-auto mb-4" />
                  <p>No se encontraron transacciones</p>
                </div>
              )}
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
                      <Badge variant="outline">
                        {walletData?.osintAnalysis?.socialMedia?.twitter || "No encontrado"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Reddit</span>
                      <Badge variant="outline">
                        {walletData?.osintAnalysis?.socialMedia?.reddit || "No encontrado"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">GitHub</span>
                      <Badge variant="outline">
                        {walletData?.osintAnalysis?.socialMedia?.github || "No encontrado"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Bases de Datos</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ENS</span>
                      <Badge variant="outline">{walletData?.osintAnalysis?.databases?.ens || "No registrado"}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">OpenSea</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {walletData?.osintAnalysis?.databases?.opensea || "Activo"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Etherscan</span>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {walletData?.osintAnalysis?.databases?.etherscan || "Verificado"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {walletData?.riskAnalysis?.riskFactors && walletData.riskAnalysis.riskFactors.length > 0 && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Factores de Riesgo Detectados</h4>
                  <div className="space-y-1">
                    {walletData.riskAnalysis.riskFactors.map((factor: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Análisis de Riesgo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    walletData?.risk_score <= 2
                      ? "bg-green-900/20 border-green-700"
                      : walletData?.risk_score <= 5
                        ? "bg-yellow-900/20 border-yellow-700"
                        : "bg-red-900/20 border-red-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className={`h-5 w-5 ${getRiskColor(walletData?.risk_score || 0)}`} />
                    <div>
                      <div className="text-white font-medium">Puntuación de Riesgo</div>
                      <div className="text-sm text-gray-400">Basado en actividad y conexiones</div>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      walletData?.risk_score <= 2
                        ? "bg-green-600"
                        : walletData?.risk_score <= 5
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    }`}
                  >
                    {getRiskLevel(walletData?.risk_score || 0)} ({walletData?.risk_score || 0}/10)
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Indicadores Positivos</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Sin interacciones con mixers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Actividad consistente</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">Contratos verificados</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Alertas</h4>
                    <div className="space-y-2">
                      {walletData?.riskAnalysis?.riskFactors?.length > 0 ? (
                        walletData.riskAnalysis.riskFactors.map((factor: string, i: number) => (
                          <div key={i} className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-300">{factor}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">No se detectaron alertas</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Análisis de Red
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-400">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Mapeo de Conexiones</h3>
                <p>Análisis de red y conexiones disponible próximamente</p>
                <p className="text-sm mt-2">Se analizarán las relaciones entre wallets y patrones de interacción</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
