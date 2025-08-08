'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ExternalLink, Info } from 'lucide-react'

export function ProductionWalletIntegration() {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Production Wallet Integration
        </CardTitle>
        <CardDescription>
          For production deployment, integrate with actual Hedera wallet providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            The current implementation uses mock wallet connections for development. 
            For production, integrate with one of these Hedera wallet solutions:
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">HashPack Wallet</h4>
              <p className="text-sm text-gray-600">Most popular Hedera wallet extension</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.hashpack.app/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">Blade Wallet</h4>
              <p className="text-sm text-gray-600">Multi-chain wallet with Hedera support</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://bladewallet.io/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">Kabila Wallet</h4>
              <p className="text-sm text-gray-600">Hedera-native wallet solution</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://kabila.app/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </a>
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Integration Steps:</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside text-gray-600">
            <li>Choose a wallet provider from above</li>
            <li>Install their SDK/integration library</li>
            <li>Replace the mock wallet service with actual wallet calls</li>
            <li>Update the Hedera client to use real SDK functions</li>
            <li>Test with your deployed smart contracts</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
