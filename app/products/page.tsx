import { Shop } from '@/components'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate, storefront } from '@/utils';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});


const getProducts = async () => {
  const { data } = await storefront(productsQuery);
  return {
    products: data.products,
  };
};

const gql = String.raw;

const productsQuery = gql`
    query Products {
      products(first: 10) {
        edges {
          node {
            title
            handle
            tags
            totalInventory
            priceRange {
              minVariantPrice {
                amount
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

const Objects = async () => {

  revalidatePath('/products/[handle]', 'page');

  let response = (await getProducts()) as any;

  // console.log("response is" + JSON.stringify(response))

  let lastUpdatedDate = formatDate();
  return (
    <div>
      <div className="site-section">
        <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on November 29, 2024</p>
      </div>
      <div className="site-section">
        <Link href="/products" scroll={false} className={`${pomotectFont.className} objects_link bg-black text-white hover:bg-black hover:text-white`}>For Sale</Link>
        {/* <Link href="/products/concepts" scroll={false} className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">{`Stuff we don't know how to make yet`}</Link> */}
      </div>


      <div>
        <Shop response={response} />
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}

export default Objects;