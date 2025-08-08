'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, TrendingUp, Loader2 } from 'lucide-react'
import { FarmInvestmentModal } from './farm-investment-modal'
import { useContract } from '@/hooks/use-contract'

interface Farm {
  id: number
  name: string
  location: string
  crop: string
  totalValue: string
  tokensAvailable: number
  tokenPrice: number
  expectedReturn: string
  harvestDate: string
  image: string
}

export function FarmGrid() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [farms, setFarms] = useState<Farm[]>([])
  const [isLoadingFarms, setIsLoadingFarms] = useState(true)
  
  const { getAllFarms, getFarmDetails, isLoading } = useContract()

  // Load farms from contract
  useEffect(() => {
    const loadFarms = async () => {
      try {
        const farmIds = await getAllFarms()
        const farmDetails = await Promise.all(
          farmIds.map(async (id: number) => {
            const details = await getFarmDetails(id)
            return {
              id,
              name: details.name,
              location: 'Kenya', // You might want to store this in contract
              crop: 'Maize', // You might want to store this in contract
              totalValue: `$${(details.totalSupply * details.tokenPrice / 100).toLocaleString()}`,
              tokensAvailable: details.tokensAvailable,
              tokenPrice: details.tokenPrice / 100, // Convert from cents
              expectedReturn: `${details.expectedReturn}%`,
              harvestDate: new Date(details.harvestDate * 1000).toLocaleDateString(),
              image: '/kenyan-maize-farm.png'
            }
          })
        )
        setFarms(farmDetails)
      } catch (error) {
        console.error('Failed to load farms:', error)
        // Fallback to mock data
        setFarms([
          {
            id: 1,
            name: 'Sunrise Maize Farm',
            location: 'Kenya',
            crop: 'Maize',
            totalValue: '$50,000',
            tokensAvailable: 2500,
            tokenPrice: 20,
            expectedReturn: '12-15%',
            harvestDate: 'Dec 2024',
            image: '/kenyan-maize-farm.png'
          }
        ])
      } finally {
        setIsLoadingFarms(false)
      }
    }

    loadFarms()
  }, [getAllFarms, getFarmDetails])

  const handleInvestClick = (farm: Farm) => {
    setSelectedFarm(farm)
    setIsModalOpen(true)
  }

  const handleInvestmentSuccess = () => {
    // Refresh farms data after successful investment
    setIsLoadingFarms(true)
    // Reload farms logic here
  }

  if (isLoadingFarms) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2">Loading farms...</span>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Available Farms</h2>
          <div className="flex gap-2">
            <Badge variant="outline">All Crops</Badge>
            <Badge variant="outline">All Countries</Badge>
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {farms.map((farm) => (
            <Card key={farm.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100">
                <img 
                  src={farm.image || "/placeholder.svg"} 
                  alt={farm.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{farm.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {farm.location} • {farm.crop}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {farm.expectedReturn}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Value</p>
                    <p className="font-semibold">{farm.totalValue}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tokens Available</p>
                    <p className="font-semibold">{farm.tokensAvailable.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Token Price</p>
                    <p className="font-semibold">${farm.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min Investment</p>
                    <p className="font-semibold">${farm.tokenPrice}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Harvest: {farm.harvestDate}
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleInvestClick(farm)}
                  disabled={farm.tokensAvailable === 0}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {farm.tokensAvailable === 0 ? 'Sold Out' : 'Invest Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <FarmInvestmentModal
        farm={selectedFarm}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleInvestmentSuccess}
      />
    </>
  )
}
