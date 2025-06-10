"use client";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});

interface Post {
    slug: string;
    title: string;
    feature_image: string;
}

export default function ProcessSidebar({ posts }: { posts: Post[] }) {
    const pathname = usePathname();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isCondensed, setIsCondensed] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);

            // Fade in effect between 100px and 300px scroll
            const newOpacity = Math.min(1, Math.max(0, (position - 100) / 200));
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set initial opacity
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate top position based on scroll
    const topPosition = scrollPosition > 200
        ? '50%' // Center vertically when scrolled
        : '300px'; // Initial position below header

    const transform = scrollPosition > 200
        ? 'translateY(-50%)' // Center adjustment when scrolled
        : 'none';

    return (
        <div
            className="hidden md:block fixed h-[500px] overflow-hidden w-[240px] max-[1130px]:w-[200px] max-[890px]:w-[180px] max-[1130px]:right-4 max-[890px]:right-2 right-8"
            style={{
                top: topPosition,
                transform: transform,
                opacity: opacity,
                transition: 'top 0.3s ease, transform 0.3s ease, opacity 0.3s ease-in-out'
            }}
        >
            <div className="h-full flex flex-col border-2 border-primary-blue border-dashed bg-white">
                <div className={`text-sm p-2 text-white bg-primary-blue border-2 border-primary-blue -m-[2px] flex justify-between items-center`}>
                    <span className={`${pomotectFont.className} text-white italic tracking-wide`}>[Index]</span>
                    <button
                        onClick={() => setIsCondensed(!isCondensed)}
                        className="hover:opacity-80 transition-opacity duration-300"
                        title={isCondensed ? "Show full view" : "Show condensed view"}
                    >
                        <ChevronUpDownIcon
                            className={`h-4 w-4 transform transition-transform duration-300 stroke-white ${isCondensed ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 pt-2">
                    {posts.map((post, index) => (
                        <div key={post.slug} className="group">
                            <Link
                                href={`/products/process/${post.slug}`}
                                className="block mb-2 transition-all duration-200 ease-in-out"
                            >
                                <div
                                    className={`
                                        relative w-full mb-2 overflow-hidden transition-[height,margin] duration-300 ease-in-out
                                        ${isCondensed ? 'h-0 mb-0' : 'h-24'}
                                    `}
                                >
                                    {post.feature_image && (
                                        <div className="absolute inset-0 border border-primary-blue border-dashed">
                                            <div
                                                className={`
                                                    absolute inset-0 transform origin-center
                                                    transition-all duration-300 ease-in
                                                    ${isCondensed ? 'scale-y-[0.01] opacity-0' : 'scale-y-100 opacity-100'}
                                                `}
                                            >
                                                <Image
                                                    src={post.feature_image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`minion-font text-sm transition-colors duration-200 ease-in-out ${
                                    pathname === `/products/process/${post.slug}` ? 'text-primary-blue' : ''
                                } group-hover:text-primary-blue ${isCondensed ? 'py-1' : ''}`}>
                                    {post.title}
                                </div>
                            </Link>
                            {index < posts.length - 1 && (
                                <div className="w-1/2 mx-auto mb-3 border-b border-primary-blue border-dashed opacity-50 group-hover:opacity-100 transition-all duration-200 ease-in-out"></div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
} 