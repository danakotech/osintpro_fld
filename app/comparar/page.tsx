export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <header className="border-b border-gray-800 bg-black/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
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

        <div className="bg-black/30 border border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-white text-xl font-bold mb-4">Análisis Comparativo OSINT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Wallet 1</label>
              <input
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                className="w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Wallet 2</label>
              <input
                type="text"
                placeholder="0x8ba1f109551bD432803012645Hac136c22C57B"
                className="w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>
          <button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">
            Comparar Wallets
          </button>
        </div>

        <div className="bg-black/30 border border-gray-700 rounded-lg p-12 text-center">
          <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-white mb-2">Comparación de Wallets</h3>
          <p className="text-gray-400">
            Esta función estará disponible próximamente. Podrás comparar wallets para encontrar conexiones, patrones
            comunes y posibles relaciones.
          </p>
        </div>
      </div>
    </div>
  )
}
