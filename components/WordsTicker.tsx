import React from 'react'
import Marquee from "react-fast-marquee";
import Link from "next/link";


export default async function WordsTicker({ response }: any) {

    return (
        <Marquee
            pauseOnHover={true}
            pauseOnClick={true}
            className="relative"
            style={{ marginTop: 10 }}>

            {response.posts.map((post: any) => {
                return (
                    <Link
                        key={post.slug}
                        href={`words/${post.slug}`}>
                        <img
                            src={post.feature_image}
                            alt={"pomo-text " + post.slug}
                            width="150"
                            className='hover:opacity-[50%] p-1'
                        />
                    </Link>
                )
            })}
        </Marquee>
    )
}