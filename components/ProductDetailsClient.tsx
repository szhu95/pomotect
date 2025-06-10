"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ProductCta } from ".";
import BlueHandLogo from "../assets/images/blue-hand-logo.png";
import InquiryForm from "@/components/InquiryForm";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import localFont from "next/font/local";

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});
const pomotectBoldFont = localFont({
  src: '../fonts/pomotect-analog-bold.otf',
});

export default function ProductDetailsClient({ product, isFurniture, markup }: { product: any, isFurniture: boolean, markup: React.ReactNode }) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  return (
    <>
      <div className="site-section product-info">
        <div className={`minion-font main_header mt-5 w-full text-xs md:text-sm`}>{product.title}</div>
        <div className={`minion-font text-sm mb-5 italic`}>
          Most recently updated on {moment(product.updatedAt).format('MMMM DD, YYYY')}
        </div>
        <div className="inline-grid gap-2 grid-cols-2">
          <Image
            src={BlueHandLogo}
            alt={"blue hand logo"}
            width={50}
            height={50}
          />
          {!isFurniture && (
            <div className='font-bold minion-font ml-2 mt-4'>{product.priceRange && product.priceRange.minVariantPrice && product.priceRange.minVariantPrice.amount ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}` : null}</div>
          )}
        </div>
      </div>
      {isFurniture && (
        <>
          <div className="flex items-center justify-end -mt-[75px] mr-5">
            <button
              onClick={() => setShowInquiryForm(!showInquiryForm)}
              className={`minion-font bg-primary-blue text-white hover:bg-opacity-90 transition-all duration-200 ease-in-out px-4 py-1 border border-primary-blue shadow-sm tracking-wide hover:scale-[1.03]`}
              style={{ borderRadius: 0, fontSize: '0.85rem' }}
            >
              Inquire Here
            </button>
          </div>
          <AnimatePresence>
            {showInquiryForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <InquiryForm
                    productTitle={product.title}
                    onClose={() => setShowInquiryForm(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <div className="site-section w-full product-cta">
        {!isFurniture && product.options && product.options[0] && (
          <ProductCta
            variantName={product.options[0].name}
            options={product.options[0].values}
            quantity={product.totalInventory}
            variants={product.variants}
          />
        )}
      </div>
      <div className="site-section minion-font">
        <div className="mb-2 font-bold minion-font">
          Description
        </div>
        <div className={`${pomotectBoldFont.className} text-justify`}>
          {markup}
        </div>
      </div>
    </>
  );
} 