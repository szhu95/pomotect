import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductCta, ZoomableImage } from "@/components";
import BlueHandLogo from "../../../assets/images/blue-hand-logo.png"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import parse from 'html-react-parser';
import Carousel from "@/components/Carousel";
import NotFound from "@/app/not-found";
import moment from 'moment';
import localFont from 'next/font/local';

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
  params: {
    handle: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { handle } = await Promise.resolve(params);
  const response = await getSingleProduct(handle);

  if (!response?.product) {
    return NotFound();
  }

  const product = response.product;
  const updatedHtml = product.descriptionHtml
    .replaceAll('<p', '<p className="minion-font"')
    .replaceAll('<b', '<b className="minion-font"')
    .replaceAll('<em', '<em className="minion-font"');

  const markup = parse(updatedHtml);

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
          <div className="site-section product-info">
            <div className={`minion-font main_header mt-5 w-full text-xs md:text-sm`}>{product.title}</div>
            <div className={`minion-font text-sm mb-5 italic`}>
              Most recently updated on {moment(product.updatedAt).format('MMMM DD, YYYY')}
            </div>
            <div className="inline-grid gap-2 grid-cols-2">
              <Image
                src={BlueHandLogo}
                alt={"blue hand logo"}
                width="50"
                height="50"
              />
              <div className='font-bold minion-font ml-2 mt-4'>{formatPrice(product.priceRange.minVariantPrice.amount)}</div>
            </div>
          </div>
          <div className="site-section w-full product-cta">
            <ProductCta variantName={product.options[0].name} options={product.options[0].values} quantity={product.totalInventory} variants={product.variants} />
          </div>
          <div className="site-section minion-font">
            <div className="mb-2 font-bold minion-font">
              Description
            </div>
            <div className={`${pomotectBoldFont.className} text-justify`}>
              {markup}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
