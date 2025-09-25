"use client";
import { useEffect, useRef } from 'react';
import { useImageLoading } from '@/context/ImageLoadingContext';

export const useImagePreloader = (imageSrc: string) => {
  const { addImageToLoad, markImageAsLoaded } = useImageLoading();
  const hasAddedToQueue = useRef(false);

  useEffect(() => {
    if (!imageSrc || hasAddedToQueue.current) return;

    // Add this image to the loading queue only once
    addImageToLoad(imageSrc);
    hasAddedToQueue.current = true;

    // Create a new image element to preload
    const img = new Image();
    
    const handleLoad = () => {
      markImageAsLoaded(imageSrc);
    };

    const handleError = () => {
      // Even if image fails to load, mark it as "loaded" to not block the app
      markImageAsLoaded(imageSrc);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = imageSrc;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]); // Removed the functions from dependencies
};
