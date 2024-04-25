import React from 'react'
import Marquee from "react-fast-marquee";
import Link from "next/link";


export default async function ImageTicker({ response }: any) {

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

                        <div className="group ticker-img-container">
                            <div className='hidden minion-font text-sm z-40 group-hover:inline-block absolute p-2 w-[150px]'>{post.title}</div>
                            <img
                                src={post.feature_image}
                                alt={"pomo-text " + post.slug}
                                width="150"
                                height="150"
                                className='group-hover:opacity-[50%] p-1'
                            />
                        </div>
                    </Link>
                )
            })}
        </Marquee>
    )
}