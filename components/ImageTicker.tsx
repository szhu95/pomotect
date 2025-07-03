"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useInterval } from 'usehooks-ts';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [isMobile, setIsMobile] = useState(false);
    const [isMedium, setIsMedium] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const posts = response.posts || [];
    
    // Responsive visible count
    const visibleCount = isMobile ? 3 : isMedium ? 5 : 7; // Show 3 on mobile, 5 on md, 7 on desktop

    // Auto-rotation interval (paused on hover)
    useInterval(() => {
        if (!isHovered) {
            setDirection('right');
            setCurrentIndex((prev) => (prev + visibleCount) % posts.length);
        }
    }, isHovered ? null : 5000); // Pause when hovered, resume every 5 seconds when not hovered

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768); // md breakpoint
            setIsMedium(width >= 768 && width < 1024); // lg breakpoint
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleArrow = (dir: 'left' | 'right') => {
        setDirection(dir);
        setCurrentIndex((prev) =>
            dir === 'right'
                ? (prev + visibleCount) % posts.length
                : (prev - visibleCount + posts.length) % posts.length
        );
    };

    // Get visible images
    const getVisiblePosts = () => {
        const arr = [];
        for (let i = 0; i < visibleCount; i++) {
            arr.push(posts[(currentIndex + i) % posts.length]);
        }
        return arr;
    };

    return (
        <div 
            className="relative w-full flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => {
                // Add a delay before resuming to allow for tap interactions
                setTimeout(() => setIsHovered(false), 2000);
            }}
        >
            {/* Carousel */}
            <div className="w-full flex items-center justify-between py-6 px-4 md:px-0">
                {/* Left Arrow */}
                <button
                    onClick={() => handleArrow('left')}
                    className="transition-colors duration-200"
                    aria-label="Previous"
                >
                    <svg width="20" height="20" fill="none" stroke="#0000FF" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
                
                {/* Images Container */}
                <div className="overflow-hidden flex-1 mx-4">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentIndex}
                            className="flex gap-2 md:gap-4 w-full justify-center"
                            initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {getVisiblePosts().map((post, idx) => (
                                <Link
                                    key={`${post.slug}-${currentIndex}`}
                                    href={`/words/${post.slug}`}
                                    className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:rounded-none bg-gray-50"
                                    style={{ 
                                        width: isMobile ? 100 : 150, 
                                        height: isMobile ? 100 : 150 
                                    }}
                                >
                                    <Image
                                        src={post.feature_image}
                                        alt={`pomo-text ${post.slug}`}
                                        width={isMobile ? 100 : 150}
                                        height={isMobile ? 100 : 150}
                                        className="object-cover w-full h-full bg-gray-50"
                                        loading="lazy"
                                        sizes={isMobile ? "100px" : "150px"}
                                        quality={85}
                                        placeholder="empty"
                                    />
                                    {/* Title overlay - always visible on mobile, hover on desktop */}
                                    <div className="absolute bottom-0 left-0 w-full bg-black/30 md:bg-black/50 text-white text-[8px] md:text-xs minion-font px-1 md:px-2 py-0.5 md:py-1 text-center break-words opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 leading-tight md:leading-normal">
                                        {post.title.length > 50 && isMobile ? 
                                            `${post.title.substring(0, 50)}...` : 
                                            post.title
                                        }
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                {/* Right Arrow */}
                <button
                    onClick={() => handleArrow('right')}
                    className="transition-colors duration-200"
                    aria-label="Next"
                >
                    <svg width="20" height="20" fill="none" stroke="#0000FF" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}