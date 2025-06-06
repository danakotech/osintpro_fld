import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Activity, Shield, Network, Clock, Search, BarChart3, Globe } from "lucide-react"

const features = [
  {
    icon: Coins,
    title: "Balance y Tokens",
    description: "Análisis completo de ETH, tokens ERC-20 y NFTs con valoración en USD",
  },
  {
    icon: Activity,
    title: "Historial de Transacciones",
    description: "Últimas 100 transacciones con detalles completos y análisis de gas",
  },
  {
    icon: Shield,
    title: "Análisis de Riesgo",
    description: "Detección de contratos maliciosos, phishing y actividad sospechosa",
  },
  {
    icon: Network,
    title: "Wallets Conectadas",
    description: "Mapeo de relaciones y wallets que han interactuado frecuentemente",
  },
  {
    icon: Clock,
    title: "Patrones de Comportamiento",
    description: "Análisis temporal, horarios de actividad y patrones de uso",
  },
  {
    icon: Search,
    title: "OSINT Off-Chain",
    description: "Búsqueda en redes sociales, GitHub y bases de datos públicas",
  },
  {
    icon: BarChart3,
    title: "Comparación de Wallets",
    description: "Análisis comparativo entre dos wallets para encontrar conexiones",
  },
  {
    icon: Globe,
    title: "Multi-Blockchain",
    description: "Soporte para Ethereum, Polygon, BSC y detección de bridges",
  },
]

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <Card key={index} className="bg-black/30 border-gray-700 hover:bg-black/40 transition-colors">
          <CardHeader className="pb-3">
            <feature.icon className="h-8 w-8 text-purple-400 mb-2" />
            <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
