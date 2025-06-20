import React from 'react'
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Image from "next/image";


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
                        href={`/words/${post.slug}`}>

                        <div className="group ticker-img-container">
                            <div className='hidden minion-font z-40 group-hover:inline-block group-hover:font-semibold absolute ml-2 mt-1 w-[140px]'>{post.title}</div>
                            <Image
                                src={post.feature_image}
                                alt={"pomo-text " + post.slug}
                                width={150}
                                height={150}
                                className="group-hover:opacity-[50%] p-1"
                            />
                        </div>
                    </Link>
                )
            })}
        </Marquee>
    )
}