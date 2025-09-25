"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTopOnMount() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure page starts at top on mount
    window.scrollTo(0, 0);
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
