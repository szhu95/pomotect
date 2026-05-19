import { DisplayedFooter } from '@/components';
import { getCachedGhostPosts } from '@/lib/ghostPosts';
import { getCachedObjectsCollectionProducts } from '@/lib/shopifyObjectsCollection';

export default async function Footer() {
  const [ghostData, objectsResponse] = await Promise.all([
    getCachedGhostPosts(),
    getCachedObjectsCollectionProducts().catch(() => ({
      products: { edges: [] as unknown[] },
    })),
  ]);

  const response = { posts: ghostData?.posts ?? [] };
  const objects =
    objectsResponse?.products != null
      ? objectsResponse
      : { products: { edges: [] } };

  return (
    <DisplayedFooter response={response} objectsResponse={objects} />
  );
}
