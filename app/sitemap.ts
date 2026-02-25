import type { MetadataRoute } from 'next';
import { storefront } from '@/utils';

const gql = String.raw;

const productHandlesQuery = gql`
  query ProductHandles {
    products(first: 100) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

async function getProductHandles(): Promise<string[]> {
  try {
    const { data } = await storefront(productHandlesQuery);
    const edges = data?.products?.edges ?? [];
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
