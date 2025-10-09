"use client";
import React from 'react';
import { ImageLoadingProvider } from '@/context/ImageLoadingContext';
import { CartProvider } from '@/context/CartContext';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import SplashScreen from '@/components/SplashScreen';
import CookieConsent from '@/components/CookieConsent';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ImageLoadingProvider>
      <ScrollToTopOnMount />
      <SplashScreen />
      <CartProvider>
        {children}
      </CartProvider>
      <CookieConsent />
    </ImageLoadingProvider>
  );
}
