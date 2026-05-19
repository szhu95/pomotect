"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});

export default function SaleFilterLink() {
  const searchParams = useSearchParams();
  const isSaleActive = searchParams.get('sale') === 'true';
  const href = isSaleActive ? '/products' : '/products?sale=true';

  return (
    <div className="site-section flex justify-center items-center -ml-6">
      <Link 
        href={href} 
        className={`${pomotectFont.className} text-red-600 hover:underline ${isSaleActive ? 'font-bold underline' : ''}`}
      >
        sale
      </Link>
    </div>
  );
}
