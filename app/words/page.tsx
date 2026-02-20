"use client";
import React, { useEffect, useState } from 'react';
import { formatUpdatedDate, getPosts } from '@/utils';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Posts } from '@/components';
import WordsSidebar from '@/components/WordsSidebar';
import MobileViewToggle from '@/components/MobileViewToggle';
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
  src: '../../fonts/pomotect-analog-bold.otf',
  display: 'swap',
});

const pomotectFont = localFont({
  src: '../../fonts/pomotect-analog-regular.otf',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export default function Words() {
  const [posts, setPosts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts(50, true);
        
        if (!postsData || !postsData.posts) {
          console.error('Failed to fetch posts or posts data is invalid');
          setError(true);
          setLoading(false);
          return;
        }
        
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!loading && (error || !posts)) {
    return (
      <div className="relative">
        <div className="site-section">
          <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
          <p className="italic text-red-500">Unable to load posts at this time. Please try again later.</p>
        </div>
      </div>
    );
  }

  const response = posts?.posts?.filter((post: any) => post.primary_tag?.name !== "Process") ?? [];

  const utcTimeString = response.length > 0 ? response[0].published_at : '2024-01-01T00:00:00.000Z';
  const date = new Date(utcTimeString);
  const formattedDate = formatUpdatedDate(date);

  return (
    <div className="relative">
      <div className="site-section">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className={`${pomotectBoldFont.className} main_header`}>Words</h3>
            <MobileViewToggle />
          </div>
          <p className={`${pomotectFont.className} italic`}>Most recently updated on {formattedDate}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-[65%] md:px-4">
          <Posts response={response} containerHeight={"max-h-[85vh]"} />
        </div>
      </div>

      <WordsSidebar posts={response} />
      
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}
