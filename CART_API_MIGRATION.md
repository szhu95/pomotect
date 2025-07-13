# Cart API Migration Guide

This document outlines the migration from the deprecated Shopify Storefront API Checkout Mutations to the new Cart API.

## What Changed

### Deprecated API (Checkout API)
- `checkoutCreate` → `cartCreate`
- `checkoutLineItemsAdd` → `cartLinesAdd`
- `checkoutLineItemsRemove` → `cartLinesRemove`
- `checkoutLineItemsUpdate` → `cartLinesUpdate`

### Key Differences

1. **Data Structure Changes:**
   - `checkoutId` → `cartId`
   - `lineItems` → `lines`
   - `variantId` → `merchandiseId`
   - `variant` → `merchandise`
   - `webUrl` → `checkoutUrl`
   - `lineItemsSubtotalPrice` → `cost.subtotalAmount`
   - `totalPrice` → `cost.totalAmount`
   - `totalTax` → `cost.totalTaxAmount`

2. **Error Handling:**
   - `checkoutUserErrors` → `userErrors`

3. **Local Storage:**
   - `checkoutId` → `cartId`

## Files Modified

### 1. `components/Cart.tsx`
- Updated all GraphQL mutations and queries
- Changed data structure references
- Updated localStorage key from `checkoutId` to `cartId`

### 2. `components/ProductCta.tsx`
- Updated GraphQL mutations
- Changed data structure references
- Updated localStorage key

### 3. `components/Header.tsx`
- Updated localStorage key reference

## Migration Steps

### Step 1: Deploy the Updated Code
The code has been updated to use the new Cart API. Deploy these changes to your production environment.

### Step 2: Migrate Existing Checkout Data (Optional)
If you have users with existing checkout data in their localStorage, you can use the migration component:

1. **Temporary Migration Component:**
   Add the `CartMigration` component to your main layout temporarily:

   ```tsx
   // In app/layout.tsx or your main layout
   import CartMigration from '@/components/CartMigration';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <CartMigration />
           {children}
         </body>
       </html>
     );
   }
   ```

2. **Run Migration:**
   - The component will automatically detect existing checkout data
   - It will create a new cart with the same items
   - Update localStorage to use the new cart ID
   - Reload the page to reflect changes

3. **Remove Migration Component:**
   After a few days (when you're confident all users have migrated), remove the `CartMigration` component.

### Step 3: Test the Migration
1. **Clear localStorage** and test adding items to cart
2. **Test cart functionality** (add, remove, update quantities)
3. **Test checkout flow** to ensure it works with the new cart system

### Step 4: Monitor for Issues
- Check browser console for any errors
- Monitor cart functionality in production
- Ensure checkout URLs are working correctly

## API Reference

### Cart Creation
```graphql
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

### Add Items to Cart
```graphql
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

### Remove Items from Cart
```graphql
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

### Get Cart Data
```graphql
query getCart($id: ID!) {
  cart(id: $id) {
    id
    checkoutUrl
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Cart not loading:**
   - Check if localStorage has `cartId` instead of `checkoutId`
   - Verify the cart ID is valid

2. **Items not adding to cart:**
   - Ensure you're using `merchandiseId` instead of `variantId`
   - Check that the variant ID is in the correct GID format

3. **Checkout URL not working:**
   - Verify you're using `checkoutUrl` instead of `webUrl`
   - Ensure the cart has items before redirecting

### Debug Commands

Check localStorage:
```javascript
console.log('Cart ID:', localStorage.getItem('cartId'));
console.log('Old checkout ID:', localStorage.getItem('checkoutId'));
```

Clear all cart data:
```javascript
localStorage.removeItem('cartId');
localStorage.removeItem('checkoutId');
localStorage.removeItem('cartItemCount');
```

## Timeline

- **August 8, 2025**: Deadline for migration
- **After deadline**: Checkout API will be permanently disabled
- **Recommendation**: Complete migration as soon as possible

## Support

If you encounter issues during migration:
1. Check the Shopify Cart API documentation
2. Review the GraphQL schema for the latest field names
3. Test with a fresh cart to isolate issues
4. Monitor browser console for error messages

## Files to Remove After Migration

Once migration is complete and stable:
- `components/CartMigration.tsx` (temporary migration component)
- `scripts/migrate-to-cart-api.js` (migration script)
- This migration guide 