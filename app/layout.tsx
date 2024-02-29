import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Header } from '@/components'
import bg from '../assets/images/bg.jpeg'

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
      <body className={inter.className} style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'bottom 10% right 0px',
        objectFit: 'cover'
      }}>
        <div className="site-layout">
          <Header />
          {children}
          <Footer />
        </div>

      </body>
    </html>
  )
}

