import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header } from '@/components'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

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
        <Suspense fallback={<Loading />}>
          <div className="site-layout">
            <Header />
            {children}
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  )
}