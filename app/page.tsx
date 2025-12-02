import { Hero, ImageTicker } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPosts, storefront } from '@/utils';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import localFont from 'next/font/local';
import EmailButton from '@/components/EmailButton';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';
import HolidaySaleBanner from '@/components/HolidaySaleBanner';

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
        <div className='md:flex text-center'>
          <span className={`${pomotectFont.className} text-primary-blue md:mr-4 text-sm`}>
            Subscribe to our newsletter
          </span>
          <NewsletterForm />
        </div>
        <HolidaySaleBanner />
        <ImageTicker response={response} />
        <div className={`${pomotectFont.className} bg-[#BCB7AD] font-semibold text-white pl-1`}>IN THE CUE</div>
        <Hero />
        <div className="hidden md:block">
          <ScrollToTopButton />
        </div>
      </main>
    </Suspense>
  )
}
