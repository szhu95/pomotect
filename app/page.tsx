import { Hero, ImageTicker } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPosts, storefront } from '@/utils';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});


export default async function Home() {

  const Loading = dynamic(() => import('./loading'), {
    ssr: true,
  })

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
    <Suspense fallback={<Loading />}>
      <main>
        <ImageTicker response={response} />
        <div className={`${pomotectFont.className} bg-primary-blue font-semibold text-white pl-1`}>IN THE CUE</div>
        <Hero />
        <div className="hidden md:block">
          <ScrollToTopButton />
        </div>
      </main>
    </Suspense>
  )
}
