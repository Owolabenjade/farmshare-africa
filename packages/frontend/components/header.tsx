import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-600">
          FarmShare Africa
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Farms
          </Link>
          <Link href="/farmers" className="text-gray-600 hover:text-gray-900">
            For Farmers
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/signin">
              Sign In
            </Link>
          </Button>
          <Button asChild>
            <Link href="/farmers">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
