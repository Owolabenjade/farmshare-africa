'use client'

import { useState, useEffect, useCallback } from 'react'
import { walletService, WalletState } from '@/lib/wallet-service'

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    accountId: null,
    network: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        await walletService.initialize()
        const currentState = walletService.getConnectionState()
        setWalletState(currentState)
      } catch (err) {
        setError('Failed to initialize wallet service')
        console.error(err)
      }
    }

    initializeWallet()
  }, [])

  const connectWallet = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const newState = await walletService.connectWallet()
      setWalletState(newState)
      
      if (!newState.isConnected) {
        setError('Failed to connect wallet')
      }
    } catch (err) {
      setError('Failed to connect wallet')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnectWallet = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const newState = await walletService.disconnectWallet()
      setWalletState(newState)
    } catch (err) {
      setError('Failed to disconnect wallet')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    ...walletState,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  }
}
