import { unstable_cache } from 'next/cache';
import { GhostRateLimitError, getPosts } from '@/utils';

export const GHOST_POSTS_CACHE_TAG = 'ghost-posts';

export type GhostPostsResult = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[];
  rateLimited?: boolean;
};

/** One shared cache for all Ghost post lists (home, footer, words, etc.). */
export async function getCachedGhostPosts(
  limit = 50
): Promise<GhostPostsResult> {
  try {
    const data = await unstable_cache(
      async () => getPosts(limit),
      [GHOST_POSTS_CACHE_TAG, String(limit)],
      { revalidate: 3600, tags: [GHOST_POSTS_CACHE_TAG] }
    )();
    return { posts: data?.posts ?? [] };
  } catch (error) {
    if (error instanceof GhostRateLimitError) {
      return { posts: [], rateLimited: true };
    }
    console.warn('getCachedGhostPosts failed:', error);
    return { posts: [] };
  }
}
