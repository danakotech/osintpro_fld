"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Activity, Shield, Clock, Search, Copy, AlertTriangle } from "lucide-react"

interface WalletAnalysisProps {
  address: string
  network: string
}

export function WalletAnalysis({ address, network }: WalletAnalysisProps) {
  const [walletData, setWalletData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/wallet/${address}?network=${network}`)
        const data = await response.json()
        setWalletData(data)
      } catch (error) {
        console.error('Error fetching wallet data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWalletData()
  }, [address, network])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl">Analizando wallet...</div>
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
                <CardTitle className="text-white text-xl">Análisis de Wallet</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {address.slice(0, 10)}...{address.slice(-8)}
                  </code>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {network.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {walletData?.balance || '0.00'} ETH
              </div>
              <div className="text-sm text-gray-400">
                ~${walletData?.balanceUSD || '0.00'} USD
              </div>
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
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="risk">Riesgo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                  Balance Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ${walletData?.totalValueUSD || '0.00'}
                </div>
                <p className="text-sm text-gray-400">Valor total en USD</p>
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
                  {walletData?.transactionCount || '0'}
                </div>
                <p className="text-sm text-gray-400">Total de transacciones</p>
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
                  {walletData?.firstActivity || 'N/A'}
                </div>
                <p className="text-sm text-gray-400">Fecha de creación</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de actividad */}
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Actividad en el Tiempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                [Gráfico de actividad temporal]
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Tokens ERC-20</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">T{i}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Token {i}</div>
                        <div className="text-sm text-gray-400">1,000.00 T{i}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">$1,000.00</div>
                      <div className="text-sm text-gray-400">~$1.00 por token</div>
                    </div>
                  </div>
                ))}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-2"></div>
                    <div className="text-white text-sm font-medium">NFT #{i}</div>
                    <div className="text-xs text-gray-400">Colección {i}</div>
                  </div>
                ))}
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
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div>
                        <div className="text-white text-sm">
                          {i % 2 === 0 ? 'Recibido' : 'Enviado'}
                        </div>
                        <div className="text-xs text-gray-400">Hace {i} horas</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">
                        {i % 2 === 0 ? '+' : '-'}0.{i}5 ETH
                      </div>
                      <div className="text-xs text-gray-400">
                        Hash: 0x{i}a2b...c3d4
                      </div>
                    </div>
                  </div>
                ))}
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
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Bases de Datos</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">GitHub</span>
                      <Badge variant="outline">No encontrado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ENS</span>
                      <Badge variant="outline">No registrado</Badge>
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
                Análisis de Riesgo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Puntuación de Riesgo</div>
                      <div className="text-sm text-gray-400">Basado en actividad y conexiones</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">BAJO (2/10)</Badge>
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
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Alertas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300\">Wallet nueva (< 30 días)</span>
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
