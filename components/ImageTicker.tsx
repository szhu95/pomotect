"use client";
import React, { useState, useEffect, useRef } from 'react';
// import LoadingLink from "./LoadingLink";
import Link from "next/link";
import Image from "next/image";
import ShimmerImage from './ShimmerImage';

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

    // Optimized image loading handled by ShimmerImage component
    
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

    // Handle endless scroll for both mobile and desktop
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || posts.length === 0) return;

        // Initialize scroll position to the middle set for endless scroll
        const singleSetWidth = scrollContainer.scrollWidth / 3;
        scrollContainer.scrollLeft = singleSetWidth;

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
            const singleSetWidth = scrollWidth / 3; // Since we have 3 sets of posts
            
            // Enable left button when user scrolls past the initial position
            if (scrollLeft > singleSetWidth * 0.3) {
                setCanScrollLeft(true);
            }
            
            // If we're near the end of the third set, jump to the beginning of the second set
            if (scrollLeft >= singleSetWidth * 2.2) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
            // If we're near the beginning of the first set, jump to the beginning of the second set
            else if (scrollLeft <= singleSetWidth * 0.2) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
        };

        // Use passive listener for better performance
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, [posts.length]);



    // Get all posts for horizontal scrolling with endless loop
    const getAllPosts = () => {
        // Duplicate the posts array to create seamless endless scroll
        return [...posts, ...posts, ...posts];
    };

    // Scroll state
    const [isScrollingLeft, setIsScrollingLeft] = useState(false);
    const [isScrollingRight, setIsScrollingRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Scroll functions with improved performance
    const startScrollLeft = () => {
        setIsScrollingLeft(true);
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const scrollAmount = isMobile ? 100 : 140;
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            
            // Continue scrolling while held with faster interval
            scrollIntervalRef.current = setInterval(() => {
                if (scrollContainer) {
                    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }, 150);
        }
    };

    const startScrollRight = () => {
        setIsScrollingRight(true);
        setCanScrollLeft(true); // Enable left button when right is used
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const scrollAmount = isMobile ? 100 : 140;
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            
            // Continue scrolling while held with faster interval
            scrollIntervalRef.current = setInterval(() => {
                if (scrollContainer) {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 150);
        }
    };

    const stopScroll = () => {
        setIsScrollingLeft(false);
        setIsScrollingRight(false);
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
    };

    // Handle touch events for better mobile scrolling
    const handleTouchStart = (e: React.TouchEvent) => {
        // Prevent default touch behavior that might interfere with scrolling
        e.stopPropagation();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        // Allow natural touch scrolling
        e.stopPropagation();
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, []);

    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Horizontal Scroll Container */}
            <div 
                ref={scrollContainerRef} 
                className="w-full overflow-x-auto pt-6 hide-scrollbar"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none', /* IE and Edge */
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch' /* iOS momentum scrolling */
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div 
                    className="flex gap-4 px-4 md:px-0" 
                    style={{ 
                        minWidth: 'max-content',
                        scrollSnapType: 'x mandatory'
                    }}
                >
                    {getAllPosts().map((post, idx) => (
                        <Link
                            key={`${post.slug}-${idx}`}
                            href={`/words/${post.slug}`}
                            className={`relative cursor-pointer overflow-hidden shadow-lg bg-gray-50 rounded-lg flex-shrink-0 ${
                                isMobile 
                                    ? 'select-none' 
                                    : 'group transition-all duration-300 hover:scale-105 hover:rounded-none'
                            }`}
                            style={{ 
                                width: isMobile ? 112 : 150,
                                height: isMobile ? 112 : 150,
                                aspectRatio: '1 / 1',
                                WebkitTapHighlightColor: isMobile ? 'transparent' : undefined,
                                scrollSnapAlign: 'start'
                            }}
                        >
                            <ShimmerImage
                                src={post.feature_image}
                                alt={`pomo-text ${post.slug}`}
                                width={isMobile ? 112 : 150}
                                height={isMobile ? 112 : 150}
                                className="object-cover w-full h-full bg-gray-50"
                                sizes={isMobile ? "112px" : "150px"}
                                priority={idx < (isMobile ? 1 : 3)} // Only first image priority on mobile
                            />
                            {/* Title overlay */}
                            <div className={`absolute bottom-0 left-0 w-full text-white text-sm minion-font px-2 py-1 text-center break-words leading-tight ${
                                isMobile 
                                    ? 'bg-black/30 opacity-100' 
                                    : 'bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            }`}>
                                {post.title.length > 50 ? 
                                    `${post.title.substring(0, 50)}...` : 
                                    post.title
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows Underneath - min 48px tap targets for accessibility */}
            <div className="relative w-full flex justify-between items-center py-2">
                {/* Left Arrow */}
                <button
                    onMouseDown={canScrollLeft ? startScrollLeft : undefined}
                    onMouseUp={canScrollLeft ? stopScroll : undefined}
                    onMouseLeave={canScrollLeft ? stopScroll : undefined}
                    onTouchStart={canScrollLeft ? startScrollLeft : undefined}
                    onTouchEnd={canScrollLeft ? stopScroll : undefined}
                    onTouchCancel={canScrollLeft ? stopScroll : undefined}
                    disabled={!canScrollLeft}
                    className={`flex items-center justify-center min-h-[48px] min-w-[48px] md:min-h-0 md:min-w-0 md:h-8 ${
                        isMobile 
                            ? 'select-none' 
                            : 'transition-all duration-300'
                    } ${
                        canScrollLeft 
                            ? isMobile 
                                ? 'opacity-100 cursor-pointer' 
                                : 'opacity-100 hover:opacity-70 cursor-pointer'
                            : 'opacity-0 pointer-events-none'
                    }`}
                    style={{
                        WebkitTapHighlightColor: isMobile ? 'transparent' : undefined,
                    }}
                    aria-label="Scroll left"
                >
                    <svg width="20" height="20" fill="none" stroke="#0000FF" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 19l-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                {/* Right Arrow */}
                <button
                    onMouseDown={startScrollRight}
                    onMouseUp={stopScroll}
                    onMouseLeave={stopScroll}
                    onTouchStart={startScrollRight}
                    onTouchEnd={stopScroll}
                    onTouchCancel={stopScroll}
                    className={`flex items-center justify-center min-h-[48px] min-w-[48px] md:min-h-0 md:min-w-0 md:h-8 ${
                        isMobile 
                            ? 'select-none' 
                            : 'transition-colors duration-200 hover:opacity-70'
                    }`}
                    style={{
                        WebkitTapHighlightColor: isMobile ? 'transparent' : undefined,
                    }}
                    aria-label="Scroll right"
                >
                    <svg width="20" height="20" fill="none" stroke="#0000FF" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 5l7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}