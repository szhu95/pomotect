"use client";

/**
 * From Paper — simple landing
 * https://app.paper.design/file/01KG7SD5C7C1EQV42YECFF0XCT?page=01KG84CD80BZPQY91CA5VDGFZ3&node=01KG8GCNSC75R9H9X7XGBX9Y4C
 * on Feb 27, 2026
 */

import localFont from "next/font/local";

const pomotectFont = localFont({
  src: "../../fonts/pomotect-analog-regular.otf",
});

export default function PaperLandingPage() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-clip bg-black box-border relative antialiased"
      style={{
        fontSynthesis: "none",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[885px] max-w-[90vw] h-[241px] bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://workers.paper.design/file-assets/01KG7SD5C7C1EQV42YECFF0XCT/01KG8H6M37EZDJX288XMJZ5X9B.png)",
        }}
      />
      <div
        className={`absolute left-[8%] top-[544px] w-[262px] max-w-[40vw] h-[29px] content-center text-white text-base leading-5 ${pomotectFont.className}`}
      >
        DESign studio
      </div>
      <div
        className={`absolute right-[8%] top-[544px] w-[262px] max-w-[40vw] h-[29px] content-center text-right text-white text-base leading-5 ${pomotectFont.className}`}
      >
        creative label
      </div>
    </div>
  );
}
