import { useQuery } from '@tanstack/react-query'
import { useFarmContract } from './useFarmContract'
import { FarmFilters } from '@/types/farm'

export function useAvailableFarms(filters: FarmFilters = {}) {
  const { getAllFarms } = useFarmContract()
  
  const { data: allFarms = [], isLoading, error } = useQuery({
    queryKey: ['available-farms'],
    queryFn: getAllFarms,
    enabled: !!getAllFarms,
  })

  // Filter farms based on provided filters
  const filteredFarms = allFarms.filter(farm => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        farm.name.toLowerCase().includes(searchLower) ||
        farm.location.toLowerCase().includes(searchLower) ||
        farm.cropType.toLowerCase().includes(searchLower)
      
      if (!matchesSearch) return false
    }

    if (filters.region && filters.region !== 'all') {
      if (farm.region !== filters.region) return false
    }

    if (filters.cropType && filters.cropType !== 'all') {
      if (farm.cropType.toLowerCase() !== filters.cropType.toLowerCase()) return false
    }

    if (filters.verified !== undefined) {
      if (farm.verified !== filters.verified) return false
    }

    if (filters.minYield !== undefined) {
      if (farm.expectedYield < filters.minYield) return false
    }

    if (filters.maxYield !== undefined) {
      if (farm.expectedYield > filters.maxYield) return false
    }

    return true
  })

  return {
    farms: filteredFarms,
    loading: isLoading,
    error: error?.message
  }
}
