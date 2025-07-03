"use client";
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import Image from 'next/image';
import globeAnimation from '../assets/images/globe-animation.gif';

export default function GlobeOverlay() {
  const { loading } = useLoading();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (loading) {
      setShouldRender(true);
    } else if (shouldRender) {
      // Wait for fadeout before unmounting
      const timeout = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [loading, shouldRender]);

  return shouldRender ? (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-80 md:hidden transition-opacity duration-400`}
      style={{ opacity: loading ? 1 : 0 }}
    >
      <Image src={globeAnimation} alt="Loading..." width={220} height={220} className="animate-spin-slow" />
    </div>
  ) : null;
} 