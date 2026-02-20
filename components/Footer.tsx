import { unstable_cache } from 'next/cache';
import { DisplayedFooter } from '@/components';
import { getPosts, storefront } from '@/utils';

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

async function fetchProducts() {
  const { data } = await storefront(productsQuery);
  return { products: data.products };
}

const getCachedProducts = unstable_cache(
  fetchProducts,
  ['footer-products'],
  { revalidate: 300 }
);

export default async function Footer() {
  const [data, objectsResponse] = await Promise.all([
    getPosts().then((posts) =>
      posts ? { posts } : { notFound: true as const }
    ),
    getCachedProducts().catch(() => ({ products: null })),
  ]);

  const response = data.posts ?? [];
  const objects =
    objectsResponse?.products != null
      ? objectsResponse
      : { products: { edges: [] } };

  return (
    <DisplayedFooter response={response} objectsResponse={objects} />
  );
}