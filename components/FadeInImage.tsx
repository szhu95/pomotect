"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageLoading } from '@/context/ImageLoadingContext';

interface FadeInImageProps extends Omit<ImageProps, 'onLoad'> {
  className?: string;
  fadeDuration?: number;
  delay?: number;
  priority?: boolean;
}

export default function FadeInImage({
  src,
  alt,
  className = '',
  fadeDuration = 0.6,
  delay = 0,
  priority = false,
  ...props
}: FadeInImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Start as visible if priority
  const { addImageToLoad, markImageAsLoaded } = useImageLoading();
  const containerRef = useRef<HTMLDivElement>(null);

  // Add image to loading context when component mounts
  useEffect(() => {
    if (typeof src === 'string') {
      addImageToLoad(src);
    }
  }, [src, addImageToLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (typeof src === 'string') {
      markImageAsLoaded(src);
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  };

  useEffect(() => {
    // Skip intersection observer for priority images or if already in view
    if (priority || isInView) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [src, priority, isInView]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-100 animate-pulse"
            style={{
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoaded && isInView ? 1 : 0,
          y: isLoaded && isInView ? 0 : 20
        }}
        transition={{
          duration: fadeDuration,
          delay: delay,
          ease: "easeOut"
        }}
        className="relative"
      >
        <Image
          src={src}
          alt={alt}
          onLoad={handleLoad}
          priority={priority}
          {...props}
        />
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
