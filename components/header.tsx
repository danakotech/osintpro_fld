import Link from "next/link"
import { Shield, Search, GitCompare, Network, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-10 w-10 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CriptoInvestigador</h1>
              <p className="text-xs text-purple-300">Plataforma OSINT Profesional</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Search className="h-4 w-4" />
              <span>Análisis</span>
            </Link>
            <Link
              href="/comparar"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <GitCompare className="h-4 w-4" />
              <span>Comparar</span>
            </Link>
            <Link
              href="/redes"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Network className="h-4 w-4" />
              <span>Redes</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              Acceso Pro
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  )
}
