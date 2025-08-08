'use client'

import { useState, useCallback } from 'react'
import { hederaClient } from '@/lib/hedera-client'
import { useWallet } from './use-wallet'

export function useContract() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accountId } = useWallet()

  const createFarmToken = useCallback(async (farmData: {
    name: string
    totalSupply: number
    tokenPrice: number
    expectedReturn: number
    harvestDate: Date
  }) => {
    if (!accountId) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await hederaClient.createFarmToken(
        farmData.name,
        farmData.totalSupply,
        farmData.tokenPrice,
        farmData.expectedReturn,
        Math.floor(farmData.harvestDate.getTime() / 1000)
      )

      if (!result.success) {
        throw new Error(result.error || 'Failed to create farm token')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [accountId])

  const purchaseTokens = useCallback(async (
    farmId: number,
    tokenAmount: number,
    totalCost: number
  ) => {
    if (!accountId) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await hederaClient.purchaseTokens(farmId, tokenAmount, totalCost)

      if (!result.success) {
        throw new Error(result.error || 'Failed to purchase tokens')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [accountId])

  const getFarmDetails = useCallback(async (farmId: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await hederaClient.getFarmDetails(farmId)

      if (!result.success) {
        throw new Error(result.error || 'Failed to get farm details')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getUserTokenBalance = useCallback(async (farmId: number) => {
    if (!accountId) {
      return { success: false, balance: 0 }
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await hederaClient.getUserTokenBalance(accountId, farmId)

      if (!result.success) {
        throw new Error(result.error || 'Failed to get token balance')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [accountId])

  const getAllFarms = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await hederaClient.getAllFarms()

      if (!result.success) {
        throw new Error(result.error || 'Failed to get farms')
      }

      return result.farms
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    createFarmToken,
    purchaseTokens,
    getFarmDetails,
    getUserTokenBalance,
    getAllFarms
  }
}
