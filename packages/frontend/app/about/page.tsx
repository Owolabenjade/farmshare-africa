import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            About FarmShare Africa
          </h1>
          
          <div className="prose prose-lg mx-auto text-gray-700">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
              <p className="mb-6">
                FarmShare Africa democratizes agricultural investment by enabling fractional ownership 
                of African farms through blockchain tokenization on the Hedera network. We believe 
                that everyone should have the opportunity to invest in sustainable agriculture and 
                support local farmers across Africa.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-green-600">For Investors</h3>
                  <ul className="space-y-2">
                    <li>• Browse verified farms across Africa</li>
                    <li>• Purchase fractional shares using blockchain tokens</li>
                    <li>• Track your investment performance in real-time</li>
                    <li>• Receive returns based on farm productivity</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">For Farmers</h3>
                  <ul className="space-y-2">
                    <li>• Register your farm on our platform</li>
                    <li>• Access funding from global investors</li>
                    <li>• Maintain ownership while sharing profits</li>
                    <li>• Receive support and resources for growth</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Why Blockchain?</h2>
              <p className="mb-4">
                We use the Hedera blockchain network to ensure:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Transparency:</strong> All transactions are recorded on an immutable ledger</li>
                <li><strong>Security:</strong> Smart contracts protect investor funds and farmer rights</li>
                <li><strong>Low Fees:</strong> Hedera's efficient consensus mechanism keeps costs minimal</li>
                <li><strong>Sustainability:</strong> Carbon-negative blockchain technology</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Farms Registered</div>
                </div>
                <div className="text-center bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$2M+</div>
                  <div className="text-gray-600">Invested</div>
                </div>
                <div className="text-center bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15,000+</div>
                  <div className="text-gray-600">Investors</div>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Ready to Get Started?</h2>
              <p className="mb-6">
                Join thousands of investors supporting sustainable agriculture across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Start Investing
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/farmers">
                    Register Your Farm
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
