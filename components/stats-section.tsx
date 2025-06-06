import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Database, Shield, Zap } from "lucide-react"

const stats = [
  {
    icon: Database,
    value: "50M+",
    label: "Wallets Analizadas",
    description: "Base de datos completa",
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Precisión",
    description: "En detección de riesgos",
  },
  {
    icon: Shield,
    value: "24/7",
    label: "Monitoreo",
    description: "Vigilancia continua",
  },
  {
    icon: Zap,
    value: "<2s",
    label: "Tiempo Respuesta",
    description: "Análisis instantáneo",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Confiado por Profesionales</h2>
          <p className="text-gray-300 text-lg">
            Estadísticas que respaldan nuestra excelencia en investigación blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 text-center"
            >
              <CardContent className="p-6">
                <stat.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-purple-300 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
