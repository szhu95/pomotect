import { Shop } from '@/components'
import { formatDate, storefront } from '@/utils';
import Link from 'next/link';
import React from 'react'


const getProducts = async () => {
    const { data } = await storefront(productsQuery);
    return {
      products: data.products,
    };
  };
  
  const gql = String.raw;
  
  const productsQuery = gql`
    query Products {
      products(first: 6) {
        edges {
          node {
            title
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 2) {
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

    let response = (await getProducts()) as any;

    let lastUpdatedDate = formatDate();
    return (
        <div>
            <div className="site-section">
                <h3 className="main_header">Objects</h3>
                <p><i>Most recently updated on {lastUpdatedDate}</i></p>
            </div>
            <div className="site-section">
                <Link href="/objects" className="objects_link bg-black text-white hover:bg-black hover:text-white">For Sale</Link>
                <Link href="/objects/concepts" className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">{`Stuff we don't know how to make yet`}</Link>
            </div>


            <div>
                <Shop response={response}/>
            </div>
        </div>
    )
}

export default Objects;