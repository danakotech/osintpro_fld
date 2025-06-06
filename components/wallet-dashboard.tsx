"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Activity, Shield, Clock, Copy, ExternalLink } from "lucide-react"
import { WalletTransactions } from "@/components/wallet-transactions"
import { WalletTokens } from "@/components/wallet-tokens"
import { WalletRisk } from "@/components/wallet-risk"
import { WalletOSINT } from "@/components/wallet-osint"

interface WalletDashboardProps {
  address: string
  network: string
}

export function WalletDashboard({ address, network }: WalletDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Intentar obtener datos de la API
        const response = await fetch(`/api/wallet/${address}?network=${network}`)

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        setWalletData(data)
      } catch (err) {
        console.error("Error fetching wallet data:", err)
        setError("Error al cargar los datos de la wallet. Por favor intenta nuevamente.")

        // Cargar datos de ejemplo para demostración
        setWalletData({
          address: address,
          network: network,
          balance: 15.5432,
          balance_usd: 38858.0,
          total_value_usd: 45230.5,
          transaction_count: 1247,
          first_activity: "2021-03-15T10:30:00Z",
          last_activity: "2024-01-15T15:30:00Z",
          risk_score: 2,
          transactions: [],
          tokens: [],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWalletData()
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
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-white text-xl">Ejecutando análisis OSINT...</div>
        <div className="text-gray-400">Conectando con blockchain y bases de datos</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <Shield className="h-16 w-16 text-red-400" />
        <div className="text-white text-xl">Error al analizar wallet</div>
        <div className="text-gray-400">{error}</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reintentar
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      window.open(
                        `https://${network === "ethereum" ? "" : network + "."}etherscan.io/address/${address}`,
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {walletData?.balance?.toFixed(4) || "0.0000"} {network === "ethereum" ? "ETH" : "MATIC"}
              </div>
              <div className="text-sm text-gray-400">{formatCurrency(walletData?.balance_usd || 0)}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs principales */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-black/30">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="osint">OSINT</TabsTrigger>
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
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(walletData?.total_value_usd || walletData?.balance_usd || 0)}
                </div>
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
                <div className="text-2xl font-bold text-white">{walletData?.transaction_count || "0"}</div>
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
                <div className="text-2xl font-bold text-green-400">{walletData?.risk_score || "0"}/10</div>
                <p className="text-sm text-gray-400">
                  {walletData?.risk_score <= 2 ? "BAJO" : walletData?.risk_score <= 5 ? "MEDIO" : "ALTO"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Resumen de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Últimas Transacciones</h3>
                  <div className="space-y-3">
                    {walletData?.transactions?.slice(0, 3).map((tx: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${tx.transaction_type === "received" ? "bg-green-400" : "bg-red-400"}`}
                          ></div>
                          <div>
                            <div className="text-white text-sm capitalize">
                              {tx.transaction_type === "received" ? "Recibido" : "Enviado"}
                            </div>
                            <div className="text-xs text-gray-400">{formatDate(tx.timestamp)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm">
                            {tx.transaction_type === "received" ? "+" : "-"}
                            {tx.value?.toFixed(4) || "0.0000"} {network === "ethereum" ? "ETH" : "MATIC"}
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!walletData?.transactions || walletData.transactions.length === 0) && (
                      <div className="text-center py-4 text-gray-400">No se encontraron transacciones recientes</div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Tokens Principales</h3>
                  <div className="space-y-3">
                    {walletData?.tokens?.slice(0, 3).map((token: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{token.token_symbol?.charAt(0) || "T"}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{token.token_name || "Token"}</div>
                            <div className="text-sm text-gray-400">
                              {token.balance?.toFixed(4) || "0.0000"} {token.token_symbol || ""}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{formatCurrency(token.balance_usd || 0)}</div>
                        </div>
                      </div>
                    ))}
                    {(!walletData?.tokens || walletData.tokens.length === 0) && (
                      <div className="text-center py-4 text-gray-400">No se encontraron tokens</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <WalletTokens tokens={walletData?.tokens || []} />
        </TabsContent>

        <TabsContent value="transactions">
          <WalletTransactions transactions={walletData?.transactions || []} network={network} />
        </TabsContent>

        <TabsContent value="osint">
          <WalletOSINT address={address} osintData={walletData?.osint_data || {}} />
        </TabsContent>

        <TabsContent value="risk">
          <WalletRisk
            riskScore={walletData?.risk_score || 0}
            riskFactors={walletData?.riskAnalysis?.riskFactors || []}
            securityFlags={walletData?.security_flags || {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
