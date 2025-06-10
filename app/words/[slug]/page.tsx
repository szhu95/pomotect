import { Post, Posts } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import WordsSidebar from '@/components/WordsSidebar';
import { formatUpdatedDate, getPost, getPosts } from '@/utils';
import Link from 'next/link';
import React from 'react'
import NotFound from "@/app/not-found";
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
  src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
  src: '../../../fonts/pomotect-analog-regular.otf',
});

export default async function Article({ params }: any) {
  const awaitedParams = await params;

  async function getData() {
    const [post, allPostsData] = await Promise.all([
      getPost(awaitedParams.slug),
      getPosts()
    ]);

    if (!post || !allPostsData) {
      return {
        notFound: true,
      }
    }

    return {
      post,
      allPosts: allPostsData
    }
  }

  const data = await getData();

  if (data.post.errors) {
    return NotFound();
  }

  let response = data.post;
  let utcTimeString = response.posts[0].published_at;
  const date = new Date(utcTimeString);
  let formattedDate = formatUpdatedDate(date);

  // Get all posts for sidebar, filtering out projects
  const sidebarPosts = data.allPosts.posts.filter((post: any) => post.primary_tag?.name !== "Process");

  return (
    <div className="relative">
      <Link href="/words" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to more words ⇢</Link>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {formattedDate}</p>
      </div>

      <Post response={response} />

      <Link href="/words" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white mt-24 md:mt-32 block">Back to more words ⇢</Link>

      <div className="hidden md:block">
        <ScrollToTopButton />
        <WordsSidebar posts={sidebarPosts} />
      </div>
    </div>
  )
}