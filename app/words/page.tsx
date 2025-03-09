import React from 'react';
import { formatUpdatedDate, getPosts } from '@/utils';
import Image from "next/image";
import parse from 'html-react-parser';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Posts } from '@/components';
import localFont from 'next/font/local';

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

  let response = data.posts.posts.filter((post: any) => { return (post.primary_tag?.name !== "Projects") });;

  let utcTimeString = response[0].published_at;
  const date = new Date(utcTimeString);
  let formattedDate = formatUpdatedDate(date)

  return (
    <div>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {formattedDate}</p>
      </div>

        <Posts response={response} containerHeight={"max-h-[85vh]"} />
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}

export default Words