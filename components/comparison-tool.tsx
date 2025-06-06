"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GitCompare, Loader2 } from "lucide-react"

export function ComparisonTool() {
  const [wallet1, setWallet1] = useState("")
  const [wallet2, setWallet2] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    if (!wallet1 || !wallet2) return

    setLoading(true)
    // Simular análisis de comparación
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLoading(false)
    alert("Comparación completada. Esta función estará disponible próximamente.")
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

      <Card className="bg-black/30 border-gray-700">
        <CardContent className="p-12 text-center">
          <GitCompare className="h-12 w-12 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-bold text-white mb-2">Comparación de Wallets</h3>
          <p className="text-gray-400">
            Esta función estará disponible próximamente. Podrás comparar wallets para encontrar conexiones, patrones
            comunes y posibles relaciones.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
