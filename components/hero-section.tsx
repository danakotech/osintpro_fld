import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Eye } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <Badge variant="outline" className="mb-6 text-purple-300 border-purple-400 bg-purple-900/20">
          <Zap className="mr-2 h-3 w-3" />
          Tecnología OSINT Avanzada
        </Badge>

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
            <Shield className="h-4 w-4 text-green-400" />
            <span>Análisis Multi-Blockchain</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-blue-400" />
            <span>Inteligencia OSINT</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>Tiempo Real</span>
          </div>
        </div>
      </div>
    </section>
  )
}
