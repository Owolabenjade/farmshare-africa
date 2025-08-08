import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Agriculture in Africa?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of investors supporting sustainable farming through blockchain technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/dashboard" className="inline-flex items-center">
              Start Investing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-green-600 border-white hover:bg-white">
            <Link href="/farmers">
              Register Your Farm
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
