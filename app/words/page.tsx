import React from 'react';
import { formatDate, formatUpdatedDate, getPosts } from '@/utils';
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

  let utcTimeString = response.posts[0].created_at;
  const date = new Date(utcTimeString);
  let formattedDate = formatUpdatedDate(date)

  return (
    <div>
      <div className="site-section">
        <div className="main_header">Words</div>
        <p><i>Most recently updated on {formattedDate}</i></p>
      </div>

      {response.posts.map((post: any) => {
        let postUtcTimeString = post.created_at;
        let postDate = new Date(postUtcTimeString)
        let formattedPostDate = formatUpdatedDate(postDate);

        let parsedPost = parse(post.html);

        return (
          <div key={post.id} className="mt-5">
            <div className='site-section words-header'>
              <div className="entry-number bg-black text-white font-['Minion']">{post.title? post.title : 'Title'}</div>
              <div className="font-['Minion'] italic">On {formattedPostDate}, {post.primary_author.name} {'<' + post.custom_excerpt + '>'} wrote:</div>
            </div>
            <div className="site-section ml-2 words-body max-h-96 overflow-y-auto">
              <div className="pr-2 py-1 font-['Minion'] text-justify">{parsedPost}</div>
              <div className="pr-2 py-4">
                {post.feature_image && <Image
                  src={post.feature_image}
                  alt={"words-image"}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center"
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