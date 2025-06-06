"use client"

import { useState } from "react"

export default function ComparePage() {
  const [wallet1, setWallet1] = useState("")
  const [wallet2, setWallet2] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    if (!wallet1 || !wallet2) {
      alert("Por favor ingresa ambas direcciones de wallet")
      return
    }

    setLoading(true)
    // Simular análisis de comparación
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLoading(false)
    alert("Comparación completada. Esta función estará disponible próximamente con datos reales.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CriptoInvestigador</h1>
              <p className="text-xs text-purple-300">Comparar Wallets</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Comparar Wallets</h1>

        {/* Comparison Form */}
        <div className="bg-black/30 border border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-white text-xl font-bold mb-4 flex items-center">
            <div className="w-5 h-5 bg-purple-400 rounded mr-2"></div>
            Análisis Comparativo OSINT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Wallet 1</label>
              <input
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                value={wallet1}
                onChange={(e) => setWallet1(e.target.value)}
                className="w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Wallet 2</label>
              <input
                type="text"
                placeholder="0x8ba1f109551bD432803012645Hac136c22C57B"
                value={wallet2}
                onChange={(e) => setWallet2(e.target.value)}
                className="w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Analizando conexiones..." : "Comparar Wallets"}
          </button>
        </div>

        {/* Comparison Results Placeholder */}
        <div className="bg-black/30 border border-gray-700 rounded-lg p-12 text-center">
          <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-white/20 rounded"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Comparación de Wallets</h3>
          <p className="text-gray-400 mb-6">
            Esta función estará disponible próximamente. Podrás comparar wallets para encontrar conexiones, patrones
            comunes y posibles relaciones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="w-8 h-8 bg-blue-400 rounded mx-auto mb-2"></div>
              <h4 className="text-white font-medium mb-1">Conexiones</h4>
              <p className="text-xs text-gray-400">Wallets en común</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="w-8 h-8 bg-yellow-400 rounded mx-auto mb-2"></div>
              <h4 className="text-white font-medium mb-1">Patrones</h4>
              <p className="text-xs text-gray-400">Horarios similares</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="w-8 h-8 bg-red-400 rounded mx-auto mb-2"></div>
              <h4 className="text-white font-medium mb-1">Riesgo</h4>
              <p className="text-xs text-gray-400">Factores compartidos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
