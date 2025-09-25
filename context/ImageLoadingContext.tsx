"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface ImageLoadingContextType {
  isAllImagesLoaded: boolean;
  loadedImages: Set<string>;
  imagesToLoad: Set<string>;
  addImageToLoad: (src: string) => void;
  markImageAsLoaded: (src: string) => void;
  resetLoadingState: () => void;
}

const ImageLoadingContext = createContext<ImageLoadingContextType | undefined>(undefined);

export const useImageLoading = () => {
  const context = useContext(ImageLoadingContext);
  if (!context) {
    throw new Error('useImageLoading must be used within an ImageLoadingProvider');
  }
  return context;
};

interface ImageLoadingProviderProps {
  children: ReactNode;
}

export const ImageLoadingProvider: React.FC<ImageLoadingProviderProps> = ({ children }) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imagesToLoad, setImagesToLoad] = useState<Set<string>>(new Set());
  const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

  const addImageToLoad = useCallback((src: string) => {
    setImagesToLoad(prev => {
      if (prev.has(src)) return prev;
      return new Set([...prev, src]);
    });
  }, []);

  const markImageAsLoaded = useCallback((src: string) => {
    setLoadedImages(prev => {
      if (prev.has(src)) return prev;
      return new Set([...prev, src]);
    });
  }, []);

  const resetLoadingState = useCallback(() => {
    setLoadedImages(new Set());
    setImagesToLoad(new Set());
    setIsAllImagesLoaded(false);
  }, []);

  useEffect(() => {
    // Check if all images are loaded
    if (imagesToLoad.size > 0 && loadedImages.size === imagesToLoad.size) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsAllImagesLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadedImages.size, imagesToLoad.size]);

  return (
    <ImageLoadingContext.Provider
      value={{
        isAllImagesLoaded,
        loadedImages,
        imagesToLoad,
        addImageToLoad,
        markImageAsLoaded,
        resetLoadingState,
      }}
    >
      {children}
    </ImageLoadingContext.Provider>
  );
};
