import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import parse from 'html-react-parser';
import Carousel from "@/components/Carousel";
import NotFound from "@/app/not-found";
import localFont from 'next/font/local';
import ProductDetailsClient from '@/components/ProductDetailsClient';

const pomotectFont = localFont({
  src: '../../../fonts/pomotect-analog-regular.otf',
});

const pomotectBoldFont = localFont({
  src: '../../../fonts/pomotect-analog-bold.otf',
});

const gql = String.raw;

export const revalidate = 0;

async function getSingleProduct(handle: string) {
  const { data } = await storefront(singleProductQuery, {
    handle,
  });

  return {
    product: data.productByHandle,
  };
}

const singleProductQuery = gql`
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      descriptionHtml
      createdAt
      updatedAt
      tags
      totalInventory
      priceRange {
        minVariantPrice {
          amount
        }
      }
      options {
        name
        values
      }
      images(first: 10) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            title
            id
            quantityAvailable
          }
        }
      }
    }
  }
`;

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;
  const response = await getSingleProduct(handle);

  if (!response?.product) {
    return NotFound();
  }

  const product = response.product;
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.name) {
        const className = domNode.attribs?.className || '';
        let newClassName = `minion-font ${className}`.trim();
        
        // Add blue color and underline for links
        if (domNode.name === 'a') {
          newClassName = `${newClassName} text-primary-blue underline`;
        }
        
        domNode.attribs = {
          ...domNode.attribs,
          className: newClassName
        };
      }
    }
  };

  const markup = parse(product.descriptionHtml, options);

  const isFurniture = handle.toLowerCase().includes('furniture');

  return (
    <div>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} product-details-header`}>Objects</h3>
        <Link href="/products" scroll={false} className={`$minion-font back-button text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white`}>Back to all objects ⇢</Link>
      </div>
      <div className="md:flex-row-reverse md:inline-flex md:align-top md:justify-between">
        <div className="md:w-1/2 w-full md:block hidden">
          <Carousel images={product.images} />
        </div>
        <div className="flex md:hidden">
          <Carousel images={product.images} />
        </div>
        <div className="product-details">
          <ProductDetailsClient product={product} isFurniture={isFurniture} markup={markup} />
        </div>
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
