import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Coins, BarChart3, Globe, Users, Leaf } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Built on Hedera network for transparent, secure, and immutable transactions.'
  },
  {
    icon: Coins,
    title: 'Fractional Ownership',
    description: 'Own a piece of African farms with as little as $10 through tokenized shares.'
  },
  {
    icon: BarChart3,
    title: 'Harvest Returns',
    description: 'Earn returns based on actual farm harvest proceeds and crop yields.'
  },
  {
    icon: Globe,
    title: 'Pan-African Reach',
    description: 'Access farming opportunities across multiple African countries.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Connect farmers directly with global investors for mutual benefit.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Impact',
    description: 'Support sustainable farming practices and food security in Africa.'
  }
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Revolutionizing African Agriculture
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Connecting farmers and investors through blockchain technology for transparent, profitable farming.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
