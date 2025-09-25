"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/context/NavigationContext';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function LoadingLink({ 
  href, 
  children, 
  className, 
  scroll = true,
  onClick,
  style
}: LoadingLinkProps) {
  const router = useRouter();
  const { setLoading } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Set loading state
    setLoading(true);

    // Navigate to the new page
    router.push(href);

    // Clear loading state after a short delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Link 
      href={href} 
      className={className}
      style={style}
      scroll={scroll}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
