'use client'

import { useState, useEffect } from 'react'

interface Farm {
  id: string
  name: string
  location: string
  description: string
  totalValue: number
  availableShares: number
  totalShares: number
  pricePerShare: number
  imageUrl?: string
  farmerId: string
  roi?: number
  riskLevel?: string
}

interface ContractHook {
  farms: Farm[]
  loading: boolean
  isLoading: boolean
  error: string | null
  fetchFarms: () => Promise<void>
  getAllFarms: () => Promise<Farm[]>
  getFarmDetails: (farmId: string) => Promise<Farm | null>
  investInFarm: (farmId: string, shares: number) => Promise<{ success: boolean; transactionId?: string }>
}

export function useContract(): ContractHook {
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const fetchFarms = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/farms`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch farms: ${response.statusText}`)
      }
      
      const farmsData = await response.json()
      setFarms(farmsData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch farms'
      setError(errorMessage)
      console.error('Error fetching farms:', err)
    } finally {
      setLoading(false)
    }
  }

  const getAllFarms = async (): Promise<Farm[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/farms`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch farms: ${response.statusText}`)
      }
      
      const farmsData = await response.json()
      setFarms(farmsData)
      return farmsData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch farms'
      setError(errorMessage)
      console.error('Error fetching farms:', err)
      return []
    } finally {
      setLoading(false)
    }
  }

  const getFarmDetails = async (farmId: string): Promise<Farm | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/farms/${farmId}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch farm details: ${response.statusText}`)
      }
      
      const farmData = await response.json()
      return farmData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch farm details'
      setError(errorMessage)
      console.error('Error fetching farm details:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const investInFarm = async (farmId: string, shares: number): Promise<{ success: boolean; transactionId?: string }> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmId,
          shares,
          amount: shares * 100 // Assuming $100 per share
        })
      })
      
      if (!response.ok) {
        throw new Error(`Investment failed: ${response.statusText}`)
      }
      
      const result = await response.json()
      return {
        success: true,
        transactionId: result.transactionId
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Investment failed'
      setError(errorMessage)
      console.error('Error investing in farm:', err)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarms()
  }, [])

  return {
    farms,
    loading,
    isLoading: loading, // Alias for compatibility
    error,
    fetchFarms,
    getAllFarms,
    getFarmDetails,
    investInFarm
  }
}
