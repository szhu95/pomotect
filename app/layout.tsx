import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header, CookieConsent } from '@/components'
import Providers from '@/components/Providers'
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

  return (
    <html lang="en">
      <head>
        {/* Preload critical video assets for faster loading */}
        <link rel="preload" href="/globe-animation.webm" as="fetch" type="video/webm" />
        <link rel="preload" href="/globe-animation.gif" as="image" type="image/gif" />
      </head>
      <body className={inter.className}>
        {/* <RSVPLink /> */}
        <Providers>
          <div className="site-layout">
            <Header />
            {children}
            <Footer />
          </div>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}