import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductCta } from "@/components";
import BlueHandLogo from "../../../assets/images/blue-hand-logo.png"

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

function createMarkup(
  description: string
): { __html: string | TrustedHTML } | undefined {
  return { __html: description };
}

export default async function Product({
  params,
}: {
  params: { handle: string };
}) {


  let lastUpdatedDate = formatDate();
  let response = (await getSingleProduct(params)) as any;

  let product = response?.product;

  let image = product.images.edges[0].node;

  if (product) {
    console.log("product is " + JSON.stringify(product));
  }
  
  return (
    <div>
      <div className="site-section">
        <h3 className="product-details-header">Objects</h3>
        <Link href="/objects" className="back-button focus:bg-black focus:text-white hover:bg-black hover:text-white">Back to the previous page</Link>
      </div>
      <div className="inline-flex">
        <div className="product-details">
          <div className="site-section product-info">
            <div className="main_header mt-5 w-full">{product.title}</div>
            <p className="text-sm mb-5">
              <i>Most recently updated on {lastUpdatedDate}</i>
            </p>
            <div className="inline-grid gap-2 grid-cols-2">
              <Image
                src={BlueHandLogo}
                alt={"blue hand logo"}
                width="50"
                height="50"
              />
              <b>{formatPrice(product.priceRange.minVariantPrice.amount)}</b>
            </div>
          </div>
          <div className="site-section w-full product-cta">
            <ProductCta variantName={product.options[0].name} options={product.options[0].values} variants={product.variants} />
          </div>
          <div className="site-section">
            <h1 className="mb-2">
              <b>Description</b>
            </h1>
            <div dangerouslySetInnerHTML={createMarkup(product.descriptionHtml)} />
          </div>
        </div>
        <div className="product-image">
          <p className="float-right text-3xl font-light text-gray-300">[{params.handle}]</p>
          <Image
            src={image.transformedSrc}
            alt={"test"}
            width="600"
            height="800"
            className="float-right mt-12"
          />
        </div>
      </div>
    </div>
  );
}
