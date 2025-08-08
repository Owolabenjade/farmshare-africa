'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContract } from '@/hooks/use-contract'
import { useWallet } from '@/hooks/use-wallet'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Farm {
  id: number
  name: string
  tokenPrice: number
  tokensAvailable: number
  expectedReturn: string
}

interface FarmInvestmentModalProps {
  farm: Farm | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function FarmInvestmentModal({ farm, isOpen, onClose, onSuccess }: FarmInvestmentModalProps) {
  const [tokenAmount, setTokenAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<{
    success: boolean
    transactionId?: string
    error?: string
  } | null>(null)

  const { purchaseTokens, isLoading } = useContract()
  const { isConnected } = useWallet()

  const totalCost = farm ? parseFloat(tokenAmount || '0') * farm.tokenPrice : 0
  const maxTokens = farm?.tokensAvailable || 0

  const handlePurchase = async () => {
    if (!farm || !tokenAmount || !isConnected) return

    const tokens = parseInt(tokenAmount)
    if (tokens <= 0 || tokens > maxTokens) return

    setIsProcessing(true)
    setTransactionResult(null)

    try {
      const result = await purchaseTokens(farm.id, tokens, totalCost)
      
      setTransactionResult({
        success: true,
        transactionId: result.transactionId
      })
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
      
    } catch (error) {
      setTransactionResult({
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetModal = () => {
    setTokenAmount('')
    setTransactionResult(null)
    setIsProcessing(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!farm) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invest in {farm.name}</DialogTitle>
          <DialogDescription>
            Purchase farm tokens to earn returns from harvest proceeds
          </DialogDescription>
        </DialogHeader>

        {transactionResult ? (
          <div className="space-y-4">
            {transactionResult.success ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Transaction successful! Your tokens will be available shortly.
                  {transactionResult.transactionId && (
                    <div className="mt-2 text-xs font-mono">
                      TX: {transactionResult.transactionId}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {transactionResult.error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {!isConnected && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please connect your wallet to continue
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Token Price</p>
                <p className="font-semibold">${farm.tokenPrice}</p>
              </div>
              <div>
                <p className="text-gray-500">Available Tokens</p>
                <p className="font-semibold">{farm.tokensAvailable.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Expected Return</p>
                <p className="font-semibold text-green-600">{farm.expectedReturn}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Cost</p>
                <p className="font-semibold">${totalCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenAmount">Number of Tokens</Label>
              <Input
                id="tokenAmount"
                type="number"
                placeholder="Enter amount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                min="1"
                max={maxTokens}
                disabled={isProcessing || !isConnected}
              />
              <p className="text-xs text-gray-500">
                Maximum: {maxTokens.toLocaleString()} tokens
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={
                  !tokenAmount || 
                  parseInt(tokenAmount) <= 0 || 
                  parseInt(tokenAmount) > maxTokens || 
                  isProcessing || 
                  !isConnected ||
                  isLoading
                }
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Purchase ${tokenAmount || 0} Tokens`
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
