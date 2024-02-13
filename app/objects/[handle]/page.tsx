import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductCta } from "@/components";
import BlueHandLogo from "../../../assets/images/blue-hand-logo.png"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import parse from 'html-react-parser';
import Carousel from "@/components/Carousel";
import { revalidatePath } from 'next/cache';

const gql = String.raw;

const getSingleProduct = async (params: { handle: string }) => {
  const { data } = await storefront(singleProductQuery, {
    handle: params.handle,
  });

  return {
    product: data.productByHandle,
  };
};

const singleProductQuery = gql`
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      descriptionHtml
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
      images(first: 2) {
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

export default async function Product({
  params,
}: {
  params: { handle: string };
}) {

  revalidatePath('/objects/[handle]', 'page');
  let lastUpdatedDate = formatDate();
  let response = (await getSingleProduct(params)) as any;

  let product = response?.product;

  let updatedHtml = product.descriptionHtml.replaceAll('<p', '<p className="minion-font"')

  let markup = parse(updatedHtml);

  return (
    <div>
      <div className="site-section">
        <h3 className="product-details-header">Objects</h3>
        <Link href="/objects" scroll={false} className="back-button text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to the previous page</Link>
      </div>
      <div className="md:flex-row-reverse md:inline-flex md:align-top">
        <div className="hidden md:block">
          {product.images.edges.map((item: any, i: React.Key | null | undefined) => {

            return (
              <div key={i} className="ml-8 md:mt-2 overflow-hidden">
                <Image
                  src={item.node?.transformedSrc}
                  alt={"product image"}
                  width="600"
                  height="800"
                  className="float-right mt-3 mb-7 h-auto hover:scale-[2] transform transition duration-500"
                />
              </div>
            )
          })
          }
        </div>

        <div className="block md:hidden">
          <Carousel images={product.images} />
        </div>

        <div className="product-details">
          <div className="site-section product-info">
            <div className="main_header mt-5 w-full font-['Minion']">{product.title}</div>
            <div className="text-sm mb-5 italic font-['Minion']">
              Most recently updated on {lastUpdatedDate}
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
            <div className="minion-font text-justify">
              {markup}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
