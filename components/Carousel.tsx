"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Image from "next/image";

const Carousel = (response: any) => {

    const [emblaRef, emblaApi] = useEmblaCarousel();

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
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
                <div className="text-center">
                    <button className="embla__prev text-primary-blue" onClick={scrollPrev}>
                        ⇠
                    </button>
                    <button className="ml-[90%] embla__next text-primary-blue" onClick={scrollNext}>
                        ⇢
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Carousel