import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header} from '@/components'

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
      <body className={inter.className}>
        <div className="site-layout">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}