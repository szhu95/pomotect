import { Hero, WordsTicker } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPosts } from '@/utils';

export default async function Home() {

  // async function getData() {
  //   const posts = await getPosts()

  //   if (!posts) {
  //     return {
  //       notFound: true,
  //     }
  //   }

  //   return {
  //     posts
  //   }
  // }

  // const data = await getData();

  // let response = data.posts

  return (
    <main>
      {/* <WordsTicker response={response}/> */}
      <Hero />
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </main>
  )
}
