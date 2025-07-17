import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Farm {
  id: string
  name: string
  location: string
  size_hectares: number
  crop_type: string
  farmer_id: string
  token_symbol: string
  token_id: string
  total_tokens: number
  price_per_token: number
  status: 'planning' | 'funding' | 'growing' | 'harvesting' | 'completed'
  funding_goal: number
  current_funding: number
  planting_date: string
  expected_harvest: string
  created_at: string
  updated_at: string
}

export interface Farmer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  experience_years: number
  verified: boolean
  created_at: string
}

export interface Investment {
  id: string
  investor_id: string
  farm_id: string
  tokens_purchased: number
  amount_invested: number
  purchase_date: string
  status: 'active' | 'completed' | 'refunded'
}
