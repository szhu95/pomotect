import React from 'react'
import Marquee from "react-fast-marquee";
import LoadingLink from "./LoadingLink";

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
                    <LoadingLink
                        key={post.slug}
                        href={`/words/${post.slug}`}>
                        <div className="ticker-words-container minion-font hover:opacity-[50%] bg-primary-blue text-white px-1">
                            {" [" + post.title + "] "}
                        </div>
                    </LoadingLink>
                )
            })}

            {objectsResponse.products.edges.map((item: any) => {

                let product = item.node;

                return (
                    <LoadingLink
                        key={"object-1" + product.handle}
                        href={`/products/` + product.handle}>
                        <div className="ticker-words-container minion-font hover:opacity-[50%] bg-primary-blue text-white px-1">{product.title}</div>
                    </LoadingLink>
                )
            })}
        </Marquee>
    )
}