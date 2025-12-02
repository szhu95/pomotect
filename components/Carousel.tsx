"use client"
import React, { useCallback, useState, useRef, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Image from "next/image";
import ZoomableImage from './ZoomableImage';
import localFont from 'next/font/local';

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});

const Carousel = (response: any) => {
    const initialSlide = response.initialSlide || 0;
    const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: initialSlide });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalZoom, setModalZoom] = useState(1);
    const [modalX, setModalX] = useState(0);
    const [modalY, setModalY] = useState(0);
    const [modalDragging, setModalDragging] = useState(false);
    const [modalStart, setModalStart] = useState<{x: number, y: number} | null>(null);
    const [modalImg, setModalImg] = useState<{src: string, alt: string} | null>(null);
    const modalImgRef = useRef<HTMLImageElement>(null);

    // Preload all carousel images
    useEffect(() => {
        if (response.images?.edges) {
            response.images.edges.forEach((item: any) => {
                if (item.node?.transformedSrc) {
                    // Create a new image element to preload
                    const img = new window.Image();
                    img.src = item.node.transformedSrc;
                }
            });
        }
    }, [response.images?.edges]);

    // Scroll to initial slide when it changes
    useEffect(() => {
        if (emblaApi && initialSlide !== undefined) {
            emblaApi.scrollTo(initialSlide, false);
        }
    }, [emblaApi, initialSlide]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);

    // Mouse events for modal
    const handleModalMouseDown = (e: React.MouseEvent) => {
        if (modalZoom === 1) return;
        setModalDragging(true);
        setModalStart({ x: e.clientX - modalX, y: e.clientY - modalY });
    };
    const handleModalMouseMove = (e: React.MouseEvent) => {
        if (!modalDragging || modalZoom === 1) return;
        setModalX(e.clientX - (modalStart?.x || 0));
        setModalY(e.clientY - (modalStart?.y || 0));
    };
    const handleModalMouseUp = () => {
        setModalDragging(false);
    };
    // Touch events for modal
    const handleModalTouchStart = (e: React.TouchEvent) => {
        if (modalZoom === 1) return;
        setModalDragging(true);
        const touch = e.touches[0];
        setModalStart({ x: touch.clientX - modalX, y: touch.clientY - modalY });
    };
    const handleModalTouchMove = (e: React.TouchEvent) => {
        if (!modalDragging || modalZoom === 1) return;
        const touch = e.touches[0];
        setModalX(touch.clientX - (modalStart?.x || 0));
        setModalY(touch.clientY - (modalStart?.y || 0));
    };
    const handleModalTouchEnd = () => {
        setModalDragging(false);
    };
    // Reset pan when closing or zooming out
    useEffect(() => {
        if (!modalOpen || modalZoom === 1) {
            setModalX(0);
            setModalY(0);
        }
    }, [modalOpen, modalZoom]);

    const openModal = (img: { src: string, alt: string }) => {
        setModalImg(img);
        setModalVisible(true);
        setTimeout(() => setModalOpen(true), 10); // allow for initial render
    };

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => {
            setModalVisible(false);
            setModalZoom(1); // Reset slider to 1 (minimum value)
        }, 300); // match transition duration
    };

    return (
        <div className="embla relative">
            <div className="embla__viewport pb-4" ref={emblaRef}>
                <div className="embla__container">
                    {response.images?.edges.map((item: any, i: React.Key | null | undefined) => {
                        return (
                            <div key={i} className="embla__slide flex items-center justify-center">
                                <ZoomableImage
                                    src={item.node?.transformedSrc}
                                    alt={"product image"}
                                    width={600}
                                    height={600}
                                    className="align-bottom m-auto"
                                    onClick={() => openModal({ src: item.node?.transformedSrc, alt: "product image" })}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="relative flex items-center justify-center w-full mt-2">
                <button className="embla__prev text-primary-blue absolute left-0 xl:left-4 z-10 ml-4 xl:ml-8" onClick={scrollPrev}>
                    ⇠
                </button>
                <button className="embla__next text-primary-blue absolute right-0 xl:right-4 z-10 mr-4 xl:mr-8" onClick={scrollNext}>
                    ⇢
                </button>
            </div>
            {modalVisible && modalImg && (
                <div className={`fixed inset-0 bg-white flex items-center justify-center z-50 modal-fade${modalOpen ? '' : ' modal-fade-exit'}`}>
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div
                            className="w-full h-full overflow-hidden flex items-center justify-center"
                            onMouseMove={handleModalMouseMove}
                            onMouseUp={handleModalMouseUp}
                            onMouseLeave={handleModalMouseUp}
                            onTouchMove={handleModalTouchMove}
                            onTouchEnd={handleModalTouchEnd}
                        >
                            <Image
                                ref={modalImgRef}
                                src={modalImg.src}
                                alt={modalImg.alt}
                                width={800}
                                height={800}
                                style={{
                                    transform: `scale(${modalZoom}) translate(${modalX / modalZoom}px, ${modalY / modalZoom}px)`,
                                    transition: modalDragging ? 'none' : 'transform 0.2s',
                                    cursor: modalZoom > 1 ? (modalDragging ? 'grabbing' : 'grab') : 'default',
                                }}
                                className="w-full h-full object-contain select-none"
                                draggable={false}
                                onMouseDown={handleModalMouseDown}
                                onTouchStart={handleModalTouchStart}
                            />
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[20rem] flex items-center justify-center">
                            <div className="relative w-full flex items-center justify-center">
                                <span className={`${pomotectFont.className} text-xl text-black select-none absolute -left-6 -bottom-6`} style={{ opacity: 0.75 }}>x</span>
                                {/* Crossfader cross */}
                                <span
                                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    zIndex: 10,
                                    pointerEvents: 'none'
                                  }}
                                >
                                  <span style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: 0,
                                    width: '2px',
                                    height: '16px',
                                    background: '#222',
                                    borderRadius: '1px',
                                    transform: 'translateX(-50%)'
                                  }} />
                                  <span style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    width: '16px',
                                    height: '2px',
                                    background: '#222',
                                    borderRadius: '1px',
                                    transform: 'translateY(-50%)'
                                  }} />
                                </span>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.01}
                                    value={modalZoom}
                                    onChange={e => setModalZoom(Number(e.target.value))}
                                    className="dj-mixer-slider flex-1 mx-4"
                                />
                                <span className={`${pomotectFont.className} text-xl text-black select-none absolute -right-6 -bottom-6`} style={{ opacity: 0.75 }}>y</span>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-black text-3xl bg-transparent border-none shadow-none p-0 m-0"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Carousel