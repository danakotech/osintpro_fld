"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitCompare, Users, Clock, AlertCircle } from "lucide-react"

export function WalletComparison() {
  const [wallet1, setWallet1] = useState("")
  const [wallet2, setWallet2] = useState("")
  const [comparison, setComparison] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    if (!wallet1 || !wallet2) return

    setLoading(true)
    // Simular análisis de comparación
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setComparison({
      commonWallets: [
        { address: "0x1234...5678", interactions: 15, lastInteraction: "2024-01-15" },
        { address: "0xabcd...efgh", interactions: 8, lastInteraction: "2024-01-10" },
        { address: "0x9876...5432", interactions: 3, lastInteraction: "2024-01-05" },
      ],
      timePatterns: {
        commonHours: ["14:00-16:00", "20:00-22:00"],
        similarity: 78,
      },
      riskFactors: {
        sharedRisks: ["Interacción con DEX no verificado"],
        riskLevel: "MEDIO",
      },
    })
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Formulario de comparación */}
      <Card className="bg-black/30 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <GitCompare className="mr-2 h-5 w-5" />
            Comparar Wallets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Wallet 1</label>
              <Input
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                value={wallet1}
                onChange={(e) => setWallet1(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Wallet 2</label>
              <Input
                placeholder="0x8ba1f109551bD432803012645Hac136c22C57B"
                value={wallet2}
                onChange={(e) => setWallet2(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          <Button
            onClick={handleCompare}
            disabled={!wallet1 || !wallet2 || loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Comparando..." : "Comparar Wallets"}
          </Button>
        </CardContent>
      </Card>

      {/* Resultados de comparación */}
      {comparison && (
        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black/30">
            <TabsTrigger value="connections">Conexiones</TabsTrigger>
            <TabsTrigger value="patterns">Patrones</TabsTrigger>
            <TabsTrigger value="risk">Riesgo</TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Wallets en Común ({comparison.commonWallets.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comparison.commonWallets.map((wallet: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <code className="text-purple-400">{wallet.address}</code>
                        <div className="text-sm text-gray-400 mt-1">Última interacción: {wallet.lastInteraction}</div>
                      </div>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {wallet.interactions} interacciones
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Patrones Temporales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Similitud de Horarios</div>
                    <div className="text-sm text-gray-400">Basado en actividad histórica</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{comparison.timePatterns.similarity}%</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3">Horarios Comunes de Actividad</h4>
                  <div className="flex flex-wrap gap-2">
                    {comparison.timePatterns.commonHours.map((hour: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400">
                        {hour}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Análisis de Riesgo Compartido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Nivel de Riesgo Compartido</div>
                    <div className="text-sm text-gray-400">Basado en actividades comunes</div>
                  </div>
                  <Badge className="bg-yellow-600">{comparison.riskFactors.riskLevel}</Badge>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3">Factores de Riesgo Compartidos</h4>
                  <div className="space-y-2">
                    {comparison.riskFactors.sharedRisks.map((risk: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
