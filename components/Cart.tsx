"use client";
import { storefront } from '@/utils';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import { CustomButton } from '.';
import Link from 'next/link';
import localFont from 'next/font/local';
import { useCart } from '@/context/CartContext';

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});


const gql = String.raw;

const getVariantQuery = gql`
query getVariant($id: ID!) {
  node(id: $id) {
    id
    ... on ProductVariant {
      id
      title
      price {
        amount
        currencyCode
      }
      image {
        altText
        height
        width
        url
      }
      product {
        handle
        title
      }
      quantityAvailable
    }
  }
}
`;

const searchVariantQuery = gql`
query searchVariant($query: String!) {
  productVariants(first: 1, query: $query) {
    edges {
      node {
        id
        title
        price {
          amount
          currencyCode
        }
        image {
          altText
          height
          width
          url
        }
        product {
          handle
          title
        }
        quantityAvailable
      }
    }
  }
}
`;

const removeLineItemFromCartQuery = gql`
mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
  checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
    checkout {
      id
      webUrl
      lineItems(first: 10) {
        edges {
          node {
            id
            quantity
            variant {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
  }
  checkoutUserErrors {
      field
      message
    }
  }
}
`

const getCheckoutLineItemsQuery = gql`
query getCheckoutLineItemsFromNode($id: ID!) {
  node(id: $id) {
    id
    ... on Checkout {
      id
      webUrl
      order {
        id
      }
      lineItems(first: 5) {
         edges {
           node {
             id
             title
             quantity
             variant {
              id
              image {
                altText
                height
                width
                url
              }
              product {
                handle
             }
              title
              price {
                amount
                currencyCode
              }
            }
           }
         }
       }
      lineItemsSubtotalPrice {
        amount
        currencyCode
      },
      subtotalPrice {
        amount
        currencyCode
      },
      totalTax {
        amount
        currencyCode
      },
      totalPrice {
        amount
        currencyCode
      },
      updatedAt
    }
  }
}
  `;

async function getCart() {
  if (localStorage.getItem("checkoutId")) {
    let id = localStorage.getItem("checkoutId");
    const { data } = await storefront(getCheckoutLineItemsQuery, {
      "id": id
    })

    return data;
  }
}

