"use client";
import { useEffect } from 'react';

// Migration script to convert from Checkout API to Cart API
const migrateExistingCheckouts = async () => {
  if (typeof window === 'undefined') {
    return;
  }
  
  const oldCheckoutId = localStorage.getItem('checkoutId');
  
  if (!oldCheckoutId) {
    console.log('No existing checkout found to migrate');
    return;
  }
  
  console.log('Found existing checkout, migrating to cart...');
  
  try {
    // Get checkout data
    const checkoutData = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
          query getCheckout($id: ID!) {
            node(id: $id) {
              id
              ... on Checkout {
                id
                lineItems(first: 10) {
                  edges {
                    node {
                      id
                      title
                      quantity
                      variant {
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
            }
          }
        `,
        variables: { id: oldCheckoutId }
      }),
    });

    const checkoutResponse = await checkoutData.json();
    const checkout = checkoutResponse.data.node;
    
    if (!checkout || !checkout.lineItems) {
      console.log('No valid checkout data found');
      return;
    }
    
    // Prepare cart lines from checkout items
    const lines = checkout.lineItems.edges.map((edge: any) => ({
      merchandiseId: edge.node.variant.id,
      quantity: edge.node.quantity
    }));
    
    // Create new cart with the same items
    const cartData = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
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
                          price {
                            amount
                            currencyCode
                          }
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
        `,
        variables: { input: { lines } }
      }),
    });

    const cartResponse = await cartData.json();
    const cart = cartResponse.data.cartCreate.cart;
    
    if (cart && cart.id) {
      // Update localStorage
      localStorage.removeItem('checkoutId');
      localStorage.setItem('cartId', cart.id);
      
      console.log('Migration completed successfully!');
      console.log(`Old checkout ID: ${oldCheckoutId}`);
      console.log(`New cart ID: ${cart.id}`);
      
      // Reload the page to reflect changes
      window.location.reload();
    } else {
      console.log('Migration failed, keeping existing checkout');
    }
  } catch (error) {
    console.error('Migration error:', error);
  }
};

export default function CartMigration() {
  useEffect(() => {
    // Run migration once when component mounts
    migrateExistingCheckouts();
  }, []);

  // This component doesn't render anything
  return null;
} 