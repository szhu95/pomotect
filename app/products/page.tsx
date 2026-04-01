import type { Metadata } from 'next';
import { Shop } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getCachedObjectsCollectionProducts } from '@/lib/shopifyObjectsCollection';
import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';

export const revalidate = 300;

const objectsTitle = 'Objects | postmodern tectonics';
const objectsMetaDescription =
  'Shop limited design objects from postmodern tectonics—vinyl slipmats, trays, apparel, and listening goods. Curated pieces for home and the turntable.';

export const metadata: Metadata = {
  title: objectsTitle,
  description: objectsMetaDescription,
  openGraph: {
    title: objectsTitle,
    description: objectsMetaDescription,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: objectsTitle,
    description: objectsMetaDescription,
  },
};

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});

export default async function Page() {
  const response = await getCachedObjectsCollectionProducts().catch(() => ({
    products: { edges: [] },
  }));
  const currentDate = formatDate();

  return (
    <div>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {currentDate}</p>
      </div>
      <div className="site-section flex justify-center items-center gap-16 -ml-6">
        <span className={`${pomotectFont.className} objects_link bg-black text-white`}>For Sale</span>
        <Link href="/products/process" className={`${pomotectFont.className} objects_link hover:bg-black hover:text-white`}>Process</Link>
      </div>

      <div>
        <Shop response={response} />
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}