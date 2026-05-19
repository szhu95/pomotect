import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header } from '@/components'
import Providers from '@/components/Providers'
import SiteNavigationJsonLd from '@/components/SiteNavigationJsonLd'
// import RSVPLink from '@/components/RSVPLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pomotect.com'),
  title: {
    default: 'Postmodern Tectonics',
    template: '%s | Postmodern Tectonics',
  },
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
        <SiteNavigationJsonLd />
        {/* Preload critical video assets for faster loading */}
        <link rel="preload" href="/globe-animation.webm" as="fetch" type="video/webm" />
        <link rel="preload" href="/globe-animation.gif" as="image" type="image/gif" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* <RSVPLink /> */}
        <Providers>
          <div className="site-layout">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}