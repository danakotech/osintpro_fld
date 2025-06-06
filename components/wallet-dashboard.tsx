"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Activity, Shield, Clock, Search, Copy, ExternalLink } from "lucide-react"

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
        <TabsList className="grid w-full grid-cols-4 bg-black/30">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
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

        <TabsContent value="transactions">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Transacciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-400">
                <Activity className="h-12 w-12 mx-auto mb-4" />
                <p>Historial de transacciones disponible próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Análisis OSINT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-400">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p>Análisis de redes sociales disponible próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Análisis de Riesgo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-400">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <p>Evaluación de riesgo disponible próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
