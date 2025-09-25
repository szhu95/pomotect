import React from 'react'
import Marquee from "react-fast-marquee";
// import LoadingLink from "./LoadingLink";
import Link from "next/link";

export default function WordsTicker({ response, objectsResponse }: any) {

    return (
        <Marquee
            pauseOnHover={true}
            pauseOnClick={true}
            speed={55}
            className="relative mt-[200px]"
        >
            {response.posts.filter((post: any) => post.primary_tag?.name !== "Process").map((post: any) => {
                return (
                    <Link
                        key={post.slug}
                        href={`/words/${post.slug}`}>
                        <div className="ticker-words-container minion-font hover:opacity-[50%] bg-primary-blue text-white px-1">
                            {" [" + post.title + "] "}
                        </div>
                    </Link>
                )
            })}

            {objectsResponse.products.edges.map((item: any) => {

                let product = item.node;

                return (
                    <Link
                        key={"object-1" + product.handle}
                        href={`/products/` + product.handle}>
                        <div className="ticker-words-container minion-font hover:opacity-[50%] bg-primary-blue text-white px-1">{product.title}</div>
                    </Link>
                )
            })}
        </Marquee>
    )
}