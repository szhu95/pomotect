import React from 'react';
import { formatDate, getPosts } from '@/utils';
import Image from "next/image";
import parse from 'html-react-parser';
import ScrollToTopButton from '@/components/ScrollToTopButton';


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

  let response = data.posts;



  return (
    <div>
      <div className="site-section">
        <div className="main_header">Words</div>
        <p><i>Most recently updated on {response.posts[0].updated_at}</i></p>
      </div>

      {response.posts.map((post: any) => {
        return (
          <div key={post.id} className="mt-5">
            <div className='site-section words-header'>
              <div className="entry-number bg-black text-white">{post.title? post.title : 'Title'}</div>
              <p><i>On {post.updated_at}, {post.primary_author.name} {'<' + post.custom_excerpt + '>'} wrote:</i></p>
            </div>
            <div className="site-section words-body max-h-96 overflow-y-auto">
              <div>{parse(post.html)}</div>
              <div>
                {post.feature_image && <Image
                  src={post.feature_image}
                  alt={"words-image"}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />}
              </div>
            </div>
          </div>
        )
      })}

      <ScrollToTopButton />
    </div>
  )
}

export default Words