import type { Metadata } from 'next';
import { Hero, ImageTicker } from '@/components'
import SitePrimaryNav from '@/components/SitePrimaryNav';
import ScrollToTopButton from '@/components/ScrollToTopButton'
import HomeReveal from '@/components/HomeReveal';
import { getCachedGhostPosts } from '@/lib/ghostPosts';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import localFont from 'next/font/local';
import NewsletterForm from '@/components/NewsletterForm';
import SaleBanner from '@/components/SaleBanner';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Postmodern Tectonics',
  description: 'A b2b of ideas...',
};

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});

export default async function Home() {
  const Loading = dynamic(() => import('./loading'), {
    ssr: true,
  });

  const posts = await getCachedGhostPosts();
  const response = { posts: posts?.posts ?? [] };

  return (
    <HomeReveal>
      <Suspense fallback={<Loading />}>
        <main>
          <SitePrimaryNav />
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
    </HomeReveal>
  );
}
