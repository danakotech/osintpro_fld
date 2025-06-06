export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <header className="border-b border-gray-800 bg-black/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CriptoInvestigador</h1>
                <p className="text-xs text-purple-300">Plataforma OSINT Profesional</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Investigación
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Blockchain Profesional
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Plataforma de inteligencia OSINT para análisis profundo de wallets de criptomonedas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-black/40 border border-gray-700 rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Iniciar Investigación OSINT</h2>
              <p className="text-gray-400">Ingresa la dirección de wallet para comenzar el análisis</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
              <button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg">
                Analizar Wallet
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="w-8 h-8 bg-green-400 rounded mb-4"></div>
            <h3 className="text-white text-lg font-semibold mb-2">Balance y Activos</h3>
            <p className="text-gray-400 text-sm">Análisis completo de ETH, tokens ERC-20 y NFTs</p>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="w-8 h-8 bg-blue-400 rounded mb-4"></div>
            <h3 className="text-white text-lg font-semibold mb-2">Historial Completo</h3>
            <p className="text-gray-400 text-sm">Últimas 1000+ transacciones con análisis detallado</p>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="w-8 h-8 bg-red-400 rounded mb-4"></div>
            <h3 className="text-white text-lg font-semibold mb-2">Evaluación de Riesgo</h3>
            <p className="text-gray-400 text-sm">Detección de contratos maliciosos y phishing</p>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-6">
            <div className="w-8 h-8 bg-purple-400 rounded mb-4"></div>
            <h3 className="text-white text-lg font-semibold mb-2">OSINT Avanzado</h3>
            <p className="text-gray-400 text-sm">Búsqueda en redes sociales y bases de datos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">50M+</div>
            <div className="text-lg font-semibold text-purple-300 mb-1">Wallets Analizadas</div>
            <div className="text-sm text-gray-400">Base de datos completa</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-lg font-semibold text-purple-300 mb-1">Precisión</div>
            <div className="text-sm text-gray-400">En detección de riesgos</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-lg font-semibold text-purple-300 mb-1">Monitoreo</div>
            <div className="text-sm text-gray-400">Vigilancia continua</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">&lt;2s</div>
            <div className="text-lg font-semibold text-purple-300 mb-1">Tiempo Respuesta</div>
            <div className="text-sm text-gray-400">Análisis instantáneo</div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 bg-black/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CI</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">CriptoInvestigador</h3>
                <p className="text-purple-300 text-sm">Plataforma OSINT Profesional</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              La plataforma más avanzada para investigación blockchain e inteligencia OSINT.
            </p>
            <div className="text-xs text-gray-500">
              <p>
                © 2024 <span className="text-purple-400 font-semibold">criptocurrencia.com</span> - Todos los derechos
                reservados
              </p>
              <p>Autor: criptocurrencia.com | Plataforma de análisis blockchain profesional</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
