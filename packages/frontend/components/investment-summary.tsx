import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Wallet, BarChart3, Calendar } from 'lucide-react'

export function InvestmentSummary() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">$2,450</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-2xl font-bold text-green-600">$2,680</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Return</span>
              <span className="text-sm font-semibold text-green-600">+$230 (9.4%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            My Investments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Sunrise Maize Farm</p>
              <p className="text-sm text-gray-500">500 tokens</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">$1,000</p>
              <p className="text-sm text-green-600">+8.2%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Golden Cassava Estate</p>
              <p className="text-sm text-gray-500">725 tokens</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">$1,450</p>
              <p className="text-sm text-green-600">+10.1%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Harvests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Green Valley Rice</p>
              <p className="text-sm text-gray-500">Nov 2024</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Expected: $120</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sunrise Maize</p>
              <p className="text-sm text-gray-500">Dec 2024</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Expected: $85</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button className="w-full" variant="outline">
        <TrendingUp className="mr-2 h-4 w-4" />
        View Detailed Analytics
      </Button>
    </div>
  )
}
