export enum FarmStatus {
  Pending = 0,
  Approved = 1,
  Funding = 2,
  Growing = 3,
  Completed = 4
}

export interface Farm {
  id: string
  name: string
  description: string
  cropType: string
  location: string
  region: string
  farmer: string
  image: string
  fundingGoal: string
  currentFunding?: string
  fundingProgress?: number
  tokenAddress?: string
  tokenPrice?: string
  maxSupply?: number
  currentSupply?: number
  expectedYield: number
  riskLevel: 'low' | 'medium' | 'high'
  status: FarmStatus
  verified: boolean
  createdAt: Date
  harvestDate?: Date
  tags?: string[]
}

export interface FarmFilters {
  search?: string
  region?: string
  cropType?: string
  riskLevel?: string
  minYield?: number
  maxYield?: number
  verified?: boolean
}

export interface Investment {
  id: string
  farmId: string
  farm: Farm
  investorAddress: string
  tokenAmount: number
  investmentAmount: string
  purchaseDate: Date
  currentValue?: string
  profit?: string
  profitPercentage?: number
}

export interface FarmRegistrationData {
  farmId: string
  name: string
  description: string
  cropType: string
  location: string
  fundingGoal: string
  harvestDate: Date
  certifications: string[]
  images: File[]
}

export interface WeatherData {
  location: string
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
  forecast: {
    date: string
    temperature: { min: number; max: number }
    condition: string
    rainfall: number
  }[]
}

export interface YieldData {
  farmId: string
  cropType: string
  expectedYield: number
  actualYield?: number
  harvestDate: Date
  quality: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface Transaction {
  id: string
  type: 'investment' | 'harvest' | 'transfer' | 'registration'
  farmId?: string
  farmName?: string
  amount: string
  currency: 'HBAR' | 'USD'
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: Date
  transactionHash?: string
  from?: string
  to?: string
}
