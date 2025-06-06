"use client"

import { WalletComparison } from "@/components/wallet-comparison"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CriptoInvestigador</h1>
                <p className="text-xs text-purple-300">Comparar Wallets</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Inicio
              </a>
              <a href="/comparar" className="text-purple-400 font-medium">
                Comparar
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Comparación de Wallets</h1>
          <p className="text-gray-400">
            Analiza las conexiones, patrones y similitudes entre dos direcciones de wallet
          </p>
        </div>

        <WalletComparison />
      </div>
    </div>
  )
}
