/**
 * Shared rules for inquiry-only vs purchasable products and displayed list/PDP pricing.
 */

export function productRequiresInquiry(tags: unknown): boolean {
  return Array.isArray(tags) && tags.includes('furniture');
}

export type DisplayedPricing = { price: number; compareAtPrice: number | null };

export function getDisplayedProductPricing(
  product: any,
  requiresInquiry: boolean
): DisplayedPricing {
  if (!product?.priceRange?.minVariantPrice?.amount) {
    return { price: 0, compareAtPrice: null };
  }

  let minDiscountedPrice: number | null = null;
  let compareAtPrice: number | null = null;
  let minRegularPrice = parseFloat(product.priceRange.minVariantPrice.amount);

  const variantEdges = product.variants?.edges;
  if (Array.isArray(variantEdges)) {
    for (const variantEdge of variantEdges) {
      const variant = variantEdge?.node;
      if (!variant) continue;
      const variantPriceAmount =
        variant.price?.amount || product.priceRange.minVariantPrice.amount;
      if (!variantPriceAmount) continue;
      const variantPrice = parseFloat(variantPriceAmount);
      if (variantPrice < minRegularPrice) minRegularPrice = variantPrice;
      if (variant.compareAtPrice?.amount) {
        const variantCompareAtPrice = parseFloat(variant.compareAtPrice.amount);
        if (variantCompareAtPrice > variantPrice) {
          if (minDiscountedPrice === null || variantPrice < minDiscountedPrice) {
            minDiscountedPrice = variantPrice;
            compareAtPrice = variantCompareAtPrice;
          }
        }
      }
    }
  }

  if (minDiscountedPrice !== null && compareAtPrice !== null) {
    return { price: minDiscountedPrice, compareAtPrice };
  }

  const tags = product.tags;
  const eligibleSale =
    !requiresInquiry &&
    Array.isArray(tags) &&
    (tags.includes('bf-30-off') ||
      tags.includes('sale') ||
      tags.includes('discount'));

  if (eligibleSale) {
    return { price: minRegularPrice * 0.7, compareAtPrice: minRegularPrice };
  }

  return { price: minRegularPrice, compareAtPrice: null };
}
