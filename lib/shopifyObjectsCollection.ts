import { unstable_cache } from 'next/cache';
import { storefront } from '@/utils';

/**
 * Objects grid on /products: products from this Shopify collection, manual sort in Admin.
 * Override with NEXT_PUBLIC_SHOPIFY_OBJECTS_COLLECTION_ID (numeric id or full gid).
 */
export function objectsCollectionGid(): string {
  const raw =
    process.env.NEXT_PUBLIC_SHOPIFY_OBJECTS_COLLECTION_ID?.trim() ||
    '335284371650';
  if (raw.startsWith('gid://')) return raw;
  return `gid://shopify/Collection/${raw}`;
}

const gql = String.raw;

const objectsCollectionListQuery = gql`
  query ObjectsCollection($id: ID!) {
    node(id: $id) {
      ... on Collection {
        products(first: 100, sortKey: MANUAL) {
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
    }
  }
`;

async function loadObjectsCollectionProducts() {
  const { data } = await storefront(objectsCollectionListQuery, {
    id: objectsCollectionGid(),
  });
  const node = data?.node;
  const edges =
    node && 'products' in node && node.products?.edges
      ? node.products.edges
      : [];
  return { products: { edges } };
}

/** Shared cache for /products grid, footer ticker, etc. */
export const getCachedObjectsCollectionProducts = unstable_cache(
  loadObjectsCollectionProducts,
  ['objects-collection-products'],
  { revalidate: 300 }
);
