import { Button } from '@/components/ui/button'
import { ArrowRight, Sprout, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('/african-farm-landscape.png')] bg-cover bg-center opacity-5" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <Sprout className="h-4 w-4" />
              Blockchain-Powered Agriculture
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Invest in African Farms,
            <span className="text-green-600"> Earn from Harvests</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FarmShare Africa enables fractional ownership of African farms through blockchain tokenization. 
            Farmers raise capital while investors earn returns from harvest proceeds.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Investing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/farmers">
              <Button variant="outline" size="lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                List Your Farm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