async function getVariant(variantId: string) {
  try {
    // Convert variantId to proper Shopify GID format if it's not already
    let formattedVariantId = variantId;
    if (!variantId.startsWith('gid://')) {
      // If it's just a number or doesn't have the GID prefix, add it
      formattedVariantId = `gid://shopify/ProductVariant/${variantId}`;
    }
    
    console.log('Trying to fetch variant with formatted ID:', formattedVariantId);
    
    const { data } = await storefront(getVariantQuery, {
      "id": formattedVariantId
    });
    
    if (data?.node) {
      return data;
    }
    
    // If direct lookup fails, try searching by the original variantId
    console.log('Direct lookup failed, trying search with:', variantId);
    const searchData = await storefront(searchVariantQuery, {
      "query": variantId
    });
    
    if (searchData?.data?.productVariants?.edges?.length > 0) {
      return {
        node: searchData.data.productVariants.edges[0].node
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching variant:', error);
    
    // Try fallback search if direct lookup fails
    try {
      console.log('Trying fallback search with:', variantId);
      const searchData = await storefront(searchVariantQuery, {
        "query": variantId
      });
      
      if (searchData?.data?.productVariants?.edges?.length > 0) {
        return {
          node: searchData.data.productVariants.edges[0].node
        };
      }
    } catch (searchError) {
      console.error('Fallback search also failed:', searchError);
    }
    
    return null;
  }
}

async function addToCart(variant_id: string, providedQuantity: number) {
  const gql = String.raw;

  // Convert variant_id to proper Shopify GID format if it's not already
  let formattedVariantId = variant_id;
  if (!variant_id.startsWith('gid://')) {
    formattedVariantId = `gid://shopify/ProductVariant/${variant_id}`;
  }

  const addToCheckoutQuery = gql`
mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
  checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
    checkout {
      id
      webUrl
      lineItems(first: 10) {
        edges {
          node {
            id
            quantity
            variant {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      paymentDue {
        amount
        currencyCode
      }
      subtotalPrice {
        amount
        currencyCode
      }
      totalTax {
        amount
        currencyCode
      }
      totalPrice {
          amount
          currencyCode
      }
    }
    checkoutUserErrors {
      field
      message
    }
  }
}
`;

  const createCheckoutQuery = gql`
mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      id
      webUrl
      lineItems(first: 5) {
         edges {
           node {
             title
             quantity
           }
         }
       }
    }
    checkoutUserErrors {
      field
      message
    }
  }
}
  `;

  async function createCheckout() {
    const { data } = await storefront(createCheckoutQuery, {
      "input": {
        "lineItems": {
          "variantId": formattedVariantId,
          "quantity": providedQuantity
        }
      }
    })

    localStorage.setItem("checkoutId", data.checkoutCreate.checkout.id);
    return data.checkoutCreate.checkout;
  }

  if (!localStorage.getItem("checkoutId")) {
    const checkout = await createCheckout();
    return checkout;
  }

  const response = await storefront(addToCheckoutQuery, {
    "checkoutId": localStorage.getItem("checkoutId"),
    "lineItems": {
      "variantId": formattedVariantId,
      "quantity": providedQuantity
    }
  })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  return response?.data?.checkoutLineItemsAdd?.checkout;
}

interface CartProps {
  variantId?: string;
  quantity?: number;
  variants?: Array<{ variantId: string; quantity: number }>;
}

export default function Cart({ variantId, quantity: providedQuantity = 1, variants }: CartProps) {
  const checkoutRef = useRef<string | null>(null);
  const { updateCartItemCount } = useCart();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [cart, setCart] = useState('');
  const [data, setData] = useState(null) as any;
  const [variantData, setVariantData] = useState(null) as any;
  const [variantsData, setVariantsData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [total, setTotal] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function removeItemFromCart(variantId: any) {
    if (localStorage.getItem("checkoutId")) {
      setIsLoading(true);
      let id = localStorage.getItem("checkoutId");
      await storefront(removeLineItemFromCartQuery, {
        "checkoutId": id,
        "lineItemIds": [
          variantId
        ]
      }).then(retrieveCart)
    }
  }

  const retrieveCart = useCallback(async () => {
    let response = (await getCart()) as any;

    if (response?.node.order?.id) {
      setCart('');
      setIsLoading(false);
      if (localStorage.getItem("checkoutId")) {
        localStorage.removeItem("checkoutId");
      }
      // Also remove cartItemCount from localStorage when checkout is complete
      localStorage.removeItem("cartItemCount");
      updateCartItemCount(0);
      return;
    }
    setData(response ? response : '');
    setCheckoutUrl(response ? response.node.webUrl : '');
    setTotal(response ? response.node?.lineItemsSubtotalPrice.amount : '0.0');
    
    // Calculate total quantity across all line items
    const totalQuantity = response?.node?.lineItems.edges.reduce((sum: number, edge: any) => {
      return sum + (edge.node.quantity || 0);
    }, 0) || 0;
    
    setQuantity(totalQuantity);
    updateCartItemCount(totalQuantity);
    setSalePrice(response ? response.node?.totalPrice.amount : '0.0');
    setIsLoading(false);
  }, [updateCartItemCount])

  const retrieveVariant = useCallback(async () => {
    if (variantId && providedQuantity > 0) {
      setIsLoading(true);
      
      // Clear any existing checkout for variant-only view
      if (localStorage.getItem("checkoutId")) {
        localStorage.removeItem("checkoutId");
      }
      
      const variantResponse = await getVariant(variantId);
      setVariantData(variantResponse);
      
      // Create checkout and store in localStorage for single variant
      if (variantResponse?.node?.id) {
        const checkout = await addToCart(variantResponse.node.id, providedQuantity);
        if (checkout?.id) {
          localStorage.setItem("checkoutId", checkout.id);
          // Update cart count in header
          updateCartItemCount(providedQuantity);
        }
      }
      
      setIsLoading(false);
    }
  }, [variantId, providedQuantity, updateCartItemCount])

  const retrieveVariants = useCallback(async () => {
    if (variants && variants.length > 0) {
      // Filter out variants with zero or negative quantities
      const validVariants = variants.filter(variant => variant.quantity > 0);
      
      if (validVariants.length === 0) {
        // If no valid variants, redirect to empty cart
        window.location.href = '/cart';
        return;
      }
      
      setIsLoading(true);
      
      // Clear any existing checkout for variant-only view
      if (localStorage.getItem("checkoutId")) {
        localStorage.removeItem("checkoutId");
      }
      
      const variantsResponses = await Promise.all(
        validVariants.map(async (variant) => {
          const response = await getVariant(variant.variantId);
          return {
            ...variant,
            data: response
          };
        })
      );
      
      setVariantsData(variantsResponses);
      
      // Create checkout and store in localStorage for multiple variants
      if (variantsResponses.length > 0 && variantsResponses[0].data?.node?.id) {
        const firstVariant = variantsResponses[0];
        let checkout = await addToCart(firstVariant.variantId, firstVariant.quantity);
        
        // Add remaining variants to the same checkout
        for (let i = 1; i < variantsResponses.length; i++) {
          const variant = variantsResponses[i];
          if (variant.data?.node?.id) {
            checkout = await addToCart(variant.data.node.id, variant.quantity);
          }
        }
        
        if (checkout?.id) {
          localStorage.setItem("checkoutId", checkout.id);
          // Update cart count in header - sum of all quantities
          const totalQuantity = validVariants.reduce((sum, variant) => sum + variant.quantity, 0);
          updateCartItemCount(totalQuantity);
        }
      }
      
      setIsLoading(false);
    }
  }, [variants, updateCartItemCount])

  function resetCart() {
    setCart('');
    setIsLoading(false);
    if (localStorage.getItem("checkoutId"))
      localStorage.removeItem("checkoutId");
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIsLoading(true);
      checkoutRef.current = localStorage.getItem("checkoutId");
      setCart(checkoutRef.current ? checkoutRef.current : '');
      
      // If variants array is provided, fetch multiple variants
      if (variants && variants.length > 0) {
        retrieveVariants().catch(err => {
          console.error('Error fetching variants:', err);
          setIsLoading(false);
        });
      }
      // If single variantId is provided, fetch single variant data
      else if (variantId) {
        retrieveVariant().catch(err => {
          console.error('Error fetching variant:', err);
          setIsLoading(false);
        });
      } else {
        // Otherwise, fetch cart data
        retrieveCart().catch(err =>
          resetCart());
      }
    }
  }, [retrieveCart, retrieveVariant, retrieveVariants, variantId, variants]);

  return (
    <div>
      <div className="grid grid-cols-4 cart-details-header">
        <div className={`text-white ${pomotectFont.className}`}>Image</div>
        <div className={`text-white ${pomotectFont.className}`}>Quantity</div>
        <div className={`text-white ${pomotectFont.className}`}>Price</div>
        <div className={`text-white ${pomotectFont.className}`}>Product</div>
      </div>
      {
        // If variants array is provided, show multiple variants from Shopify
        variants && variants.length > 0 ? (
          isLoading ? (
            <svg
              className={"block m-auto my-6 animate-spin h-5 w-5"}
              viewBox={"0 0 24 24"}
              fill={"none"}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : variantsData.length > 0 ? (
            variantsData.map((variant, index) => {
              const variantNode = variant.data?.node;
              if (!variantNode) return null;
              
              return (
                <div key={index} className="grid grid-cols-4 border-y border-black my-2 py-2 pl-2">
                  <div>
                    <Link
                      href={`/products/${variantNode.product.handle}`}
                      className={"block max-w-[100px]"}
                    >
                      <Image
                        className="border-2 border-dashed border-terracotta py-2 max-h-28"
                        src={variantNode.image?.url || '/placeholder-image.jpg'}
                        width={100}
                        height={250}
                        alt={variantNode.image?.altText || "product image"}
                      />
                    </Link>
                  </div>
                  <div className={`${pomotectFont.className} pl-1`}>{variant.quantity}</div>
                  <div className={`${pomotectFont.className}`}>{formatter.format(Number(variantNode.price.amount) * variant.quantity)}</div>
                  <div className={`${pomotectFont.className}`}>
                    {variantNode.product.title} <br></br>
                    <div className={`${pomotectFont.className} italic`}>{variantNode.title}</div> <br></br>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`${pomotectFont.className} py-6 text-center`}>
              <div className={`${pomotectFont.className} text-center`}>YOUR CART IS EMPTY</div>
              <Link 
                href="/products" 
                className={`${pomotectFont.className} text-sm text-blue-600 hover:text-blue-800 underline mt-4 block`}
              >
                Browse All Products
              </Link>
            </div>
          )
        ) : variantId ? (
          // Single variant logic
          isLoading ? (
            <svg
              className={"block m-auto my-6 animate-spin h-5 w-5"}
              viewBox={"0 0 24 24"}
              fill={"none"}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : variantData?.node ? (
            <div className="grid grid-cols-4 border-y border-black my-2 py-2 pl-2">
              <div>
                <Link
                  href={`/products/${variantData.node.product.handle}`}
                  className={"block max-w-[100px]"}
                >
                  <Image
                    className="border-2 border-dashed border-terracotta py-2 max-h-28"
                    src={variantData.node.image?.url || '/placeholder-image.jpg'}
                    width={100}
                    height={250}
                    alt={variantData.node.image?.altText || "product image"}
                  />
                </Link>
              </div>
              <div className={`${pomotectFont.className} pl-1`}>{providedQuantity}</div>
              <div className={`${pomotectFont.className}`}>{formatter.format(Number(variantData.node.price.amount) * providedQuantity)}</div>
              <div className={`${pomotectFont.className}`}>
                {variantData.node.product.title} <br></br>
                <div className={`${pomotectFont.className} italic`}>{variantData.node.title}</div> <br></br>
              </div>
            </div>
          ) : (
            <div className={`${pomotectFont.className} py-6 text-center`}>
              <div>VARIANT NOT FOUND: {variantId}</div>
              <div className="text-sm text-gray-600 mt-2">
                The variant ID "{variantId}" could not be found in the store.
              </div>
              <Link 
                href="/products" 
                className={`${pomotectFont.className} text-sm text-blue-600 hover:text-blue-800 underline mt-4 block`}
              >
                Browse All Products
              </Link>
            </div>
          )
        ) : (
          // Original cart logic for when no variantId is provided
          !cart || (!isLoading && data.node?.lineItems.edges.length === 0) ? <div className={`${pomotectFont.className} py-6 text-center`}>YOUR CART IS EMPTY</div> :
            (!isLoading && data ? (() => {
              const filteredItems = data.node?.lineItems.edges.filter((item: any) => {
                // If variantId is provided, only show items that match
                if (variantId) {
                  return item.node.variant?.id === variantId;
                }
                return true; // Show all items if no variantId
              });
              
              if (variantId && filteredItems.length === 0) {
                return <div className={`${pomotectFont.className} py-6 text-center`}>NO ITEMS FOUND FOR VARIANT ID: {variantId}</div>;
              }
              
              return filteredItems.map((item: any, i: React.Key | null | undefined) => {
                const isHighlighted = variantId && item.node.variant?.id === variantId;
                
                return (
                  <div 
                    key={i} 
                    className={`grid grid-cols-4 border-y border-black my-2 py-2 pl-2 ${
                      isHighlighted ? 'bg-yellow-50 border-2 border-yellow-400' : ''
                    }`}
                  >
                    <div>
                      <Link
                        key={item.node.variant?.product.handle}
                        href={`/products/${item.node.variant?.product.handle}`}
                        className={"block max-w-[100px]"}
                      >
                        <Image
                          className="border-2 border-dashed border-terracotta py-2 max-h-28"
                          src={item.node.variant?.image.url}
                          width={100}
                          height={250}
                          alt="product image"
                        />
                      </Link>
                    </div>
                    <div className={`${pomotectFont.className} pl-1`}>{item.node.quantity}</div>
                    <div className={`${pomotectFont.className}`}>{formatter.format(Number(item.node.variant?.price.amount) * Number(item.node.quantity))}</div>
                    <div className={`${pomotectFont.className}`}>
                      {item.node.title} <br></br>
                      <div className={`${pomotectFont.className} italic`}>{item.node.variant?.title}</div> <br></br>
                      {isHighlighted && (
                        <div className={`${pomotectFont.className} text-xs text-yellow-600 mb-1`}>
                          ★ Highlighted Variant
                        </div>
                      )}
                      <CustomButton title={'REMOVE'} containerStyles="flex bg-terracotta py-0 float-right mt-7" textColor={`text-white ${pomotectFont.className}`} handleClick={() => removeItemFromCart(item.node.id)} />
                    </div>
                  </div>
                )
              });
            })() :
              <svg
                className={"block m-auto my-6 animate-spin h-5 w-5"}
                viewBox={"0 0 24 24"}
                fill={"none"}
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )
        )
      }
      <div className={`${pomotectFont.className} text-right pr-2 font-semibold pb-2 italic border-b-2 border-terracotta`}>TOTAL BEFORE TAXES + SHIPPING</div>
      <div className={`text-right pr-2 font-semibold pt-2 mb-2 ${pomotectFont.className}`}>
        {variants && variants.length > 0 ? 
          formatter.format(
            variantsData.reduce((sum, variant) => {
              const variantNode = variant.data?.node;
              if (variantNode) {
                return sum + (Number(variantNode.price.amount) * variant.quantity);
              }
              return sum;
            }, 0)
          ) : variantId && variantData?.node ? 
          formatter.format(Number(variantData.node.price.amount) * providedQuantity) : 
          formatter.format(Number(total))
        }
      </div>
      {/* {
        !cart || isLoading || (!isLoading && data.node?.totalPrice.amount === '0.0') ? <></> : <div>
          <div className={`text-right pr-2 font-semibold pt-2 mb-2 text-primary-blue ${pomotectFont.className} border-b-2 border-primary-blue`}>SALE DISCOUNT: -{formatter.format(Number(total) - Number(salePrice))}</div>
          <div className={`text-right pr-2 font-semibold pt-2 mb-2 ${pomotectFont.className}`}>SUBTOTAL: {formatter.format(Number(salePrice))}</div>
        </div> 
      } */}
      {variants && variants.length > 0 ? (
        // For multiple variants, redirect to existing checkout URL
        <button 
          onClick={async () => {
            if (variantsData.length > 0) {
              setIsAddingToCart(true);
              
              // Get the existing checkout URL from localStorage
              const existingCheckoutId = localStorage.getItem("checkoutId");
              if (existingCheckoutId) {
                // Fetch the checkout to get the webUrl
                const checkout = await getCart();
                if (checkout?.node?.webUrl) {
                  window.location.href = checkout.node.webUrl;
                } else {
                  window.location.href = '/cart';
                }
              } else {
                window.location.href = '/cart';
              }
            }
          }}
          className={`${pomotectFont.className} float-right px-4 bg-terracotta text-white italic font-semibold`}
        >
          {isAddingToCart ? 'CHECKING OUT...' : 'CHECKOUT'}
        </button>
      ) : variantId ? (
        // For variant-only view, redirect to existing checkout URL
        <button 
          onClick={async () => {
            if (variantData?.node?.id) {
              setIsAddingToCart(true);
              
              // Get the existing checkout URL from localStorage
              const existingCheckoutId = localStorage.getItem("checkoutId");
              if (existingCheckoutId) {
                // Fetch the checkout to get the webUrl
                const checkout = await getCart();
                if (checkout?.node?.webUrl) {
                  window.location.href = checkout.node.webUrl;
                } else {
                  window.location.href = '/cart';
                }
              } else {
                window.location.href = '/cart';
              }
            }
          }}
          className={`${pomotectFont.className} float-right px-4 bg-terracotta text-white italic font-semibold`}
        >
          {isAddingToCart ? 'CHECKING OUT...' : 'CHECKOUT'}
        </button>
      ) : (
        // Original cart logic
        quantity === 0 || isLoading ? <Link href={checkoutUrl} scroll={false} className={`${pomotectFont.className} float-right px-4 bg-slate-300 aria-disabled pointer-events-none text-white italic font-semibold`} tabIndex={-1}>CHECKOUT</Link> : <Link href={checkoutUrl} scroll={false} className={`${pomotectFont.className} float-right px-4 bg-terracotta text-white italic font-semibold`}>CHECKOUT</Link>
      )}
    </div>
  )
}
