// Migration script to convert from Checkout API to Cart API
// Run this script to migrate any existing checkout data to the new cart system

const gql = String.raw;

// Cart creation mutation
const createCartQuery = gql`
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
`;

// Get checkout data (for migration)
const getCheckoutQuery = gql`
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
`;

async function storefront(query, variables = {}) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors.map(err => err.message).join(', '));
  }

  return data;
}

async function migrateCheckoutToCart(checkoutId) {
  try {
    console.log(`Migrating checkout ${checkoutId} to cart...`);
    
    // Get checkout data
    const checkoutData = await storefront(getCheckoutQuery, { id: checkoutId });
    const checkout = checkoutData.data.node;
    
    if (!checkout || !checkout.lineItems) {
      console.log('No valid checkout data found');
      return null;
    }
    
    // Prepare cart lines from checkout items
    const lines = checkout.lineItems.edges.map(edge => ({
      merchandiseId: edge.node.variant.id,
      quantity: edge.node.quantity
    }));
    
    // Create new cart with the same items
    const cartData = await storefront(createCartQuery, {
      input: { lines }
    });
    
    const cart = cartData.data.cartCreate.cart;
    console.log(`Successfully created cart ${cart.id}`);
    
    return cart.id;
  } catch (error) {
    console.error(`Failed to migrate checkout ${checkoutId}:`, error.message);
    return null;
  }
}

// Migration function for browser environment
export async function migrateExistingCheckouts() {
  if (typeof window === 'undefined') {
    console.log('This script should be run in the browser');
    return;
  }
  
  const oldCheckoutId = localStorage.getItem('checkoutId');
  
  if (!oldCheckoutId) {
    console.log('No existing checkout found to migrate');
    return;
  }
  
  console.log('Found existing checkout, migrating to cart...');
  
  try {
    const newCartId = await migrateCheckoutToCart(oldCheckoutId);
    
    if (newCartId) {
      // Update localStorage
      localStorage.removeItem('checkoutId');
      localStorage.setItem('cartId', newCartId);
      
      console.log('Migration completed successfully!');
      console.log(`Old checkout ID: ${oldCheckoutId}`);
      console.log(`New cart ID: ${newCartId}`);
      
      // Optionally reload the page to reflect changes
      if (confirm('Migration completed! Reload the page to see the updated cart?')) {
        window.location.reload();
      }
    } else {
      console.log('Migration failed, keeping existing checkout');
    }
  } catch (error) {
    console.error('Migration error:', error);
  }
}

// Auto-run migration if this script is loaded
if (typeof window !== 'undefined') {
  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateExistingCheckouts);
  } else {
    migrateExistingCheckouts();
  }
} 