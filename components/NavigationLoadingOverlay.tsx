"use client";
import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import OptimizedGlobeVideo from './OptimizedGlobeVideo';

export default function NavigationLoadingOverlay() {
  const { isLoading } = useNavigation();
  
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <OptimizedGlobeVideo />
    </div>
  );
}
