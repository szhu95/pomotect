"use client";
import { storefront } from '@/utils';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import { CustomButton, QuantityAdjuster } from '.';
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
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
`

const updateCartLineQuery = gql`
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
    userErrors {
      field
      message
    }
  }
}
`

const getCartQuery = gql`
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
    updatedAt
  }
}
`;

async function getCart() {
  if (localStorage.getItem("cartId")) {
    let id = localStorage.getItem("cartId");

    const { data } = await storefront(getCartQuery, {
      "id": id
    })

    return data;
  }
  
  return null;
}

async function getVariant(variantId: string) {
  try {
    // Convert variantId to proper Shopify GID format if it's not already
    let formattedVariantId = variantId;
    if (!variantId.startsWith('gid://')) {
      // If it's just a number or doesn't have the GID prefix, add it
      formattedVariantId = `gid://shopify/ProductVariant/${variantId}`;
    }
    

    
    const { data } = await storefront(getVariantQuery, {
      "id": formattedVariantId
    });
    
    if (data?.node) {
      return data;
    }
    
    // If direct lookup fails, try searching by the original variantId

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

  const addToCartQuery = gql`
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
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
    userErrors {
      field
      message
    }
  }
}
`;

  const createCartQuery = gql`
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 5) {
         edges {
           node {
             quantity
             merchandise {
               ... on ProductVariant {
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
  `;

  async function createCart() {

    const { data } = await storefront(createCartQuery, {
      "input": {
        "lines": [{
          "merchandiseId": formattedVariantId,
          "quantity": providedQuantity
        }]
      }
    })

    localStorage.setItem("cartId", data.cartCreate.cart.id);
    return data.cartCreate.cart;
  }

  if (!localStorage.getItem("cartId")) {
    const cart = await createCart();
    return cart;
  }

  
  const response = await storefront(addToCartQuery, {
    "cartId": localStorage.getItem("cartId"),
    "lines": [{
      "merchandiseId": formattedVariantId,
      "quantity": providedQuantity
    }]
  })
    .catch((error) => {
      console.error('Error adding to cart:', error);
    });
  
  
  return response?.data?.cartLinesAdd?.cart;
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
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [isTotalFlashing, setIsTotalFlashing] = useState(false);

  async function removeItemFromCart(variantId: any) {
    if (localStorage.getItem("cartId")) {
      setIsLoading(true);
      let id = localStorage.getItem("cartId");
      await storefront(removeLineItemFromCartQuery, {
        "cartId": id,
        "lineIds": [
          variantId
        ]
      }).then(retrieveCart)
    }
  }

  async function updateCartLineQuantity(lineId: string, quantity: number) {
    if (localStorage.getItem("cartId") && quantity > 0) {
      setIsLoading(true);
      let id = localStorage.getItem("cartId");
  
      
      const response = await storefront(updateCartLineQuery, {
        "cartId": id,
        "lines": [{
          "id": lineId,
          "quantity": quantity
        }]
      }).catch((error) => {
        console.error('Error updating cart line:', error);
        setIsLoading(false);
      });
      
  
      
      if (response?.data?.cartLinesUpdate?.cart) {
        // Update the cart data directly instead of refetching
        setData({ cart: response.data.cartLinesUpdate.cart });
        setCheckoutUrl(response.data.cartLinesUpdate.cart.checkoutUrl);
        setTotal(response.data.cartLinesUpdate.cart.cost?.subtotalAmount.amount || '0.0');
        setSalePrice(response.data.cartLinesUpdate.cart.cost?.totalAmount.amount || '0.0');
        
        // Calculate total quantity across all line items
        const totalQuantity = response.data.cartLinesUpdate.cart.lines.edges.reduce((sum: number, edge: any) => {
          return sum + (edge.node.quantity || 0);
        }, 0);
        
        setQuantity(totalQuantity);
        updateCartItemCount(totalQuantity);
        
        // Trigger flash animation for total price
        setIsTotalFlashing(true);
        setTimeout(() => setIsTotalFlashing(false), 300);
      }
      
      setIsLoading(false);
    } else if (quantity === 0) {
      // If quantity is 0, remove the item
      await removeItemFromCart(lineId);
    }
  }

  const retrieveCart = useCallback(async () => {
    let response = (await getCart()) as any;

    // Check if cart exists and has items
    if (!response?.cart) {
      setCart('');
      setIsLoading(false);
      return;
    }
    setData(response ? response : '');
          let checkoutUrl = response ? response.cart.checkoutUrl : '';
      if (checkoutUrl) {
        checkoutUrl = checkoutUrl
          .replace(/^https?:\/\/pomotect\.com\/cart\/c\//, 'https://pomotect.myshopify.com/checkouts/cn/')
          .replace(/\?key=[^&]+$/, '');
      }
    setCheckoutUrl(checkoutUrl);
    setTotal(response ? response.cart?.cost?.subtotalAmount.amount : '0.0');
    
    // Calculate total quantity across all line items
    const totalQuantity = response?.cart?.lines.edges.reduce((sum: number, edge: any) => {
      return sum + (edge.node.quantity || 0);
    }, 0) || 0;
    
    setQuantity(totalQuantity);
    updateCartItemCount(totalQuantity);
    setSalePrice(response ? response.cart?.cost?.totalAmount.amount : '0.0');
    setIsLoading(false);
  }, [updateCartItemCount])

  const retrieveVariant = useCallback(async () => {
    if (variantId && providedQuantity > 0) {
      setIsLoading(true);
      
      // Clear any existing checkout for variant-only view
      if (localStorage.getItem("cartId")) {
        localStorage.removeItem("cartId");
      }
      
      const variantResponse = await getVariant(variantId);
      setVariantData(variantResponse);
      
      // Create checkout and store in localStorage for single variant
      if (variantResponse?.node?.id) {
        const cart = await addToCart(variantResponse.node.id, providedQuantity);
        if (cart?.id) {
          localStorage.setItem("cartId", cart.id);
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
      if (localStorage.getItem("cartId")) {
        localStorage.removeItem("cartId");
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
        let cart = await addToCart(firstVariant.variantId, firstVariant.quantity);
        
        // Add remaining variants to the same checkout
        for (let i = 1; i < variantsResponses.length; i++) {
          const variant = variantsResponses[i];
          if (variant.data?.node?.id) {
            cart = await addToCart(variant.data.node.id, variant.quantity);
          }
        }
        
        if (cart?.id) {
          localStorage.setItem("cartId", cart.id);
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
    if (localStorage.getItem("cartId"))
      localStorage.removeItem("cartId");
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIsLoading(true);
      checkoutRef.current = localStorage.getItem("cartId");
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
                <div key={index} className="grid grid-cols-4 border-y border-black my-2 py-2 pl-2 transition-all duration-300 ease-in-out">
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
                  <div className={`${pomotectFont.className} pl-1`}>
                    <QuantityAdjuster
                      quantity={variant.quantity}
                      onQuantityChange={(newQuantity) => {
                        // For multiple variants view, we need to update the specific variant
                        if (variant.data?.node?.id) {
                          // This would need to be implemented for multiple variants
                      
                        }
                      }}
                      isLoading={updatingItemId === variant.data?.node?.id}
                    />
                  </div>
                  <div className={`${pomotectFont.className}`}>{formatter.format(Number(variantNode.price.amount) * variant.quantity)}</div>
                  <div className={`${pomotectFont.className}`}>
                    {variantNode.product.title} <br></br>
                    <div className={`${pomotectFont.className} italic`}>{variantNode.title}</div> <br></br>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid grid-cols-4 my-2 py-6">
              <div className="col-span-4 text-center">
                <div className={`${pomotectFont.className} py-6 text-center`}>YOUR CART IS EMPTY</div>
                <Link 
                  href="/products" 
                  className={`${pomotectFont.className} text-sm text-blue-600 hover:text-blue-800 underline mt-4 block`}
                >
                  Browse All Products
                </Link>
              </div>
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
            <div className="grid grid-cols-4 border-y border-black my-2 py-2 pl-2 transition-all duration-300 ease-in-out">
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
              <div className={`${pomotectFont.className} pl-1`}>
                <QuantityAdjuster
                  quantity={providedQuantity}
                  onQuantityChange={(newQuantity) => {
                    // For single variant view, we need to update the cart
                    if (variantData?.node?.id) {
                      updateCartLineQuantity(localStorage.getItem("cartId") || "", newQuantity);
                    }
                  }}
                  isLoading={updatingItemId === localStorage.getItem("cartId")}
                />
              </div>
              <div className={`${pomotectFont.className}`}>{formatter.format(Number(variantData.node.price.amount) * providedQuantity)}</div>
              <div className={`${pomotectFont.className}`}>
                {variantData.node.product.title} <br></br>
                <div className={`${pomotectFont.className} italic`}>{variantData.node.title}</div> <br></br>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 my-2 py-6">
              <div className="col-span-4 text-center">
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
              </div>
            </div>
          )
        ) : (
          // Original cart logic for when no variantId is provided
          !cart || (data?.cart?.lines?.edges?.length === 0) ? (
            <div className="grid grid-cols-4 my-2 py-6 animate-slideUp">
              <div className="col-span-4 text-center">
                <div className={`${pomotectFont.className} py-6 text-center`}>YOUR CART IS EMPTY</div>
              </div>
            </div>
          ) :
            (data ? (() => {
              const filteredItems = data.cart?.lines.edges.filter((item: any) => {
                // If variantId is provided, only show items that match
                if (variantId) {
                  return item.node.merchandise?.id === variantId;
                }
                return true; // Show all items if no variantId
              });
              
              if (variantId && filteredItems.length === 0) {
                return <div className={`${pomotectFont.className} py-6 text-center`}>NO ITEMS FOUND FOR VARIANT ID: {variantId}</div>;
              }
              
              return filteredItems.map((item: any, i: React.Key | null | undefined) => {
                const isHighlighted = variantId && item.node.merchandise?.id === variantId;
                
                return (
                  <div 
                    key={i} 
                    className={`grid grid-cols-4 border-y border-black my-2 py-2 pl-2 transition-all duration-300 ease-in-out ${
                      isHighlighted ? 'bg-yellow-50 border-2 border-yellow-400' : ''
                    }`}
                  >
                    <div>
                      <Link
                        key={item.node.merchandise?.product.handle}
                        href={`/products/${item.node.merchandise?.product.handle}`}
                        className={"block max-w-[100px]"}
                      >
                        <Image
                          className="border-2 border-dashed border-terracotta py-2 max-h-28"
                          src={item.node.merchandise?.image.url}
                          width={100}
                          height={250}
                          alt="product image"
                        />
                      </Link>
                    </div>
                    <div className={`${pomotectFont.className} pl-1`}>
                      <QuantityAdjuster
                        quantity={item.node.quantity}
                        onQuantityChange={(newQuantity) => updateCartLineQuantity(item.node.id, newQuantity)}
                        isLoading={updatingItemId === item.node.id}
                      />
                    </div>
                    <div className={`${pomotectFont.className}`}>{formatter.format(Number(item.node.merchandise?.price.amount) * Number(item.node.quantity))}</div>
                    <div className={`${pomotectFont.className}`}>
                      {item.node.merchandise?.product.title} <br></br>
                      <div className={`${pomotectFont.className} italic`}>{item.node.merchandise?.title}</div> <br></br>
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
      {(() => {
        // Calculate discount by summing item prices and comparing to displayed total
        let discountAmount = 0;
        
        // Calculate sum of all item prices in cart
        let sumOfItems = 0;
        let displayedTotal = 0;
        
        // For variants array view
        if (variants && variants.length > 0 && variantsData.length > 0) {
          // Sum of item prices (what we see displayed)
          sumOfItems = variantsData.reduce((sum, variant) => {
            const variantNode = variant.data?.node;
            if (variantNode) {
              return sum + (Number(variantNode.price.amount) * variant.quantity);
            }
            return sum;
          }, 0);
          // Displayed total is the same calculation (no discount shown separately for variants)
          displayedTotal = sumOfItems;
        }
        // For single variant view
        else if (variantId && variantData?.node) {
          sumOfItems = Number(variantData.node.price.amount) * providedQuantity;
          displayedTotal = sumOfItems; // Same calculation (no discount shown separately)
        }
        // For regular cart view - this is where discounts would show
        else if (data?.cart?.lines?.edges && data?.cart?.cost) {
          // Sum up all line item prices (price × quantity) as displayed in cart
          sumOfItems = data.cart.lines.edges.reduce((sum: number, edge: any) => {
            const price = Number(edge.node.merchandise?.price?.amount || 0);
            const quantity = Number(edge.node.quantity || 0);
            return sum + (price * quantity);
          }, 0);
          
          // Get the displayed total (what's shown at bottom - subtotalAmount)
          displayedTotal = Number(data.cart.cost?.subtotalAmount?.amount || 0);
        }
        // Fallback to state values
        else if (total && total !== '0.0') {
          // If we only have state values, we can't calculate from items
          // So we'll use the old method as fallback
          const subtotalAmount = Number(total);
          const totalAmount = Number(salePrice || total);
          if (subtotalAmount > totalAmount && (subtotalAmount - totalAmount) > 0.01) {
            discountAmount = subtotalAmount - totalAmount;
          }
        }
        
        // Calculate discount: sum of items - displayed total
        if (sumOfItems > 0 && displayedTotal > 0 && sumOfItems > displayedTotal) {
          discountAmount = sumOfItems - displayedTotal;
        }
        
        return discountAmount > 0.01 ? (
          <>
            <div className={`${pomotectFont.className} text-right pr-2 font-semibold pb-2 text-black transition-all duration-300 ease-in-out`}>
              SUBTOTAL: {formatter.format(sumOfItems)}
            </div>
            <div className={`${pomotectFont.className} text-right pr-2 font-semibold pb-2 italic text-primary-blue transition-all duration-300 ease-in-out`}>
              DISCOUNT: -{formatter.format(discountAmount)}
            </div>
          </>
        ) : null;
      })()}
      <div className={`${pomotectFont.className} text-right pr-2 font-semibold pb-2 italic border-b-2 border-terracotta transition-all duration-300 ease-in-out`}>TOTAL BEFORE TAXES + SHIPPING</div>
      <div className={`text-right pr-2 font-semibold pt-2 mb-2 ${pomotectFont.className} transition-all duration-300 ease-out ${
        isTotalFlashing ? 'text-terracotta' : ''
      }`}>
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
              const existingCartId = localStorage.getItem("cartId");
              if (existingCartId) {
                // Fetch the cart to get the checkoutUrl
                const cart = await getCart();
                let checkoutUrl = cart?.cart?.checkoutUrl;

                if (checkoutUrl) {
                  // Force the URL to use Shopify domain and correct path
                  checkoutUrl = checkoutUrl
                    .replace(/^https?:\/\/pomotect\.com\/cart\/c\//, 'https://pomotect.myshopify.com/checkouts/cn/')
                    .replace(/\?key=[^&]+$/, '');
                  
                  window.location.href = checkoutUrl;
                } else {
                  console.error('No checkout URL available, redirecting to Shopify store');
                  window.location.href = 'https://pomotect.myshopify.com/';
                }
              } else {
                console.error('No cart ID, redirecting to Shopify store');
                window.location.href = 'https://pomotect.myshopify.com/';
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
              const existingCartId = localStorage.getItem("cartId");
              if (existingCartId) {
                // Fetch the cart to get the checkoutUrl
                const cart = await getCart();
                let checkoutUrl = cart?.cart?.checkoutUrl;

                if (checkoutUrl) {
                  // Force the URL to use Shopify domain and correct path
                  checkoutUrl = checkoutUrl
                    .replace(/^https?:\/\/pomotect\.com\/cart\/c\//, 'https://pomotect.myshopify.com/checkouts/cn/')
                    .replace(/\?key=[^&]+$/, '');
                  
                  window.location.href = checkoutUrl;
                } else {
                  console.error('No checkout URL available, redirecting to Shopify store');
                  window.location.href = 'https://pomotect.myshopify.com/';
                }
              } else {
                console.error('No cart ID, redirecting to Shopify store');
                window.location.href = 'https://pomotect.myshopify.com/';
              }
            }
          }}
          className={`${pomotectFont.className} float-right px-4 bg-terracotta text-white italic font-semibold`}
        >
          {isAddingToCart ? 'CHECKING OUT...' : 'CHECKOUT'}
        </button>
      ) : (
        // Original cart logic
        !data?.cart?.lines?.edges?.length || data?.cart?.lines?.edges?.length === 0 ? (
          <button 
            disabled
            className={`${pomotectFont.className} float-right px-4 bg-slate-300 text-white italic font-semibold cursor-not-allowed`}
          >
            CHECKOUT
          </button>
        ) : (
          <button 
            onClick={async () => {
              if (data?.cart?.checkoutUrl) {
                let checkoutUrl = data.cart.checkoutUrl;

                if (checkoutUrl) {
                  // Force the URL to use Shopify domain and correct path
                  checkoutUrl = checkoutUrl
                    .replace(/^https?:\/\/pomotect\.com\/cart\/c\//, 'https://pomotect.myshopify.com/checkouts/cn/')
                    .replace(/\?key=[^&]+$/, '');
                  
                  window.location.href = checkoutUrl;
                } else {
                  // Fallback: try to get fresh cart data
                  const cart = await getCart();
                  let fallbackUrl = cart?.cart?.checkoutUrl;
                  if (fallbackUrl) {
                    // Force the URL to use Shopify domain and correct path
                    fallbackUrl = fallbackUrl
                      .replace(/^https?:\/\/pomotect\.com\/cart\/c\//, 'https://pomotect.myshopify.com/checkouts/cn/')
                      .replace(/\?key=[^&]+$/, '');
                    window.location.href = fallbackUrl;
                  } else {
                    window.location.href = 'https://pomotect.myshopify.com/';
                  }
                }
              } else {
                // Fallback: try to get fresh cart data
                const cart = await getCart();
                let fallbackUrl = cart?.cart?.checkoutUrl;
                if (fallbackUrl) {
                  fallbackUrl = fallbackUrl
                    .replace(/^https?:\/\/pomotect\.com\/cart\/c\//, 'https://pomotect.myshopify.com/checkouts/cn/')
                    .replace(/\?key=[^&]+$/, '');
                }
                if (fallbackUrl) {
                  window.location.href = fallbackUrl;
                } else {
                  window.location.href = 'https://pomotect.myshopify.com/';
                }
              }
            }}
            className={`${pomotectFont.className} float-right px-4 bg-terracotta text-white italic font-semibold`}
          >
            CHECKOUT
          </button>
        )
      )}
    </div>
  )
}
