"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WalletTransactionsProps {
  transactions: any[]
  network: string
}

export function WalletTransactions({ transactions, network }: WalletTransactionsProps) {
  const [filter, setFilter] = useState("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatValue = (value: number) => {
    return value?.toFixed(6) || "0.000000"
  }

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.tx_hash.toLowerCase().includes(filter.toLowerCase()) ||
      (tx.from_address && tx.from_address.toLowerCase().includes(filter.toLowerCase())) ||
      (tx.to_address && tx.to_address.toLowerCase().includes(filter.toLowerCase())),
  )

  const paginatedTransactions = filteredTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const getExplorerUrl = (txHash: string) => {
    const baseUrl =
      network === "ethereum"
        ? "https://etherscan.io"
        : network === "polygon"
          ? "https://polygonscan.com"
          : "https://bscscan.com"
    return `${baseUrl}/tx/${txHash}`
  }

  return (
    <Card className="bg-black/30 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Historial de Transacciones
          </CardTitle>
          <div className="text-sm text-gray-400">{filteredTransactions.length} transacciones encontradas</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar por hash o dirección..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
              setPage(1)
            }}
            className="bg-gray-800/50 border-gray-600 text-white"
          />
        </div>

        {paginatedTransactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Tipo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Hash
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Fecha
                    </th>
                    <th scope="col" className="px-4 py-3">
                      De
                    </th>
                    <th scope="col" className="px-4 py-3">
                      A
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Valor
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Fee
                    </th>
                    <th scope="col" className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-700 bg-gray-800/20 hover:bg-gray-800/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              tx.transaction_type === "received" ? "bg-green-400" : "bg-red-400"
                            }`}
                          ></div>
                          <span className="capitalize">{tx.transaction_type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {tx.tx_hash.slice(0, 8)}...{tx.tx_hash.slice(-6)}
                      </td>
                      <td className="px-4 py-3">{formatDate(tx.timestamp)}</td>
                      <td className="px-4 py-3 font-mono">
                        {tx.from_address ? `${tx.from_address.slice(0, 6)}...${tx.from_address.slice(-4)}` : "N/A"}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {tx.to_address ? `${tx.to_address.slice(0, 6)}...${tx.to_address.slice(-4)}` : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {formatValue(tx.value)} {network === "ethereum" ? "ETH" : "MATIC"}
                      </td>
                      <td className="px-4 py-3">{tx.transaction_fee?.toFixed(6) || "0.000000"}</td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => window.open(getExplorerUrl(tx.tx_hash), "_blank")}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                <div className="text-sm text-gray-400">
                  Página {page} de {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No se encontraron transacciones</p>
            {filter && (
              <Button variant="link" onClick={() => setFilter("")}>
                Limpiar filtro
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
