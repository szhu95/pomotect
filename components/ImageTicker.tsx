"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";

interface Post {
    slug: string;
    title: string;
    feature_image: string;
    excerpt?: string;
    published_at?: string;
}

interface ImageTickerProps {
    response: {
        posts: Post[];
    };
}

export default function ImageTicker({ response }: ImageTickerProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [screenSize, setScreenSize] = useState<'mobile' | 'desktop' | 'xl'>('desktop');
    const posts = response.posts || [];
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // Responsive visible count
    const getVisibleCount = () => {
        if (isMobile) return 3;
        if (screenSize === 'xl') return 8;
        return 6; // desktop
    };
    const visibleCount = getVisibleCount();

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768); // md breakpoint
            if (width >= 1280) { // xl breakpoint
                setScreenSize('xl');
            } else if (width >= 768) {
                setScreenSize('desktop');
            } else {
                setScreenSize('mobile');
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Handle endless scroll
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
            const singleSetWidth = scrollWidth / 3; // Since we have 3 sets of posts
            
            // If we're near the end of the second set, jump to the beginning of the second set
            if (scrollLeft >= singleSetWidth * 2) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
            // If we're near the beginning of the first set, jump to the beginning of the second set
            else if (scrollLeft <= singleSetWidth * 0.1) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);



    // Get all posts for horizontal scrolling with endless loop
    const getAllPosts = () => {
        // Duplicate the posts array to create seamless endless scroll
        return [...posts, ...posts, ...posts];
    };

    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Horizontal Scroll Container */}
            <div 
                ref={scrollContainerRef} 
                className="w-full overflow-x-auto py-6 hide-scrollbar"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none' /* IE and Edge */
                }}
            >
                <div className="flex gap-4 px-4 md:px-0" style={{ minWidth: 'max-content' }}>
                    {getAllPosts().map((post, idx) => (
                        <Link
                            key={`${post.slug}-${idx}`}
                            href={`/words/${post.slug}`}
                            className="relative group cursor-pointer overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 bg-gray-50 rounded-lg hover:rounded-none flex-shrink-0"
                            style={{ 
                                width: isMobile ? 112 : 150,
                                height: isMobile ? 112 : 150,
                                aspectRatio: '1 / 1',
                            }}
                        >
                            <Image
                                src={post.feature_image}
                                alt={`pomo-text ${post.slug}`}
                                width={isMobile ? 112 : 150}
                                height={isMobile ? 112 : 150}
                                className="object-cover w-full h-full bg-gray-50"
                                loading="lazy"
                                sizes={isMobile ? "112px" : "150px"}
                                quality={85}
                                placeholder="empty"
                            />
                            {/* Title overlay */}
                            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm minion-font px-2 py-1 text-center break-words opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                                {post.title.length > 50 ? 
                                    `${post.title.substring(0, 50)}...` : 
                                    post.title
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}