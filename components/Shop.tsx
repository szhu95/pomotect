"use client";
import { formatPrice, storefront } from "@/utils";
import Link from "next/link";
import FadeInImage from "./FadeInImage";
import { motion } from "framer-motion";

interface ShopProps {
  response: {
    products: {
      edges: Array<{
        node: {
          title: string;
          handle: string;
          totalInventory: string;
          availableForSale: boolean;
          variants: {
            edges: Array<{
              node: {
                id: string;
                availableForSale: boolean;
                quantityAvailable: number;
                price: {
                  amount: string;
                };
                compareAtPrice: {
                  amount: string;
                } | null;
              };
            }>;
          };
          priceRange: {
            minVariantPrice: {
              amount: string;
            };
            maxVariantPrice: {
              amount: string;
            };
          };
          images: {
            edges: Array<{
              node: {
                transformedSrc: string;
                altText: string;
              };
            }>;
          };
          tags?: string[];
        };
      }>;
    };
  };
}

export default function Shop({ response }: ShopProps) {
  const isProductSoldOut = (product: any) => {
    // Check if any variant is available for sale
    return !product.variants.edges.some((edge: any) => edge.node.availableForSale);
  };

  const getProductPricing = (product: any) => {
    // Find the variant with the lowest discounted price
    let minDiscountedPrice: number | null = null;
    let compareAtPrice: number | null = null;
    let minRegularPrice = parseFloat(product.priceRange.minVariantPrice.amount);
    const isFurniture = product.tags && product.tags.includes('furniture');
    
    // Check all variants for discounts
    for (const variantEdge of product.variants.edges) {
      const variant = variantEdge.node;
      const variantPrice = parseFloat(variant.price.amount);
      
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
    
    // If we found a compareAtPrice discount, return it
    if (minDiscountedPrice !== null && compareAtPrice !== null) {
      return { price: minDiscountedPrice, compareAtPrice };
    }
    
    // Check if product is eligible for BF-30-OFF discount code (30% off)
    // Only apply to products with a specific tag (e.g., 'bf-30-off' or 'sale')
    const isEligibleForBF30Off = !isFurniture && product.tags && (
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
  };


  // Separate products by category with priority: latest > furniture > priority > other
  const latestProducts = response.products.edges.filter(item => 
    item.node.tags && item.node.tags.includes('latest')
  );
  
  const furnitureProducts = response.products.edges.filter(item => 
    item.node.tags && item.node.tags.includes('furniture') && !item.node.tags.includes('latest')
  );
  
  const priorityProducts = response.products.edges.filter(item => 
    item.node.tags && item.node.tags.includes('priority') && 
    !item.node.tags.includes('latest') && !item.node.tags.includes('furniture')
  );
  
  const otherProducts = response.products.edges.filter(item => 
    !item.node.tags || (!item.node.tags.includes('furniture') && !item.node.tags.includes('latest') && !item.node.tags.includes('priority'))
  );

  // Combine: latest first, then furniture, then priority, then everything else
  const sortedProducts = [...latestProducts, ...furnitureProducts, ...priorityProducts, ...otherProducts];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 col-auto gap-x-10 gap-y-10 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {sortedProducts.map((item, index) => {
              const product = item.node;
              const image = product.images.edges[0].node;
              const isSoldOut = isProductSoldOut(product);
              const isFurniture = product.tags && product.tags.includes('furniture');
              const staggeredDelay = index * 0.1; // Stagger each image by 100ms

              return isSoldOut ? (
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="group product-tile p-1"
                  prefetch={true}
                >
                  <div className="relative w-full">
                    <FadeInImage
                      src={image.transformedSrc}
                      alt={"product-image"}
                      width={500}
                      height={500}
                      className="h-full w-full opacity-80 object-center"
                      priority={false}
                      delay={staggeredDelay}
                    />
                    <div>
                      <div className="absolute right-[0px] top-[0%] font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">{product.title}</div>
                      <div className="absolute right-[0px] bottom-[0px] font-['Minion'] text-xs lg:text-sm italic text-slate-400 font-semibold md:text-transparent group-hover:text-slate-400 group-focus:text-slate-400">
                        SOLD OUT
                      </div>
                    </div>
                  </div>
                </Link>
              ) :
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="group product-tile p-1"
                  prefetch={true}
                >
                  <div className="relative w-full">
                    <FadeInImage
                      src={image.transformedSrc}
                      alt={"product-image"}
                      width={500}
                      height={500}
                      className="h-full w-full group-hover:opacity-80 object-center"
                      priority={false}
                      delay={staggeredDelay}
                    />
                    <div>
                      <div className="absolute right-[0px] top-[0%] font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">{product.title}</div>
                      <div className="absolute right-[0px] bottom-[0px] font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">
                        {isFurniture ? 'INQUIRE' : (() => {
                          const pricing = getProductPricing(product);
                          if (pricing.compareAtPrice && pricing.compareAtPrice > pricing.price) {
                            return (
                              <div className="flex flex-col items-end">
                                <span className="line-through text-slate-400 font-['Minion'] text-xs lg:text-sm md:text-transparent group-hover:text-slate-400 group-focus:text-slate-400">{formatPrice(pricing.compareAtPrice.toString())}</span>
                                <span className="font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">{formatPrice(pricing.price.toString())}</span>
                              </div>
                            );
                          }
                          return formatPrice(pricing.price.toString());
                        })()}
                      </div>
                    </div>
                  </div>
                </Link>
              ;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
