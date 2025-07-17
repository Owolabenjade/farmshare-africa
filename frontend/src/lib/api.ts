const API_BASE_URL = process.env.NEXT_PUBLIC_RAILWAY_API_URL || 'http://localhost:8000'

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/api${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Farm endpoints
  async getFarms() {
    return this.request('/farms')
  }

  async getFarm(id: string) {
    return this.request(`/farms/${id}`)
  }

  async createFarm(farmData: any) {
    return this.request('/farms', {
      method: 'POST',
      body: JSON.stringify(farmData),
    })
  }

  // Investment endpoints
  async getInvestments(userId: string) {
    return this.request(`/investments/user/${userId}`)
  }

  async createInvestment(investmentData: any) {
    return this.request('/investments', {
      method: 'POST',
      body: JSON.stringify(investmentData),
    })
  }

  // Token endpoints
  async createFarmToken(tokenData: any) {
    return this.request('/tokens/create', {
      method: 'POST',
      body: JSON.stringify(tokenData),
    })
  }

  async transferTokens(transferData: any) {
    return this.request('/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  // Weather data
  async getWeatherData(latitude: number, longitude: number) {
    return this.request(`/weather?lat=${latitude}&lon=${longitude}`)
  }
}

export const apiService = new ApiService()
