import { ProjectPost } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatUpdatedDate, getPost } from '@/utils';
import Link from 'next/link';
import React from 'react'
import NotFound from "@/app/not-found";
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
  src: '../../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
  src: '../../../../fonts/pomotect-analog-regular.otf',
});

export default async function ProjectPage({
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

  // console.log(JSON.stringify(data.post))
  let response = data.post;

  if (response.errors) {
    return NotFound();
  }

  let utcTimeString = response.posts[0].published_at;
  const date = new Date(utcTimeString);
  let formattedDate = formatUpdatedDate(date)

  return (
    <div>
      <Link href="/products/projects" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to more projects ⇢</Link>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Projects</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {formattedDate}</p>
      </div>

      <ProjectPost response={response} />

      <Link href="/products/projects" className="back-button minion-font text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to more projects ⇢</Link>


      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}