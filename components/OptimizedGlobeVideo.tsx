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
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Ensure we're on the client side before rendering video
  useEffect(() => {
    setIsClient(true);
    // Detect mobile devices
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase()) ||
        (window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    // Also check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fallback to GIF if video doesn't load within 2 seconds
  useEffect(() => {
    if (showOnMobile || !isClient || isMobile) return; // Skip timeout for mobile or SSR
    
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
  }, [isVideoLoaded, showOnMobile, isClient, isMobile]);

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

  // Helper function to render GIF - use regular img tag for animated GIFs to ensure they animate
  const renderGif = () => {
    // Use regular img tag for mobile or when animation must be preserved
    // Next.js Image component can pause GIF animations on some browsers
    if (!isClient || showOnMobile || isMobile) {
      return (
        <img
          src="/globe-animation.gif"
          alt="Globe Animation"
          width={width}
          height={height}
          className={className}
          style={{ display: 'block' }}
          loading="eager"
        />
      );
    }
    // For desktop, use Next.js Image component
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
  };

  // Always show GIF during SSR or for mobile
  if (!isClient || showOnMobile || isMobile) {
    return renderGif();
  }

  // Show fallback GIF if video failed to load or timeout reached
  if (showFallback || isVideoError) {
    return renderGif();
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
