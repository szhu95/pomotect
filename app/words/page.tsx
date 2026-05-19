import { formatUpdatedDate } from '@/utils';
import { getCachedGhostPosts } from '@/lib/ghostPosts';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Posts } from '@/components';
import WordsSidebar from '@/components/WordsSidebar';
import WordsPageTransition from '@/components/WordsPageTransition';
import MobileViewToggle from '@/components/MobileViewToggle';
import localFont from 'next/font/local';

export const revalidate = 300;

const pomotectBoldFont = localFont({
  src: '../../fonts/pomotect-analog-bold.otf',
  display: 'swap',
});

const pomotectFont = localFont({
  src: '../../fonts/pomotect-analog-regular.otf',
  display: 'swap',
});

export default async function Words() {
  const postsData = await getCachedGhostPosts(50);

  if (postsData.rateLimited) {
    return (
      <div className="relative">
        <div className="site-section">
          <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
          <p className={`${pomotectFont.className} italic`}>
            Ghost is temporarily rate-limiting requests (too many loads during development).
            Wait a few minutes, restart the dev server once, then refresh.
          </p>
        </div>
      </div>
    );
  }

  if (!postsData.posts.length) {
    return (
      <div className="relative">
        <div className="site-section">
          <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
          <p className={`${pomotectFont.className} italic`}>No posts to show right now.</p>
        </div>
      </div>
    );
  }

  const response = postsData.posts.filter((post) => post.primary_tag?.name !== 'Process');
  const utcTimeString =
    response.find((post) => post.published_at)?.published_at ??
    '2024-01-01T00:00:00.000Z';
  const date = new Date(utcTimeString);
  const formattedDate = formatUpdatedDate(date);

  return (
    <div className="relative">
      <div className="site-section">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
            <MobileViewToggle />
          </div>
          <p className={`${pomotectFont.className} italic`}>Most recently updated on {formattedDate}</p>
        </div>
      </div>

      <WordsPageTransition>
        <div className="flex justify-center">
          <div className="w-full md:w-[65%] md:px-4">
            <Posts response={response} containerHeight={"max-h-[85vh]"} />
          </div>
        </div>

        <WordsSidebar posts={response} />

        <div className="hidden md:block">
          <ScrollToTopButton />
        </div>
      </WordsPageTransition>
    </div>
  );
}
