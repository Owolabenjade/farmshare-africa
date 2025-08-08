'use client'

import { Button } from '@/components/ui/button'
import { Wallet, AlertCircle } from 'lucide-react'
import { useWallet } from '@/hooks/use-wallet'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function WalletConnect() {
  const { 
    isConnected, 
    accountId, 
    network, 
    isLoading, 
    error, 
    connectWallet, 
    disconnectWallet 
  } = useWallet()

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (isConnected && accountId) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm">
          <p className="font-medium">Connected to {network}</p>
          <p className="text-gray-500">{accountId}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={disconnectWallet}
          disabled={isLoading}
        >
          {isLoading ? 'Disconnecting...' : 'Disconnect'}
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={connectWallet} 
      className="bg-green-600 hover:bg-green-700"
      disabled={isLoading}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}
