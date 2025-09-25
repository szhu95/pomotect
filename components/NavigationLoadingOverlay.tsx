"use client";
import React from 'react';
import { useNavigation } from '@/context/NavigationContext';

export default function NavigationLoadingOverlay() {
  const { isLoading } = useNavigation();
  
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        width={300}
        height={300}
        className="w-[300px] h-[300px]"
        style={{
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <source src="/globe-animation.webm" type="video/webm" />
        <source src="/globe-animation.mp4" type="video/mp4" />
        <img src="/globe-animation.gif" alt="Loading..." className="w-[300px] h-[300px]" />
      </video>
    </div>
  );
}
