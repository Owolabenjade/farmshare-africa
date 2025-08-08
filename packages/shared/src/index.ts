// Shared types and interfaces
export interface Farm {
  id: string;
  name: string;
  location: string;
  description: string;
  totalValue: number;
  availableShares: number;
  totalShares: number;
  pricePerShare: number;
  imageUrl?: string;
  farmerId: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  location: string;
  experience: number;
  farms: string[];
}

export interface Investment {
  id: string;
  farmId: string;
  investorId: string;
  shares: number;
  totalAmount: number;
  timestamp: Date;
  transactionId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Contract constants
export const CONTRACT_CONFIG = {
  FARM_REGISTRY_ID: '0.0.6514484',
  NETWORK: 'testnet'
} as const;
