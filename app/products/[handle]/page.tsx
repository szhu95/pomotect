import { unstable_cache } from 'next/cache';
import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import parse from 'html-react-parser';
import Carousel from "@/components/Carousel";
import NotFound from "@/app/not-found";
import localFont from 'next/font/local';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import ProductWithVariantImages from '@/components/ProductWithVariantImages';

const pomotectFont = localFont({
  src: '../../../fonts/pomotect-analog-regular.otf',
});

const pomotectBoldFont = localFont({
  src: '../../../fonts/pomotect-analog-bold.otf',
});

const gql = String.raw;

export const revalidate = 300;

async function fetchSingleProduct(handle: string) {
  const { data } = await storefront(singleProductQuery, { handle });
  const product = data?.productByHandle;
  return product ? { product } : null;
}

function getCachedProduct(handle: string) {
  return unstable_cache(
    () => fetchSingleProduct(handle),
    ['product', handle],
    { revalidate: 300 }
  )();
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
        maxVariantPrice {
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
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            image {
              transformedSrc
              altText
            }
          }
        }
      }
    }
  }
`;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function metaDescription(html: string, maxLength = 155): string {
  const plain = stripHtml(html);
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength - 3) + '...';
}

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const response = await getCachedProduct(handle);
  const product = response?.product;
  if (!product) return { title: 'Object not found | postmodern tectonics' };

  const title = `${product.title} | postmodern tectonics`;
  const description = metaDescription(product.descriptionHtml);
  const image =
    product.images?.edges?.[0]?.node?.transformedSrc
      ? new URL(product.images.edges[0].node.transformedSrc)
      : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(image && { images: [{ url: image.toString(), alt: product.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;
  const response = await getCachedProduct(handle);

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
          domNode.attribs = {
            ...domNode.attribs,
            className: newClassName,
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        } else {
          domNode.attribs = {
            ...domNode.attribs,
            className: newClassName
          };
        }
      }
    }
  };

  const markup = parse(product.descriptionHtml, options);

  const isFurniture = handle.toLowerCase().includes('furniture');
  const shouldSwitchVariantImages = handle === 'a-not-so-still-life-1';

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pomotect.com';
  const productUrl = `${baseUrl}/products/${handle}`;
  const imageUrl = product.images?.edges?.[0]?.node?.transformedSrc;
  const price = product.priceRange?.minVariantPrice?.amount ?? product.variants?.edges?.[0]?.node?.price?.amount;
  const inStock = (product.totalInventory ?? 0) > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: stripHtml(product.descriptionHtml).slice(0, 500),
    url: productUrl,
    ...(imageUrl && { image: imageUrl }),
    ...(product.tags?.length && { category: product.tags.join(', ') }),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: price ? parseFloat(price) : undefined,
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} product-details-header`}>Objects</h3>
        <Link href="/products" scroll={false} className={`$minion-font back-button text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white`}>Back to all objects ⇢</Link>
      </div>
      {shouldSwitchVariantImages ? (
        <ProductWithVariantImages product={product} isFurniture={isFurniture} markup={markup} />
      ) : (
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
      )}
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
