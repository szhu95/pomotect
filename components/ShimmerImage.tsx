"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ShimmerImageProps extends Omit<ImageProps, 'onLoad'> {
  className?: string;
  shimmerClassName?: string;
  priority?: boolean;
}

export default function ShimmerImage({
  src,
  alt,
  className = '',
  shimmerClassName = '',
  priority = false,
  ...props
}: ShimmerImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure we're on the client side before using intersection observer
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  };

  useEffect(() => {
    // Skip intersection observer for priority images, if already in view, or during SSR
    if (priority || isInView || !isClient) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px' // Reduced margin for better mobile performance
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
  }, [src, priority, isInView, isClient]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isLoaded && (priority || isInView) && (
          <motion.div
            key="shimmer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-gray-100 animate-pulse ${shimmerClassName}`}
            style={{
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />
        )}
      </AnimatePresence>

      {(priority || isInView) && (
        <Image
          src={src}
          alt={alt}
          onLoad={handleLoad}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          {...props}
        />
      )}

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
