import { Hero, ImageTicker } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPosts, storefront } from '@/utils';

export default async function Home() {

  async function getData() {
    const posts = await getPosts()

    if (!posts) {
      return {
        notFound: true,
      }
    }

    return {
      posts
    }
  }

  const data = await getData();

  let response = data.posts

  return (
    <main>
        <ImageTicker response={response} />
        <div className='bg-[#d1d5db] font-semibold text-white minion-font pl-1'>IN THE CUE</div>
        <Hero />
        <div className="hidden md:block">
          <ScrollToTopButton />
        </div>
    </main>

  )
}
