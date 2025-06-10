import React from 'react';
import { formatUpdatedDate, getPosts } from '@/utils';
import Image from "next/image";
import parse from 'html-react-parser';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Posts } from '@/components';
import WordsSidebar from '@/components/WordsSidebar';
import localFont from 'next/font/local';
import MobileViewToggle from '@/components/MobileViewToggle';

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});

const garamondFont = localFont({
  src: '../../fonts/garamond.ttf'
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

const Words = async () => {
  const data = await getData();
  let response = data.posts.posts.filter((post: any) => { return (post.primary_tag?.name !== "Process") });

  let utcTimeString = response[0].published_at;
  const date = new Date(utcTimeString);
  let formattedDate = formatUpdatedDate(date)

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

      <div className="flex justify-center">
        <div className="w-full md:w-[65%] md:px-4">
          <Posts response={response} containerHeight={"max-h-[85vh]"} />
        </div>
      </div>

      <WordsSidebar posts={response} />
      
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}

export default Words