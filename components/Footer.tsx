import { DisplayedFooter } from '@/components';
import { getCachedObjectsCollectionProducts } from '@/lib/shopifyObjectsCollection';
import { getPosts } from '@/utils';

export default async function Footer() {
  const [data, objectsResponse] = await Promise.all([
    getPosts().then((posts) =>
      posts ? { posts } : { notFound: true as const }
    ),
    getCachedObjectsCollectionProducts().catch(() => ({
      products: { edges: [] as unknown[] },
    })),
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
