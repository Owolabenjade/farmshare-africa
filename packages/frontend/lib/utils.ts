import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number | string, currency = 'HBAR'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return `${num.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 4 
  })} ${currency}`
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function calculateDaysUntil(date: Date | string): number {
  const targetDate = new Date(date)
  const today = new Date()
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getRandomFarmImage(cropType: string): string {
  const images = {
    maize: '/images/farms/maize.jpg',
    rice: '/images/farms/rice.jpg',
    coffee: '/images/farms/coffee.jpg',
    cocoa: '/images/farms/cocoa.jpg',
    cassava: '/images/farms/cassava.jpg',
    yam: '/images/farms/yam.jpg',
  }
  
  return images[cropType.toLowerCase() as keyof typeof images] || '/images/farms/default.jpg'
}
