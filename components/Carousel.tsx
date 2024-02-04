"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Image from "next/image";

const Carousel = (response: any) => {

    let carouselImages = response.images.edges;
    const [emblaRef] = useEmblaCarousel()

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {response.images?.edges.map((item: any, i: React.Key | null | undefined) => {
                    return (
                        <div key={i} className="embla__slide">
                            <Image
                                src={item.node?.transformedSrc}
                                alt={"product image"}
                                width="600"
                                height="800"
                                className="float-right"
                            />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

}

export default Carousel