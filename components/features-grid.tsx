import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Coins,
  Activity,
  Shield,
  Network,
  Clock,
  Search,
  BarChart3,
  Globe,
  Eye,
  Zap,
  Users,
  AlertTriangle,
} from "lucide-react"

const features = [
  {
    icon: Coins,
    title: "Balance y Activos",
    description: "Análisis completo de ETH, tokens ERC-20, NFTs y valoración en tiempo real",
    color: "text-green-400",
  },
  {
    icon: Activity,
    title: "Historial Completo",
    description: "Últimas 1000+ transacciones con análisis de gas, patrones y frecuencia",
    color: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Evaluación de Riesgo",
    description: "Detección de contratos maliciosos, phishing y actividades sospechosas",
    color: "text-red-400",
  },
  {
    icon: Network,
    title: "Mapeo de Conexiones",
    description: "Red de wallets conectadas y análisis de relaciones financieras",
    color: "text-purple-400",
  },
  {
    icon: Clock,
    title: "Análisis Temporal",
    description: "Patrones de comportamiento, horarios de actividad y tendencias",
    color: "text-yellow-400",
  },
  {
    icon: Search,
    title: "OSINT Avanzado",
    description: "Búsqueda en redes sociales, GitHub, foros y bases de datos públicas",
    color: "text-cyan-400",
  },
  {
    icon: BarChart3,
    title: "Comparación Dual",
    description: "Análisis comparativo entre wallets para encontrar conexiones ocultas",
    color: "text-orange-400",
  },
  {
    icon: Globe,
    title: "Multi-Blockchain",
    description: "Soporte para 20+ blockchains y detección automática de bridges",
    color: "text-pink-400",
  },
  {
    icon: Eye,
    title: "Monitoreo Continuo",
    description: "Alertas en tiempo real y seguimiento de actividad sospechosa",
    color: "text-indigo-400",
  },
  {
    icon: Zap,
    title: "Análisis Instantáneo",
    description: "Resultados en segundos con APIs optimizadas y cache inteligente",
    color: "text-emerald-400",
  },
  {
    icon: Users,
    title: "Redes Sociales",
    description: "Correlación con perfiles de Twitter, Reddit, Discord y Telegram",
    color: "text-violet-400",
  },
  {
    icon: AlertTriangle,
    title: "Alertas Inteligentes",
    description: "Notificaciones automáticas de actividad anómala y riesgos detectados",
    color: "text-amber-400",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Capacidades de Investigación</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Herramientas profesionales de OSINT diseñadas para investigadores, analistas y profesionales de seguridad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-black/30 border-gray-700 hover:bg-black/50 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-4">
                <feature.icon className={`h-8 w-8 ${feature.color} mb-3`} />
                <CardTitle className="text-white text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
