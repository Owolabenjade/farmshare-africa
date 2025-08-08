import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sprout } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FarmShare Africa</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Invest
            </Link>
            <Link href="/farmers" className="text-gray-600 hover:text-gray-900">
              List Farm
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline">Sign In</Button>
            <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
