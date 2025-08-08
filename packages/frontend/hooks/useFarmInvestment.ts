import { useState } from 'react'
import { useFarmContract } from './useFarmContract'
import { useQueryClient } from '@tanstack/react-query'

export function useFarmInvestment() {
  const [loading, setLoading] = useState(false)
  const { investInFarm } = useFarmContract()
  const queryClient = useQueryClient()

  const handleInvestment = async (
    farmId: string,
    amount: number,
    tokenAmount: number
  ) => {
    setLoading(true)
    try {
      // In a real implementation, you'd get the token address from the farm data
      const tokenAddress = "0x..." // This should come from farm data
      const result = await investInFarm(tokenAddress, tokenAmount, amount.toString())
      
      // Invalidate and refetch farm data
      queryClient.invalidateQueries({ queryKey: ['farms'] })
      queryClient.invalidateQueries({ queryKey: ['available-farms'] })
      
      return result
    } finally {
      setLoading(false)
    }
  }

  return {
    investInFarm: handleInvestment,
    loading
  }
}
