import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header } from '@/components'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import SplashScreen from '@/components/SplashScreen'
import { CartProvider } from '@/context/CartContext'
// import RSVPLink from '@/components/RSVPLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'postmodern tectonics',
  description: 'A b2b of ideas...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const Loading = dynamic(() => import('./loading'), {
    ssr: true,
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <RSVPLink /> */}
        <SplashScreen />
        <Suspense fallback={<Loading />}>
          <CartProvider>
            <div className="site-layout">
              <Header />
              {children}
              <Footer />
            </div>
          </CartProvider>
        </Suspense>
      </body>
    </html>
  )
}