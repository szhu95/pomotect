"use client"
import { Hero } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export default function Home() {

  return (
    <main className="overflow-hidden">
      <Hero />
      <ScrollToTopButton />
    </main>
  )
}
