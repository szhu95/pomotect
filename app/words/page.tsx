import React from 'react';
import { formatDate, getPosts } from '@/utils';
import Image from "next/image";

export async function getData() {
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

  let response = data.posts.posts[0];

  return (
    <div>
      <div className="site-section">
        <div className="main_header">Words</div>
        <p><i>Most recently updated on {response.updated_at}</i></p>
      </div>
      <div className='site-section words-header'>
        <div className="objects_link bg-black text-white ">No.1</div>
        <p><i>On {response.updated_at}, {response.primary_author.name} {'<stevie@pomotect.com>'} wrote:</i></p>
      </div>
      <div className="words-body">
        <div>{response.title}</div>
        <div>{response.html}</div>
        <div>
          <Image
            src={response.feature_image}
            alt={"words-image"}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </div>
    </div>
  )
}

export default Words