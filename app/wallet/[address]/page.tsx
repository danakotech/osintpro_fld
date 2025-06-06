interface Props {
  params: { address: string }
}

export default function WalletPage({ params }: Props) {
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
              <p className="text-xs text-purple-300">Análisis de Wallet</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/30 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">Análisis OSINT Completo</h2>
              <code className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded mt-2 inline-block">
                {params.address.slice(0, 10)}...{params.address.slice(-8)}
              </code>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">15.5432 ETH</div>
              <div className="text-sm text-gray-400">~$38,858.00 USD</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 bg-green-400 rounded mr-2"></div>
              <h3 className="text-white font-medium">Valor Total</h3>
            </div>
            <div className="text-2xl font-bold text-white">$45,230.50</div>
            <p className="text-sm text-gray-400">Incluyendo tokens</p>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 bg-blue-400 rounded mr-2"></div>
              <h3 className="text-white font-medium">Transacciones</h3>
            </div>
            <div className="text-2xl font-bold text-white">1,247</div>
            <p className="text-sm text-gray-400">Total histórico</p>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 bg-yellow-400 rounded mr-2"></div>
              <h3 className="text-white font-medium">Primera Actividad</h3>
            </div>
            <div className="text-lg font-bold text-white">Mar 2021</div>
            <p className="text-sm text-gray-400">Fecha de creación</p>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 bg-green-400 rounded mr-2"></div>
              <h3 className="text-white font-medium">Riesgo</h3>
            </div>
            <div className="text-2xl font-bold text-green-400">2/10</div>
            <p className="text-sm text-gray-400">BAJO</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-medium mb-4">Tokens ERC-20</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Uniswap</div>
                    <div className="text-sm text-gray-400">1,250.50 UNI</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$6,252.50</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">L</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Chainlink</div>
                    <div className="text-sm text-gray-400">850.25 LINK</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$12,753.75</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-medium mb-4">Análisis OSINT</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Redes Sociales</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Twitter/X</span>
                    <span className="text-sm bg-gray-700 px-2 py-1 rounded">No encontrado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reddit</span>
                    <span className="text-sm bg-gray-700 px-2 py-1 rounded">No encontrado</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Bases de Datos</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ENS</span>
                    <span className="text-sm bg-gray-700 px-2 py-1 rounded">No registrado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">OpenSea</span>
                    <span className="text-sm bg-green-700 px-2 py-1 rounded">Activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
