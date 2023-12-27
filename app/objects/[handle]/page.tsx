import { formatDate, formatPrice, storefront } from "@/utils";
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
      descriptionHtml
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

  console.log("product is " + JSON.stringify(product));

  return (
    <div className="product-details">
      <div className="site-section">Objects</div>
      <div className="site-section">
        {product.title}
        <p>
          <i>Most recently updated on {lastUpdatedDate}</i>
        </p>
      </div>
      <div className="site-section">
        {formatPrice(product.priceRange.minVariantPrice.amount)}
      </div>
      <div className="site-section">
        <h1>
          <b>Description</b>
        </h1>
        <div dangerouslySetInnerHTML={createMarkup(product.descriptionHtml)} />
      </div>
    </div>
  );
}
