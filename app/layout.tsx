import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header } from '@/components'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import SplashScreen from '@/components/SplashScreen'
import { CartProvider } from '@/context/CartContext'
import RSVPLinkImg from '@/assets/images/rsvp-link.webp'
import Link from 'next/link'

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
        {/* Floating RSVP link top right for md+ */}
        <Link href="/rsvp" className="fixed top-4 right-4 z-50 transition-opacity hover:opacity-70 hidden md:block" style={{ pointerEvents: 'auto' }}>
          <img src={RSVPLinkImg.src} alt="RSVP" className="w-20 h-auto drop-shadow-lg" />
        </Link>
        <SplashScreen />
        {/* RSVP link for mobile, below header, right-aligned */}
        <div className="block md:hidden w-full flex justify-end mt-2 mb-2 pr-4">
          <Link href="/rsvp" className="inline-block">
            <img src={RSVPLinkImg.src} alt="RSVP" className="w-20 h-auto drop-shadow-lg" />
          </Link>
        </div>
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