import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Invest in African Agriculture
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Own fractions of real farms through tokenization on Hedera network. 
              Support farmers, earn returns, and help feed Africa.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/farms"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Explore Farms
              </Link>
              <Link href="/farmers" className="text-sm font-semibold leading-6 text-gray-900">
                For Farmers <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            Powered by Hedera
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Revolutionary Farm Investment
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-white">🌾</span>
                </div>
                Fractional Ownership
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Buy tokens representing real farm assets. Start investing with as little as $10.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-white">⚡</span>
                </div>
                Instant Settlement
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Hedera's 3-second finality means instant trades and transparent records.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-white">📱</span>
                </div>
                Mobile-First
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Works on smartphones and feature phones. USSD support for universal access.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-white">🌍</span>
                </div>
                Cross-Border
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Invest in farms across Africa from anywhere in the world. Low fees, high impact.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
