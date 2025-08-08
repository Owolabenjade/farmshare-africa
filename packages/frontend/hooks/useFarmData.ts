import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFarmContract } from './useFarmContract'
import { Farm } from '@/types/farm'

export function useFarmData() {
  const { getAllFarms, loading: contractLoading } = useFarmContract()
  
  const { data: farms = [], isLoading, error } = useQuery({
    queryKey: ['farms'],
    queryFn: getAllFarms,
    enabled: !!getAllFarms,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const totalValue = farms.reduce((sum, farm) => {
    return sum + (parseFloat(farm.fundingGoal) * (farm.fundingProgress || 0) / 100)
  }, 0)

  const totalYield = farms.length > 0 
    ? farms.reduce((sum, farm) => sum + farm.expectedYield, 0) / farms.length 
    : 0

  return {
    farms,
    loading: isLoading || contractLoading,
    error: error?.message,
    totalValue,
    totalYield
  }
}
