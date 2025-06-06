export default function HomePage() {
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
                <p className="text-xs text-purple-300">Plataforma OSINT Profesional</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Análisis
              </a>
              <a href="/comparar" className="text-gray-300 hover:text-white transition-colors">
                Comparar
              </a>
              <a href="/redes" className="text-gray-300 hover:text-white transition-colors">
                Redes
              </a>
              <button className="px-4 py-2 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-colors">
                Acceso Pro
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-900/20 border border-purple-400 rounded-full mb-6">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            <span className="text-purple-300 text-sm">Tecnología OSINT Avanzada</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Investigación
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Blockchain Profesional
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Plataforma de inteligencia OSINT para análisis profundo de wallets de criptomonedas. Descubre conexiones
            ocultas, patrones de comportamiento y evalúa riesgos con precisión profesional.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span>Análisis Multi-Blockchain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span>Inteligencia OSINT</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>Tiempo Real</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-black/40 border border-gray-700 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Iniciar Investigación OSINT</h2>
              <p className="text-gray-400">Ingresa la dirección de wallet para comenzar el análisis completo</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3">
                  <input
                    type="text"
                    placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87 o nombre.eth"
                    className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-lg"
                  />
                </div>
                <select className="h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white">
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="bsc">BSC</option>
                </select>
              </div>

              <button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-colors">
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 bg-white/20 rounded mr-2"></div>
                  Analizar Wallet con IA
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Análisis seguro • APIs en tiempo real • Multi-blockchain • OSINT profesional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Capacidades de Investigación</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Herramientas profesionales de OSINT diseñadas para investigadores, analistas y profesionales de seguridad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-green-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Balance y Activos</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Análisis completo de ETH, tokens ERC-20, NFTs y valoración en tiempo real
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-blue-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Historial Completo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Últimas 1000+ transacciones con análisis de gas, patrones y frecuencia
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-red-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Evaluación de Riesgo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Detección de contratos maliciosos, phishing y actividades sospechosas
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-purple-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Mapeo de Conexiones</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Red de wallets conectadas y análisis de relaciones financieras
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-yellow-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Análisis Temporal</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Patrones de comportamiento, horarios de actividad y tendencias
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-cyan-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">OSINT Avanzado</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Búsqueda en redes sociales, GitHub, foros y bases de datos públicas
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-orange-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Comparación Dual</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Análisis comparativo entre wallets para encontrar conexiones ocultas
              </p>
            </div>

            <div className="bg-black/30 border border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105 rounded-lg p-6">
              <div className="w-8 h-8 bg-pink-400 rounded mb-3"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Multi-Blockchain</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Soporte para 20+ blockchains y detección automática de bridges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Confiado por Profesionales</h2>
            <p className="text-gray-300 text-lg">
              Estadísticas que respaldan nuestra excelencia en investigación blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-400 rounded mx-auto mb-4"></div>
              <div className="text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-lg font-semibold text-purple-300 mb-1">Wallets Analizadas</div>
              <div className="text-sm text-gray-400">Base de datos completa</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-400 rounded mx-auto mb-4"></div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-lg font-semibold text-purple-300 mb-1">Precisión</div>
              <div className="text-sm text-gray-400">En detección de riesgos</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-400 rounded mx-auto mb-4"></div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-lg font-semibold text-purple-300 mb-1">Monitoreo</div>
              <div className="text-sm text-gray-400">Vigilancia continua</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-yellow-400 rounded mx-auto mb-4"></div>
              <div className="text-4xl font-bold text-white mb-2">&lt;2s</div>
              <div className="text-lg font-semibold text-purple-300 mb-1">Tiempo Respuesta</div>
              <div className="text-sm text-gray-400">Análisis instantáneo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CI</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">CriptoInvestigador</h3>
                  <p className="text-purple-300 text-sm">Plataforma OSINT Profesional</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                La plataforma más avanzada para investigación blockchain e inteligencia OSINT. Desarrollada por
                profesionales para profesionales de la seguridad y análisis de criptomonedas.
              </p>
              <div className="text-xs text-gray-500">
                <p className="mb-1">
                  © 2024 <span className="text-purple-400 font-semibold">criptocurrencia.com</span> - Todos los derechos
                  reservados
                </p>
                <p>Autor: criptocurrencia.com | Plataforma de análisis blockchain profesional</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Herramientas</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Análisis de Wallet
                  </a>
                </li>
                <li>
                  <a href="/comparar" className="hover:text-white transition-colors">
                    Comparación
                  </a>
                </li>
                <li>
                  <a href="/redes" className="hover:text-white transition-colors">
                    Mapeo de Redes
                  </a>
                </li>
                <li>
                  <a href="/monitoreo" className="hover:text-white transition-colors">
                    Monitoreo 24/7
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/docs" className="hover:text-white transition-colors">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="/api" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="/contacto" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="/status" className="hover:text-white transition-colors">
                    Estado del Sistema
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
              <span>Datos encriptados</span>
              <span>APIs optimizadas</span>
              <span>Seguridad profesional</span>
              <span>Multi-blockchain</span>
              <span>Análisis en tiempo real</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
