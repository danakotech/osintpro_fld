interface Props {
  params: { address: string }
}

export default function WalletPage({ params }: Props) {
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
              <p className="text-xs text-purple-300">Análisis de Wallet</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Wallet Header */}
        <div className="bg-black/30 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold mb-2">Análisis OSINT Completo</h2>
              <div className="flex items-center space-x-2">
                <code className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  {params.address.slice(0, 10)}...{params.address.slice(-8)}
                </code>
                <button className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </button>
                <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded border border-purple-400">
                  ETHEREUM
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">15.5432 ETH</div>
              <div className="text-sm text-gray-400">~$38,858.00 USD</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tokens */}
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

          {/* OSINT Analysis */}
          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-medium mb-4">Análisis OSINT</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Redes Sociales</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Twitter/X</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">No encontrado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reddit</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">No encontrado</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Bases de Datos</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ENS</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">No registrado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">OpenSea</span>
                    <span className="text-xs bg-green-700 px-2 py-1 rounded">Activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-6 bg-black/30 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white font-medium mb-4">Últimas Transacciones</h3>
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-green-400" : "bg-red-400"}`}></div>
                  <div>
                    <div className="text-white text-sm">{i % 2 === 0 ? "Recibido" : "Enviado"}</div>
                    <div className="text-xs text-gray-400">Hace {i + 1} horas</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">
                    {i % 2 === 0 ? "+" : "-"}0.{i + 1}5 ETH
                  </div>
                  <div className="text-xs text-gray-400">Hash: 0x{i}a2b...c3d4</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
