import { storefront } from "@/utils";
import React from "react";

const gql = String.raw;

// export async function generateStaticParams() {
//   const { data } = await storefront(gql`
//     query Products {
//       products(first: 6) {
//         edges {
//           node {
//             handle
//           }
//         }
//       }
//     }
//   `);

//   return data.products.edges.map((product: any) => ({
//       handle: product.node.handle
//   }));
// }

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
      description
      updatedAt
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
`;

export default async function Product({
  params,
}: {
  params: { handle: string };
}) {
  let response = (await getSingleProduct(params)) as any;

  let product = response?.product

  console.log("product is " + JSON.stringify(product));

  return <div>Product Page for {product.title}</div>;
}
