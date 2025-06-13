"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import RSVPLinkImg from '@/assets/images/rsvp-link.webp';

export default function RSVPLink() {
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      setIsShortScreen(window.innerHeight < 500);
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  return (
    <>
      {/* Floating RSVP link top right for md+ */}
      <div className="fixed top-4 right-4 z-50 hidden md:block">
        <Link 
          href="/rsvp" 
          className="block transition-all duration-300 ease-in-out hover:opacity-70"
          style={{ 
            pointerEvents: 'auto',
            transform: `translateX(${isShortScreen ? 'calc(-100vw + 8rem)' : '0'})`,
          }}
        >
          <img src={RSVPLinkImg.src} alt="RSVP" className="w-20 h-auto drop-shadow-lg" />
        </Link>
      </div>
      {/* RSVP link for mobile, below header, right-aligned */}
      <div className="block md:hidden w-full flex justify-end mt-2 mb-2 pr-4">
        <Link href="/rsvp" className="inline-block">
          <img src={RSVPLinkImg.src} alt="RSVP" className="w-20 h-auto drop-shadow-lg" />
        </Link>
      </div>
    </>
  );
} 