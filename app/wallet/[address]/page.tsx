import { Header } from "@/components/header"
import { WalletDashboard } from "@/components/wallet-dashboard"

interface Props {
  params: { address: string }
  searchParams: { network?: string }
}

export default function WalletPage({ params, searchParams }: Props) {
  const network = searchParams.network || "ethereum"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <WalletDashboard address={params.address} network={network} />
      </div>
    </div>
  )
}
