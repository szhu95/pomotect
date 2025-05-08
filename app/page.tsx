import { Hero, ImageTicker } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPosts, storefront } from '@/utils';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import localFont from 'next/font/local';
import EmailButton from '@/components/EmailButton';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

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
          <span className={`${pomotectFont.className} text-primary-blue md:mr-4`}>
            Subscribe to our newsletter
          </span>
          <NewsletterForm />
        </div>
        <Link
          href="/products"
          scroll={false}
          className="group"
        >
          {/* <div className={`${pomotectFont.className} group-hover:text-opacity-45 bg-[black] font-semibold text-center text-white mt-1 pl-1`}>SALE UP TO <span className={`${pomotectFont.className} text-primary-blue group-hover:text-terracotta`}>50% OFF</span> ON SELECT ITEMS ENDS SOON - CODE AUTOMATICALLY APPLIES AT CHECKOUT</div> */}
        </Link>
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
