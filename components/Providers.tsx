"use client";
import React from 'react';
import { NavigationProvider } from '@/context/NavigationContext';
import { ImageLoadingProvider } from '@/context/ImageLoadingContext';
import { CartProvider } from '@/context/CartContext';
import NavigationLoadingOverlay from '@/components/NavigationLoadingOverlay';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import SplashScreen from '@/components/SplashScreen';
import CookieConsent from '@/components/CookieConsent';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NavigationProvider>
      {/* <NavigationLoadingOverlay /> */}
      <ImageLoadingProvider>
        <ScrollToTopOnMount />
        <SplashScreen />
        <CartProvider>
          {children}
        </CartProvider>
      </ImageLoadingProvider>
      <CookieConsent />
    </NavigationProvider>
  );
}
