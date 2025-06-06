"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitCompare, Users, Clock, AlertCircle, Loader2, BarChart3, Network } from "lucide-react"

export function WalletComparison() {
  const [wallet1, setWallet1] = useState("")
  const [wallet2, setWallet2] = useState("")
  const [comparison, setComparison] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateAddress = (addr: string) => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/
    const ensRegex = /^[a-zA-Z0-9-]+\.eth$/
    return ethRegex.test(addr) || ensRegex.test(addr)
  }

  const handleCompare = async () => {
    setError("")

    if (!wallet1 || !wallet2) {
      setError("Por favor ingresa ambas direcciones de wallet")
      return
    }

    if (!validateAddress(wallet1) || !validateAddress(wallet2)) {
      setError("Formato de dirección inválido")
      return
    }

    if (wallet1.toLowerCase() === wallet2.toLowerCase()) {
      setError("No puedes comparar la misma wallet")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet1,
          wallet2,
          network: "ethereum",
        }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setComparison(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al comparar wallets")
    } finally {
      setLoading(false)
    }
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 70) return "text-red-400"
    if (score >= 40) return "text-yellow-400"
    return "text-green-400"
  }

  const getSimilarityLevel = (score: number) => {
    if (score >= 70) return "ALTA"
    if (score >= 40) return "MEDIA"
    return "BAJA"
  }

  return (
    <div className="space-y-6">
      {/* Formulario de comparación */}
      <Card className="bg-black/30 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <GitCompare className="mr-2 h-5 w-5" />
            Análisis Comparativo OSINT
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

          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <Button
            onClick={handleCompare}
            disabled={!wallet1 || !wallet2 || loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando conexiones...
              </>
            ) : (
              "Comparar Wallets"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Resultados de comparación */}
      {comparison && (
        <div className="space-y-6">
          {/* Resumen de similitud */}
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Resumen de Similitud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSimilarityColor(comparison.similarity.overall)}`}>
                    {comparison.similarity.overall}%
                  </div>
                  <div className="text-sm text-gray-400">Similitud General</div>
                  <Badge
                    className={`mt-1 ${
                      comparison.similarity.overall >= 70
                        ? "bg-red-600"
                        : comparison.similarity.overall >= 40
                          ? "bg-yellow-600"
                          : "bg-green-600"
                    }`}
                  >
                    {getSimilarityLevel(comparison.similarity.overall)}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{comparison.commonWallets.length}</div>
                  <div className="text-sm text-gray-400">Wallets Comunes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{comparison.timePatterns.similarity}%</div>
                  <div className="text-sm text-gray-400">Patrones Temporales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{comparison.contractInteractions.total}</div>
                  <div className="text-sm text-gray-400">Contratos Comunes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="connections" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/30">
              <TabsTrigger value="connections">Conexiones</TabsTrigger>
              <TabsTrigger value="patterns">Patrones</TabsTrigger>
              <TabsTrigger value="contracts">Contratos</TabsTrigger>
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
                  {comparison.commonWallets.length > 0 ? (
                    <div className="space-y-3">
                      {comparison.commonWallets.slice(0, 10).map((wallet: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <code className="text-purple-400">
                              {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                            </code>
                            <div className="text-sm text-gray-400 mt-1">
                              Última interacción: {wallet.lastInteraction}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              {wallet.interactions} interacciones
                            </Badge>
                            <div className="text-sm text-gray-400 mt-1">{wallet.totalValue} ETH</div>
                          </div>
                        </div>
                      ))}
                      {comparison.commonWallets.length > 10 && (
                        <div className="text-center text-gray-400 text-sm">
                          Y {comparison.commonWallets.length - 10} wallets más...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Network className="h-12 w-12 mx-auto mb-4" />
                      <p>No se encontraron wallets en común</p>
                    </div>
                  )}
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
                      <div className={`text-2xl font-bold ${getSimilarityColor(comparison.timePatterns.similarity)}`}>
                        {comparison.timePatterns.similarity}%
                      </div>
                      <div className="text-sm text-gray-400">
                        Correlación: {comparison.timePatterns.correlationScore.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-3">Picos de Actividad</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Wallet 1:</span>
                          <span className="text-white">{comparison.timePatterns.peakActivity.wallet1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Wallet 2:</span>
                          <span className="text-white">{comparison.timePatterns.peakActivity.wallet2}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Solapamiento:</span>
                          <span className="text-purple-400">{comparison.timePatterns.activityOverlap}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              <Card className="bg-black/30 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Network className="mr-2 h-5 w-5" />
                    Contratos Compartidos ({comparison.contractInteractions.total})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {comparison.contractInteractions.common.length > 0 ? (
                    <div className="space-y-3">
                      {comparison.contractInteractions.common.map((contract: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{contract.name}</div>
                            <code className="text-sm text-gray-400">
                              {contract.address.slice(0, 10)}...{contract.address.slice(-8)}
                            </code>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              {contract.type}
                            </Badge>
                            <div className="text-sm text-gray-400 mt-1">{contract.interactions} interacciones</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Network className="h-12 w-12 mx-auto mb-4" />
                      <p>No se encontraron contratos compartidos</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {comparison.transactionPatterns && (
                <Card className="bg-black/30 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Patrones de Transacciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {comparison.transactionPatterns.valueSimilarity}%
                        </div>
                        <div className="text-sm text-gray-400">Similitud de Valores</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {comparison.transactionPatterns.avgValue1} ETH
                        </div>
                        <div className="text-sm text-gray-400">Promedio Wallet 1</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {comparison.transactionPatterns.avgValue2} ETH
                        </div>
                        <div className="text-sm text-gray-400">Promedio Wallet 2</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
                  <div
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      comparison.riskFactors.riskLevel === "ALTO"
                        ? "bg-red-900/20 border-red-700"
                        : comparison.riskFactors.riskLevel === "MEDIO"
                          ? "bg-yellow-900/20 border-yellow-700"
                          : "bg-green-900/20 border-green-700"
                    }`}
                  >
                    <div>
                      <div className="text-white font-medium">Nivel de Riesgo Compartido</div>
                      <div className="text-sm text-gray-400">Basado en actividades comunes</div>
                    </div>
                    <Badge
                      className={`${
                        comparison.riskFactors.riskLevel === "ALTO"
                          ? "bg-red-600"
                          : comparison.riskFactors.riskLevel === "MEDIO"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                      }`}
                    >
                      {comparison.riskFactors.riskLevel}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-3">Factores de Riesgo Compartidos</h4>
                      <div className="space-y-2">
                        {comparison.riskFactors.sharedRisks.length > 0 ? (
                          comparison.riskFactors.sharedRisks.map((risk: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <AlertCircle className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-gray-300">{risk}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-gray-300">No se detectaron riesgos compartidos</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-3">Análisis de Conexión</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fuerza de Conexión:</span>
                          <Badge
                            variant="outline"
                            className={`${
                              comparison.riskFactors.connectionStrength === "FUERTE"
                                ? "text-red-400 border-red-400"
                                : comparison.riskFactors.connectionStrength === "MODERADA"
                                  ? "text-yellow-400 border-yellow-400"
                                  : "text-green-400 border-green-400"
                            }`}
                          >
                            {comparison.riskFactors.connectionStrength}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Posible Conexión:</span>
                          <span className="text-white">{comparison.insights.possibleConnection}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Nivel de Confianza:</span>
                          <span className="text-purple-400">
                            {(comparison.insights.confidenceLevel * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {comparison.riskFactors.suspiciousPatterns.length > 0 && (
                    <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Patrones Sospechosos Detectados</h4>
                      <div className="space-y-1">
                        {comparison.riskFactors.suspiciousPatterns.map((pattern: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-gray-300">{pattern}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Resumen del Análisis</h4>
                    <p className="text-sm text-gray-300">{comparison.insights.summary}</p>
                    <div className="mt-3">
                      <h5 className="text-white font-medium mb-2">Acciones Recomendadas:</h5>
                      <ul className="space-y-1">
                        {comparison.insights.recommendedActions.map((action: string, index: number) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
