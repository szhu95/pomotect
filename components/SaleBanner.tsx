"use client";
import React from "react";
import Link from "next/link";
import localFont from "next/font/local";

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});

export default function SaleBanner() {
  return (
    <Link
      href="/products"
      scroll={false}
      className="group block min-h-[48px] md:min-h-0 flex items-center justify-center"
    >
      <div className={`${pomotectFont.className} group-hover:text-opacity-45 bg-[black] font-semibold text-center text-white mt-1 pl-1 w-full min-h-[48px] md:min-h-0 flex items-center justify-center`}>
        <span className={`${pomotectFont.className} text-primary-blue group-hover:text-terracotta mr-1`}>30% OFF</span>
        SELECT ITEMS
      </div>
    </Link>
  );
}

