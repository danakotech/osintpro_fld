export function Footer() {
  return (
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
  )
}
