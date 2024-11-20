import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductCta, ZoomableImage } from "@/components";
import BlueHandLogo from "../../../assets/images/blue-hand-logo.png"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import parse from 'html-react-parser';
import Carousel from "@/components/Carousel";
import { revalidatePath } from 'next/cache';
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
      images(first: 5) {
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

  revalidatePath('/products/[handle]', 'page');

  let lastUpdatedDate = formatDate();
  let response = (await getSingleProduct(params)) as any;

  if (response.product == null) {
    return NotFound();
  }

  let product = response?.product;

  // console.log("product is " + JSON.stringify(product))

  let updatedHtml = product?.descriptionHtml.replaceAll('<p', '<p className="minion-font"')

  let markup = parse(updatedHtml);

  return (
    <div>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} product-details-header`}>Objects</h3>
        <Link href="/products" scroll={false} className={`$minion-font back-button text-purple focus:bg-black focus:text-white hover:bg-black hover:text-white`}>Back to all objects ⇢</Link>
      </div>
      <div className="md:flex-row-reverse md:inline-flex md:align-top md:justify-between">
        <div className="hidden md:block">
          {product.images.edges.map((item: any, i: React.Key | null | undefined) => {

            return (
              // hover:scale-[2] transform transition duration-500
              <div key={i} className="ml-8 md:mt-2 mr-[10px] overflow-hidden">
                <ZoomableImage
                  src={item.node?.transformedSrc}
                  alt={"product image"}
                  width={600}
                  height={800}
                  className="float-right mt-3 mb-7 h-auto" />
                  {/* <Image
                    src={item.node?.transformedSrc}
                    alt={"product image"}
                    width="600"
                    height="800"
                    className="float-right mt-3 mb-7 h-auto"
                  /> */}
              </div>
            )
          })
          }
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
