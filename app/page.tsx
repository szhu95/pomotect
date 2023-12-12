import Image from 'next/image'
import AboutPage from '../pages/about'
import ArticlesPage from '../pages/articles'
import ObjectsPage from '../pages/objects'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div><AboutPage/></div>
    </main>
  )
}
