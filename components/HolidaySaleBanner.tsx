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
      className="group block"
    >
      <div className={`${pomotectFont.className} group-hover:text-opacity-45 bg-[black] font-semibold text-center text-white mt-1 pl-1`}>
        <span className={`${pomotectFont.className} text-primary-blue group-hover:text-terracotta`}>30% OFF</span> ON SELECT ITEMS
      </div>
    </Link>
  );
}

