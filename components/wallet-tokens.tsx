"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from "lucide-react"
import { Input } from "@/components/ui/input"

interface WalletTokensProps {
  tokens: any[]
}

export function WalletTokens({ tokens }: WalletTokensProps) {
  const [filter, setFilter] = useState("")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const filteredTokens = tokens.filter(
    (token) =>
      token.token_name?.toLowerCase().includes(filter.toLowerCase()) ||
      token.token_symbol?.toLowerCase().includes(filter.toLowerCase()) ||
      token.token_address?.toLowerCase().includes(filter.toLowerCase())
  )

  const getTokenExplorerUrl = (tokenAddress: string) => {
    return `https://etherscan.io/token/${tokenAddress}`
  }

  return (
    <Card className="bg-black/30 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Coins className="mr-2 h-5 w-5" />
            Tokens ERC-20
          </CardTitle>
          <div className="text-sm text-gray-400">
            {filteredTokens.length} tokens encontrados
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar por nombre o símbolo..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white"
          />
        </div>

        {filteredTokens.length > 0 ? (
          <div className="space-y-4">
            {filteredTokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray\
