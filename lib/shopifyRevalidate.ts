import { revalidatePath, revalidateTag } from 'next/cache';
import { OBJECTS_COLLECTION_CACHE_TAG } from '@/lib/shopifyObjectsCollection';

export const SHOPIFY_PRODUCTS_CACHE_TAG = 'shopify-products';

export function productCacheTag(handle: string) {
  return `product-${handle}`;
}

/** Bust Objects grid, footer ticker, and optional product detail cache. */
export function revalidateShopifyCatalog(productHandle?: string) {
  revalidateTag(OBJECTS_COLLECTION_CACHE_TAG);
  revalidateTag(SHOPIFY_PRODUCTS_CACHE_TAG);
  revalidatePath('/products');

  if (productHandle) {
    revalidateTag(productCacheTag(productHandle));
    revalidatePath(`/products/${productHandle}`);
  }
}
