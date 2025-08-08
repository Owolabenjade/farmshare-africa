import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '@/providers/WalletProvider'
import { Farm, FarmStatus } from '@/types/farm'
import toast from 'react-hot-toast'

// ABI for your deployed FarmRegistry contract
const FARM_REGISTRY_ABI = [
  "function approveFarmer(address _farmer) external",
  "function registerFarm(string _farmId, string _name, string _cropType, string _location, uint256 _fundingGoal, uint256 _harvestDate) external",
  "function approveFarm(string _farmId, string _tokenName, string _tokenSymbol, uint256 _tokenPrice, uint256 _maxSupply) external",
  "function getFarm(string _farmId) external view returns (tuple(string farmId, string name, string cropType, string location, address farmer, address tokenAddress, uint256 fundingGoal, uint8 status, uint256 createdAt))",
  "function getAllFarms() external view returns (string[])",
  "function approvedFarmers(address) external view returns (bool)",
  "event FarmRegistered(string indexed farmId, address indexed farmer)",
  "event FarmApproved(string indexed farmId, address tokenAddress)",
  "event FarmerApproved(address indexed farmer)"
]

const FARM_TOKEN_ABI = [
  "function purchaseTokens(uint256 tokenAmount) external payable",
  "function getFarmInfo() external view returns (string, string, string, string, uint256, uint256)",
  "function getInvestorInfo(address investor) external view returns (uint256, uint256)",
  "function tokenPrice() external view returns (uint256)",
  "function maxSupply() external view returns (uint256)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function completeHarvest() external payable",
  "event TokensPurchased(address indexed investor, uint256 amount, uint256 tokens)"
]

export function useFarmContract() {
  const { provider, signer, account, isConnected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [contract, setContract] = useState<ethers.Contract | null>(null)

  const contractAddress = process.env.NEXT_PUBLIC_FARM_REGISTRY_ADDRESS!

  useEffect(() => {
    if (provider && contractAddress) {
      const farmContract = new ethers.Contract(contractAddress, FARM_REGISTRY_ABI, provider)
      setContract(farmContract)
    }
  }, [provider, contractAddress])

  const getAllFarms = useCallback(async (): Promise<Farm[]> => {
    if (!contract) throw new Error('Contract not initialized')

    try {
      setLoading(true)
      const farmIds = await contract.getAllFarms()
      
      const farms: Farm[] = []
      for (const farmId of farmIds) {
        try {
          const farmData = await contract.getFarm(farmId)
          const farm: Farm = {
            id: farmData.farmId,
            name: farmData.name,
            cropType: farmData.cropType,
            location: farmData.location,
            farmer: farmData.farmer,
            tokenAddress: farmData.tokenAddress,
            fundingGoal: ethers.formatEther(farmData.fundingGoal),
            status: farmData.status as FarmStatus,
            createdAt: new Date(Number(farmData.createdAt) * 1000),
            region: getRegionFromLocation(farmData.location),
            expectedYield: Math.random() * 20 + 10,
            riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
            verified: farmData.status >= FarmStatus.Approved,
            image: `/images/farms/${farmData.cropType.toLowerCase()}.jpg`,
            description: `A ${farmData.cropType.toLowerCase()} farm located in ${farmData.location}`,
          }
          
          if (farmData.tokenAddress !== ethers.ZeroAddress) {
            try {
              const tokenContract = new ethers.Contract(farmData.tokenAddress, FARM_TOKEN_ABI, provider)
              const [tokenPrice, maxSupply, totalSupply] = await Promise.all([
                tokenContract.tokenPrice(),
                tokenContract.maxSupply(),
                tokenContract.totalSupply()
              ])
              
              farm.tokenPrice = ethers.formatEther(tokenPrice)
              farm.maxSupply = Number(maxSupply)
              farm.currentSupply = Number(totalSupply)
              farm.fundingProgress = (Number(totalSupply) / Number(maxSupply)) * 100
            } catch (error) {
              console.error(`Error fetching token data for farm ${farmId}:`, error)
            }
          }
          
          farms.push(farm)
        } catch (error) {
          console.error(`Error fetching farm data for ${farmId}:`, error)
        }
      }
      
      return farms
    } catch (error) {
      console.error('Error fetching farms:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [contract, provider])

  const investInFarm = useCallback(async (
    tokenAddress: string,
    tokenAmount: number,
    paymentAmount: string
  ): Promise<string> => {
    if (!provider || !signer) throw new Error('Provider or signer not available')

    try {
      setLoading(true)
      const tokenContract = new ethers.Contract(tokenAddress, FARM_TOKEN_ABI, signer)
      const tx = await tokenContract.purchaseTokens(tokenAmount, {
        value: ethers.parseEther(paymentAmount)
      })
      
      toast.loading('Processing investment...', { id: tx.hash })
      const receipt = await tx.wait()
      
      if (receipt.status === 1) {
        toast.success('Investment successful!', { id: tx.hash })
        return tx.hash
      } else {
        throw new Error('Transaction failed')
      }
    } catch (error: any) {
      console.error('Error investing in farm:', error)
      toast.error(error.message || 'Investment failed')
      throw error
    } finally {
      setLoading(false)
    }
  }, [provider, signer])

  return { contract, loading, getAllFarms, investInFarm, isConnected }
}

function getRegionFromLocation(location: string): string {
  const lowerLocation = location.toLowerCase()
  
  if (lowerLocation.includes('nigeria') || lowerLocation.includes('ghana') || 
      lowerLocation.includes('senegal') || lowerLocation.includes('mali')) {
    return 'west-africa'
  }
  
  if (lowerLocation.includes('kenya') || lowerLocation.includes('ethiopia') ||
      lowerLocation.includes('uganda') || lowerLocation.includes('tanzania')) {
    return 'east-africa'
  }
  
  if (lowerLocation.includes('south africa') || lowerLocation.includes('botswana') ||
      lowerLocation.includes('namibia') || lowerLocation.includes('zambia')) {
    return 'southern-africa'
  }
  
  if (lowerLocation.includes('egypt') || lowerLocation.includes('morocco') ||
      lowerLocation.includes('tunisia') || lowerLocation.includes('algeria')) {
    return 'north-africa'
  }
  
  return 'other'
}
