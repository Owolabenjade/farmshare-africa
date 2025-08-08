import { FarmGrid } from '@/components/farm-grid'
import { InvestmentSummary } from '@/components/investment-summary'
import { WalletConnect } from '@/components/wallet-connect'
import { ProductionWalletIntegration } from '@/components/production-wallet-integration'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your farm investments and track returns</p>
          </div>
          <WalletConnect />
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FarmGrid />
          </div>
          <div>
            <InvestmentSummary />
          </div>
        </div>

        <ProductionWalletIntegration />
      </div>
    </div>
  )
}
