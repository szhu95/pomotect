"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCta } from ".";
import BlueHandLogo from "../assets/images/blue-hand-logo.png";
import InquiryForm from "@/components/InquiryForm";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import localFont from "next/font/local";
import { formatPrice } from "@/utils";

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});
const pomotectBoldFont = localFont({
  src: '../fonts/pomotect-analog-bold.otf',
});

export default function ProductDetailsClient({ product, isFurniture, markup, onVariantChange }: { product: any, isFurniture: boolean, markup: React.ReactNode, onVariantChange?: (variant: string) => void }) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const pricing = useMemo(() => {
    if (!product || !product.priceRange || !product.priceRange.minVariantPrice || !product.priceRange.minVariantPrice.amount) {
      return { price: 0, compareAtPrice: null };
    }
    
    // Find the variant with the lowest discounted price
    let minDiscountedPrice: number | null = null;
    let compareAtPrice: number | null = null;
    let minRegularPrice = parseFloat(product.priceRange.minVariantPrice.amount);
    
    // Check all variants for discounts
    if (product.variants && product.variants.edges && Array.isArray(product.variants.edges)) {
      for (const variantEdge of product.variants.edges) {
        if (!variantEdge || !variantEdge.node) continue;
        
        const variant = variantEdge.node;
        const variantPriceAmount = variant.price?.amount || product.priceRange.minVariantPrice.amount;
        if (!variantPriceAmount) continue;
        
        const variantPrice = parseFloat(variantPriceAmount);
        
        // Track the minimum regular price
        if (variantPrice < minRegularPrice) {
          minRegularPrice = variantPrice;
        }
        
        // Check if this variant has a compareAtPrice discount
        if (variant.compareAtPrice && variant.compareAtPrice.amount) {
          const variantCompareAtPrice = parseFloat(variant.compareAtPrice.amount);
          
          // If this variant has a discount (compareAtPrice > price)
          if (variantCompareAtPrice > variantPrice) {
            // If this is the first discounted variant or has a lower discounted price, use it
            if (minDiscountedPrice === null || variantPrice < minDiscountedPrice) {
              minDiscountedPrice = variantPrice;
              compareAtPrice = variantCompareAtPrice;
            }
          }
        }
      }
    }
    
    // If we found a compareAtPrice discount, return it
    if (minDiscountedPrice !== null && compareAtPrice !== null) {
      return { price: minDiscountedPrice, compareAtPrice };
    }
    
    // Check if product is eligible for BF-30-OFF discount code (30% off)
    // Only apply to products with a specific tag (e.g., 'bf-30-off' or 'sale')
    const isEligibleForBF30Off = !isFurniture && 
      product.tags && 
      Array.isArray(product.tags) && (
        product.tags.includes('bf-30-off') || 
        product.tags.includes('sale') ||
        product.tags.includes('discount')
      );
    
    if (isEligibleForBF30Off) {
      // Calculate 30% discount
      const originalPrice = minRegularPrice;
      const discountedPrice = originalPrice * 0.7; // 30% off
      return { price: discountedPrice, compareAtPrice: originalPrice };
    }
    
    return { price: minRegularPrice, compareAtPrice: null };
  }, [product, isFurniture]);

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
            pricing.compareAtPrice && pricing.compareAtPrice > pricing.price ? (
              <div className='font-bold minion-font ml-2 mt-1'>
                <div className="minion-font line-through text-slate-400">{formatPrice(pricing.compareAtPrice.toString())}</div>
                <div className="minion-font text-primary-blue">{formatPrice(pricing.price.toString())}</div>
              </div>
            ) : (
              <div className='font-bold minion-font ml-2 mt-4'>
                {formatPrice(pricing.price.toString())}
              </div>
            )
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
            onVariantChange={onVariantChange}
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