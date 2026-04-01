import type { MetadataRoute } from 'next';
import { objectsCollectionGid } from '@/lib/shopifyObjectsCollection';
import { storefront } from '@/utils';

const gql = String.raw;

const collectionHandlesQuery = gql`
  query ObjectsCollectionHandles($id: ID!) {
    node(id: $id) {
      ... on Collection {
        products(first: 100, sortKey: MANUAL) {
          edges {
            node {
              handle
            }
          }
        }
      }
    }
  }
`;

async function getProductHandles(): Promise<string[]> {
  try {
    const { data } = await storefront(collectionHandlesQuery, {
      id: objectsCollectionGid(),
    });
    const node = data?.node;
    const edges =
      node && 'products' in node && node.products?.edges
        ? node.products.edges
        : [];
    return edges.map((e: { node: { handle: string } }) => e.node.handle);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pomotect.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/words`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sounds`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ];

  const handles = await getProductHandles();
  const productPages: MetadataRoute.Sitemap = handles.map((handle) => ({
    url: `${baseUrl}/products/${handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
