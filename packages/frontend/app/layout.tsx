import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { Toaster } from 'react-hot-toast'
import { QueryProvider } from '@/providers/QueryProvider'
import { WalletProvider } from '@/providers/WalletProvider'
import { Navbar } from '@/components/layout/Navbar'
import { theme } from '@/lib/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FarmShare Africa - Invest in African Agriculture',
  description: 'Democratize agricultural investment in Africa through blockchain technology',
  keywords: ['agriculture', 'investment', 'blockchain', 'hedera', 'africa', 'farming'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryProvider>
              <WalletProvider>
                <Navbar />
                <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
                  {children}
                </main>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#fff',
                      color: '#333',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    },
                  }}
                />
              </WalletProvider>
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
