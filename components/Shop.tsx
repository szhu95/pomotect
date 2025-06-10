"use client";
import { formatPrice, storefront } from "@/utils";
import Link from "next/link";
import Image from "next/image";
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
              };
            }>;
          };
          priceRange: {
            minVariantPrice: {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 col-auto gap-x-10 gap-y-10 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {response.products.edges.map((item) => {
              const product = item.node;
              const image = product.images.edges[0].node;
              const isSoldOut = isProductSoldOut(product);

              return isSoldOut ? (
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="group product-tile p-1"
                  prefetch={true}
                >
                  <div className="relative w-full">
                    <Image
                      src={image.transformedSrc}
                      alt={"product-image"}
                      width={500}
                      height={500}
                      className="h-full w-full opacity-80 object-center"
                    />
                    <div>
                      <div className="absolute right-[0px] top-[0%] font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">{product.title}</div>
                      <div className="absolute right-[0px] bottom-[0px] font-['Minion'] text-xs lg:text-sm italic text-slate-400 font-semibold md:text-transparent group-hover:text-slate-400 group-focus:text-slate-400">
                        SOLD OUT
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="group product-tile p-1"
                  prefetch={true}
                >
                  <div className="relative w-full">
                    <Image
                      src={image.transformedSrc}
                      alt={"product-image"}
                      width={500}
                      height={500}
                      className="h-full w-full group-hover:opacity-80 object-center"
                    />
                    <div>
                      <div className="absolute right-[0px] top-[0%] font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">{product.title}</div>
                      <div className="absolute right-[0px] bottom-[0px] font-['Minion'] text-xs lg:text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">
                        {formatPrice(product.priceRange.minVariantPrice.amount)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
