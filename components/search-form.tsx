"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function SearchForm() {
  const [address, setAddress] = useState("")
  const [network, setNetwork] = useState("ethereum")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const validateAddress = (addr: string) => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/
    const ensRegex = /^[a-zA-Z0-9-]+\.eth$/
    return ethRegex.test(addr) || ensRegex.test(addr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!address.trim()) {
      setError("Por favor ingresa una dirección de wallet")
      return
    }

    if (!validateAddress(address)) {
      setError("Formato de dirección inválido. Usa formato 0x... o nombre.eth")
      return
    }

    setIsLoading(true)

    try {
      // Simular un pequeño retraso para la UX
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push(`/wallet/${address}?network=${network}`)
    } catch (err) {
      setError("Error al procesar la solicitud")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Iniciar Investigación OSINT</h2>
                <p className="text-gray-400">Ingresa la dirección de wallet para comenzar el análisis completo</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3">
                  <Input
                    type="text"
                    placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87 o nombre.eth"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 text-lg"
                  />
                </div>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Iniciando Análisis OSINT...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Analizar Wallet con IA
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Análisis seguro • APIs en tiempo real • Multi-blockchain • OSINT profesional
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
