import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/common/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FarmShare Africa - Fractional Farm Investment',
  description: 'Invest in African agriculture through tokenized farm assets on Hedera network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
