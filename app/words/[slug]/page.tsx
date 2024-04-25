import { Post, Posts } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatUpdatedDate, getPost } from '@/utils';
import Link from 'next/link';
import React from 'react'
import NotFound from "@/app/not-found";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {

  async function getData() {
    const post = await getPost(params.slug)
    if (!post) {
      return {
        notFound: true,
      }
    }

    return {
      post
    }
  }

  const data = await getData();

  console.log(JSON.stringify(data.post))
  let response = data.post;

  if (response.errors) {
    return NotFound();
  }

  let utcTimeString = response.posts[0].published_at;
  const date = new Date(utcTimeString);
  let formattedDate = formatUpdatedDate(date)

  return (
    <div>
      <Link href="/words" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to more words ⇢</Link>
      <div className="site-section">
        <div className="main_header">Words</div>
        <p><i>Most recently updated on {formattedDate}</i></p>
      </div>

      <Post response={response} />

      <Link href="/words" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to more words ⇢</Link>


      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}