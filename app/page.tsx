import Image from 'next/image'
import { Hero } from '@/components'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Link href="/objects" className="page-link">Objects</Link>
      <Link href="/articles" className="page-link">Articles</Link>
      <Link href="/about" className="page-link">About</Link>
      <Hero />
    </main>
  )
}
