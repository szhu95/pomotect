import { unstable_cache } from 'next/cache';
import { Hero, ImageTicker } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPosts } from '@/utils';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import localFont from 'next/font/local';
import NewsletterForm from '@/components/NewsletterForm';
import SaleBanner from '@/components/SaleBanner';

export const revalidate = 300;

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});

const getCachedPosts = unstable_cache(
  async () => getPosts(),
  ['home-posts'],
  { revalidate: 300 }
);

export default async function Home() {
  const Loading = dynamic(() => import('./loading'), {
    ssr: true,
  });

  const posts = await getCachedPosts();
  const response = { posts: posts?.posts ?? [] };

  return (
    <Suspense fallback={<Loading />}>
      <main>
        <div className='md:flex text-center'>
          <span className={`${pomotectFont.className} text-primary-blue md:mr-4 text-sm`}>
            Subscribe to our newsletter
          </span>
          <NewsletterForm />
        </div>
        <SaleBanner />
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
