import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductCta } from "@/components";
import BlueHandLogo from "../../../assets/images/blue-hand-logo.png"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import parse from 'html-react-parser';

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

  let lastUpdatedDate = formatDate();
  let response = (await getSingleProduct(params)) as any;

  let product = response?.product;

  let image = product.images.edges[0].node;

  let markup = parse(product.descriptionHtml);

  return (
    <div>
      <div className="site-section">
        <h3 className="product-details-header">Objects</h3>
        <Link href="/objects" scroll={false} className="back-button focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to the previous page</Link>
      </div>
      <div className="block md:flex-row-reverse md:inline-flex md:align-top">
        <div className="product-image md:w-full ml-8 md:mt-16">
          <p className="float-right text-3xl font-light text-gray-300 font-['Minion']">[{params.handle}]</p>
          <Image
            src={image.transformedSrc}
            alt={"product image"}
            width="600"
            height="800"
            className="float-right mt-12"
          />
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
            <ProductCta variantName={product.options[0].name} options={product.options[0].values} variants={product.variants} />
          </div>
          <div className="site-section">
            <div className="mb-2 font-bold minion-font">
              Description
            </div>
            <div className="minion-font">{markup}</div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
