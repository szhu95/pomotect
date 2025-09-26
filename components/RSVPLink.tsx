"use client";
import React from 'react';
import Link from 'next/link';
import RSVPLinkImg from '@/assets/images/rsvp-link.webp';

export default function RSVPLink() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link 
        href="/rsvp" 
        className="block transition-transform hover:scale-110 duration-200"
      >
        <img src={RSVPLinkImg.src} alt="RSVP" className="w-20 h-auto drop-shadow-lg" />
      </Link>
    </div>
  );
}

// Mobile version
export function MobileRSVPLink() {
  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <Link 
        href="/rsvp" 
        className="block transition-transform hover:scale-110 duration-200"
      >
        <img src={RSVPLinkImg.src} alt="RSVP" className="w-20 h-auto drop-shadow-lg" />
      </Link>
    </div>
  );
}
