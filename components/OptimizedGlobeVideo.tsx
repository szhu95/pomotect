"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedGlobeVideoProps {
  className?: string;
  width?: number;
  height?: number;
  showOnMobile?: boolean;
}

export default function OptimizedGlobeVideo({ 
  className = "w-[300px] h-[300px]", 
  width = 300, 
  height = 300,
  showOnMobile = false 
}: OptimizedGlobeVideoProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Fallback to GIF if video doesn't load within 2 seconds
  useEffect(() => {
    if (showOnMobile) return; // Skip timeout for mobile (uses GIF directly)
    
    timeoutRef.current = setTimeout(() => {
      if (!isVideoLoaded) {
        setShowFallback(true);
        setIsVideoError(true);
      }
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVideoLoaded, showOnMobile]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleVideoError = () => {
    setIsVideoError(true);
    setShowFallback(true);
  };

  // For mobile, always show GIF
  if (showOnMobile) {
    return (
      <Image
        src="/globe-animation.gif"
        alt="Globe Animation"
        width={width}
        height={height}
        className={className}
        priority
        unoptimized // GIF files don't need Next.js optimization
      />
    );
  }

  // Show fallback GIF if video failed to load or timeout reached
  if (showFallback || isVideoError) {
    return (
      <Image
        src="/globe-animation.gif"
        alt="Globe Animation"
        width={width}
        height={height}
        className={className}
        priority
        unoptimized
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      width={width}
      height={height}
      className={className}
      onLoadedData={handleVideoLoad}
      onError={handleVideoError}
      preload="auto" // Aggressive preloading for faster startup
      style={{
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Prioritize WebM (smallest file size) */}
      <source src="/globe-animation.webm" type="video/webm" />
      <source src="/globe-animation.mp4" type="video/mp4" />
      {/* Fallback image */}
      <img src="/globe-animation.gif" alt="Globe Animation" />
    </video>
  );
}
