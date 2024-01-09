import { formatPrice, storefront } from "@/utils";
import Link from "next/link";
import Image from "next/image";

export const getProducts = async () => {
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

export default async function Shop() {
  let response = (await getProducts()) as any;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {response.products.edges.map((item: any) => {
            let product = item.node;
            let image = product.images.edges[0].node;
            //console.log("product is " + JSON.stringify(product));
            //console.log("image is " + JSON.stringify(image));
            return (
              <Link
                key={product.handle}
                href={`objects/${product.handle}`}
                className="group"
              >
                <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    src={image.transformedSrc}
                    alt={"product-image"}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {formatPrice(product.priceRange.minVariantPrice.amount)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
