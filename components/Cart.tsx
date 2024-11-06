"use client";
import { storefront } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import { CustomButton } from '.';
import Link from 'next/link';
import localFont from 'next/font/local';

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});


const gql = String.raw;

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



export default function Cart() {

  let checkout;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [cart, setCart] = useState('');
  const [data, setData] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [total, setTotal] = useState('');
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
    console.log("data is " + JSON.stringify(response));

    if (response?.node.order?.id) {
      setCart('');
      setIsLoading(false);
      if (localStorage.getItem("checkoutId"))
        localStorage.removeItem("checkoutId");
      return;
    }
    setData(response ? response : '');
    setCheckoutUrl(response ? response.node.webUrl : '');
    setTotal(response ? response.node?.totalPrice.amount : '0.0');
    setQuantity(response ? response.node?.lineItems.edges.length : 0);
    console.log(response.node?.lineItems.edges.length);
    console.log("checkouturl is " + checkoutUrl);
    console.log("quantity is " + quantity);
    setIsLoading(false);
  }, [])

  function resetCart() {
    setCart('');
    setIsLoading(false);
    if (localStorage.getItem("checkoutId"))
      localStorage.removeItem("checkoutId");
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIsLoading(true);
      checkout = localStorage.getItem("checkoutId");
      setCart(checkout ? checkout : '');
      retrieveCart().catch(err =>
        resetCart());
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 cart-details-header">
        <div className={`text-white ${pomotectFont.className}`}>Image</div>
        <div className={`text-white ${pomotectFont.className}`}>Quantity</div>
        <div className={`text-white ${pomotectFont.className}`}>Price</div>
        <div className={`text-white ${pomotectFont.className}`}>Product</div>
      </div>
      {
        !cart || (!isLoading && data.node?.lineItems.edges.length === 0) ? <div className={`${pomotectFont.className} py-6 text-center`}>YOUR CART IS EMPTY</div> :
          (!isLoading && data ? data.node?.lineItems.edges.map((item: any, i: React.Key | null | undefined) => {

            return (
              <div key={i} className="grid grid-cols-4 border-y border-black my-2 py-2 pl-2">
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
                  <CustomButton title={'REMOVE'} containerStyles="flex bg-terracotta py-0 float-right mt-7" textColor={`text-white ${pomotectFont.className}`} handleClick={() => removeItemFromCart(item.node.id)} />
                </div>
              </div>
            )
          }) :
            <svg
              className={"block m-auto my-6 animate-spin h-5 w-5"}
              viewBox={"0 0 24 24"}
              fill={"none"}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )
      }
      <div className={`${pomotectFont.className} text-right pr-2 font-semibold pb-2 italic border-b-2 border-terracotta`}>TOTAL BEFORE TAXES + SHIPPING</div>
      <div className={`text-right pr-2 font-semibold pt-2 mb-2 ${pomotectFont.className}`}>{formatter.format(Number(total))}</div>
      {quantity === 0 || isLoading ? <Link href={checkoutUrl} scroll={false} className={`${pomotectFont.className} float-right px-4 bg-slate-300 aria-disabled pointer-events-none text-white italic font-semibold`} tabIndex={-1}>CHECKOUT</Link> : <Link href={checkoutUrl} scroll={false} className={`${pomotectFont.className} float-right px-4 bg-terracotta text-white italic font-semibold`}>CHECKOUT</Link>}
    </div>
  )
}
