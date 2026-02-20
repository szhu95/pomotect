import { unstable_cache } from 'next/cache';
import { Post } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import WordsSidebar from '@/components/WordsSidebar';
import { formatUpdatedDate, getPost, getPosts } from '@/utils';
import Link from 'next/link';
import React from 'react';
import NotFound from "@/app/not-found";
import localFont from 'next/font/local';

export const revalidate = 300;

const pomotectBoldFont = localFont({
  src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
  src: '../../../fonts/pomotect-analog-regular.otf',
});

async function fetchArticleData(slug: string) {
  const [post, allPostsData] = await Promise.all([
    getPost(slug),
    getPosts(),
  ]);
  if (!post || !allPostsData) return null;
  return { post, allPosts: allPostsData };
}

const getCachedArticleData = (slug: string) =>
  unstable_cache(
    () => fetchArticleData(slug),
    ['word-article', slug],
    { revalidate: 300 }
  )();

export default async function Article({ params }: any) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const data = await getCachedArticleData(slug);

  if (!data) {
    return NotFound();
  }

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

      <div className="hidden md:block">
        <ScrollToTopButton />
        <WordsSidebar posts={sidebarPosts} />
      </div>
    </div>
  )
}