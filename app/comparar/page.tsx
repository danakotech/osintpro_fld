import { Header } from "@/components/header"
import { ComparisonTool } from "@/components/comparison-tool"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Comparar Wallets</h1>
        <ComparisonTool />
      </div>
    </div>
  )
}
