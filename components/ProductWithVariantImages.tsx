"use client";
import React, { useState, useMemo } from "react";
import Carousel from "@/components/Carousel";
import ProductDetailsClient from "@/components/ProductDetailsClient";

interface ProductWithVariantImagesProps {
  product: any;
  isFurniture: boolean;
  markup: React.ReactNode;
}

export default function ProductWithVariantImages({ product, isFurniture, markup }: ProductWithVariantImagesProps) {
  // Initialize with first variant option if available
  const firstVariant = product.options?.[0]?.values?.[0] || null;
  const [selectedVariant, setSelectedVariant] = useState<string | null>(firstVariant);

  // Determine which image index to start at based on variant selection
  const initialSlideIndex = useMemo(() => {
    if (!product.images?.edges || product.images.edges.length === 0) {
      return 0;
    }

    // Get variant options
    const variantOptions = product.options?.[0]?.values || [];
    if (variantOptions.length < 2) {
      return 0;
    }

    // Determine which image to start at based on variant index
    if (selectedVariant) {
      const variantIndex = variantOptions.indexOf(selectedVariant);
      // If variant is the second option (index 1), start at second image (index 1)
      return variantIndex === 1 ? 1 : 0;
    }

    return 0;
  }, [selectedVariant, product]);

  return (
    <div className="md:flex-row-reverse md:inline-flex md:align-top md:justify-between">
      <div className="md:w-1/2 w-full md:block hidden">
        <Carousel images={product.images} initialSlide={initialSlideIndex} />
      </div>
      <div className="flex md:hidden">
        <Carousel images={product.images} initialSlide={initialSlideIndex} />
      </div>
      <div className="product-details">
        <ProductDetailsClient 
          product={product} 
          isFurniture={isFurniture} 
          markup={markup}
          onVariantChange={setSelectedVariant}
        />
      </div>
    </div>
  );
}

