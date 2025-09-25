"use client";
import { formatDate } from '@/utils';
import Link from 'next/link';
import React, { useState } from 'react'
import WinstonFlyer from '../../../assets/images/flyer-1.webp'
import FlashFlyer from '../../../assets/images/flash-flyer.webp'
import CellarFlyer from '../../../assets/images/cellar.webp'
import MillionGoodsFlyer from '../../../assets/images/million-goods.webp'
import CellarFlyer2 from '../../../assets/images/cellar-2.webp'
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ShimmerImage from '@/components/ShimmerImage';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
    src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../../fonts/pomotect-analog-regular.otf',
});

const Events = () => {
    let lastUpdatedDate = formatDate();

    // Event data with flyer images
    const events = [
        {
            id: 1,
            title: "Coast To Coast",
            location: "Cellar 36, New York",
            flyer: CellarFlyer2,
            alt: "Coast To Coast Flyer"
        },
        {
            id: 2,
            title: "Million Goods Showcase",
            location: "Million Goods, New York",
            flyer: MillionGoodsFlyer,
            alt: "Million Goods Flyer"
        },
        {
            id: 3,
            title: "Wine & Wax",
            location: "Cellar 36, New York",
            flyer: CellarFlyer,
            alt: "Wine & Wax Flyer"
        },
        {
            id: 4,
            title: "Flash Nightclub",
            location: "Flash, Washington D.C.",
            flyer: FlashFlyer,
            alt: "Flash Nightclub Flyer"
        },
        {
            id: 5,
            title: "Out of the Blue",
            location: "Winston House, Los Angeles",
            flyer: WinstonFlyer,
            alt: "Winston House Flyer"
        }
    ];

    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

    return (
        <div>
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header`}>Sounds</h3>
                <p className={`${pomotectFont.className} italic`}>Most recently updated on June 27, 2025</p>
            </div>
            <div className="site-section flex justify-center items-center gap-16 -ml-6">
                <Link href="/sounds" scroll={false} className={`${pomotectFont.className} objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white`}>Mixes</Link>
                <Link href="/sounds/sets" scroll={false} className={`${pomotectFont.className} objects_link bg-black text-white hover:bg-black hover:text-white`}>Sets</Link>
            </div>

            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Mobile: Simple list view */}
                <div className="md:hidden w-full">
                    <div className="space-y-8">
                        {events.map((event) => (
                            <div key={event.id} className="border-b border-primary-blue pb-6">
                                <div className="soundcloud_title text-center mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="font-['Minion'] text-white text-sm">
                                            {event.title}
                                        </div>
                                        <div className="text-white italic font-['Minion'] text-sm">
                                        {event.location}
                                    </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <ShimmerImage
                                        width={300}
                                        height={300}
                                        src={event.flyer}
                                        alt={event.alt}
                                        className="mx-auto shadow-lg max-w-full h-auto"
                                        priority={event.id === 1} // Only priority for first image on mobile
                                        sizes="(max-width: 768px) 300px, 400px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: Hover functionality */}
                <div className="hidden md:flex w-full md:flex-row min-h-screen">
                    {/* Left Sidebar */}
                    <div
                        className="w-full md:w-1/3 pr-0 md:pr-8 mb-8 md:mb-0"
                        style={{ cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'%230000ff\' stroke=\'none\'><rect x=\'3\' y=\'11\' width=\'16\' height=\'2\' fill=\'%230066cc\'/><path d=\'m12 5 7 7-7 7\'/></svg>") 12 12, auto' }}
                    >
                        <div className="space-y-1">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="border-b border-primary-blue pb-1 transition-all duration-300 hover:bg-blue-50 -m-2 cursor-pointer"
                                    style={{ cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'%230000ff\' stroke=\'none\'><rect x=\'3\' y=\'11\' width=\'16\' height=\'2\' fill=\'%230066cc\'/><path d=\'m12 5 7 7-7 7\'/></svg>") 12 12, auto' }}
                                    onMouseEnter={() => setHoveredEvent(event.id)}
                                >
                                    <div className="text-right">
                                        <div className="soundcloud_title font-['Minion'] text-lg">
                                            {event.title}
                                        </div>
                                        <div className="text-primary-blue italic font-['Minion'] text-sm mt-1">
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="w-full md:w-2/3 pl-0 md:pl-8 flex items-center justify-center sticky top-8 h-screen md:bg-gray-100">
                        <motion.div
                            key={hoveredEvent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredEvent ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="text-center w-full"
                        >
                            {hoveredEvent ? (
                                <div className="relative">
                                    {(() => {
                                        const event = events.find(e => e.id === hoveredEvent);
                                        if (!event) return null;

                                        return (
                                            <>
                                                <ShimmerImage
                                                    width={500}
                                                    height={500}
                                                    src={event.flyer}
                                                    alt={event.alt}
                                                    className="mx-auto shadow-lg max-w-full h-auto"
                                                    priority={false} // No priority on desktop since images load on hover
                                                    sizes="(min-width: 768px) 500px, 300px"
                                                />
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div className="text-gray-400 italic font-['Minion'] text-lg">
                                    Loading...
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div>
    )
}

export default Events