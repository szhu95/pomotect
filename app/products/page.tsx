import { Shop } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate, storefront } from '@/utils';
import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';

export const revalidate = 0;

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});

async function getProducts() {
  const { data } = await storefront(productsQuery);
  return {
    products: data.products,
  };
}

const gql = String.raw;

const productsQuery = gql`
    query Products {
      products(first: 20, sortKey: PRODUCT_TYPE) {
        edges {
          node {
            title
            handle
            tags
            totalInventory
            availableForSale
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

export default async function Page() {
  const response = await getProducts();
  const currentDate = formatDate();

  return (
    <div>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {currentDate}</p>
      </div>
      <div className="site-section flex justify-center items-center gap-16 -ml-6">
        <span className={`${pomotectFont.className} objects_link bg-black text-white`}>For Sale</span>
        <Link href="/products/process" className={`${pomotectFont.className} objects_link hover:bg-black hover:text-white`}>Process</Link>
      </div>

      <div>
        <Shop response={response} />
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}