import { ProjectPost } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatUpdatedDate, getPost, getPosts } from '@/utils';
import Link from 'next/link';
import React from 'react'
import NotFound from "@/app/not-found";
import localFont from 'next/font/local';
import ProcessSidebar from '@/components/ProcessSidebar';

const pomotectBoldFont = localFont({
  src: '../../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
  src: '../../../../fonts/pomotect-analog-regular.otf',
});

export default async function ProjectPage({ params }: any) {
  const awaitedParams = await params;

  async function getData() {
    const [post, allPostsData] = await Promise.all([
      getPost(awaitedParams.slug),
      getPosts()
    ]);

    if (!post) {
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

  // Get all process posts for sidebar
  const processPosts = data.allPosts.posts.filter((post: any) => post.primary_tag?.name === "Process");

  return (
    <div className="relative">
      <Link href="/products/process" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to Process ⇢</Link>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Process</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {formattedDate}</p>
      </div>

      <ProjectPost response={response} />

      <Link href="/products/process" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white mt-24 md:mt-32 block">Back to Process ⇢</Link>

      <ProcessSidebar posts={processPosts} />

      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}