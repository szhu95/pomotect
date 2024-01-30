"use client";
import { storefront } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import { CustomButton, LoadButton } from '.';
import Link from 'next/link';

const gql = String.raw;

const getCheckoutLineItemsQuery = gql`
query getCheckoutLineItemsFromNode($id: ID!) {
  node(id: $id) {
    id
    ... on Checkout {
      id
      webUrl
      lineItems(first: 5) {
         edges {
           node {
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

  const [cart, setCart] = useState('');
  const [data, setData] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('');

  const retrieveCart = useCallback(async () => {
    let response = (await getCart()) as any;
    console.log("data is " + JSON.stringify(response));
    setData(response ? response : '')
    setCheckoutUrl(response.node.webUrl)
    setIsLoading(false);
  }, [])

  async function removeItemFromCart(variantId: any) {
    console.log(variantId);
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIsLoading(true);
      checkout = localStorage.getItem("checkoutId");
      setCart(checkout ? checkout : '');
      console.log("cart is " + checkout);
      retrieveCart();
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 cart-details-header">
        <div className="text-white">Image</div>
        <div className="text-white">Quantity</div>
        <div className="text-white">Price</div>
        <div className="text-white">Product</div>
      </div>

      {
        !cart ? <div>YOUR CART IS EMPTY</div> :
          (!isLoading && data ? data.node?.lineItems.edges.map((item: any) => {

            return (
              <div key={item.node.id} className="grid grid-cols-4 border-y border-black my-2 py-2 pl-2">
                <div>
                  <Image
                    className="border-2 border-dashed border-terracotta py-2 max-h-24"
                    src={item.node.variant?.image.url}
                    width={100}
                    height={200}
                    alt="product image" />
                </div>
                <div>{item.node.quantity}</div>
                <div>{Number(item.node.variant?.price.amount) * Number(item.node.quantity)}</div>
                <div>
                  {item.node.title} <br></br>
                  <i>{item.node.variant?.title}</i> <br></br>
                  <CustomButton title={'REMOVE'} containerStyles="flex bg-terracotta float-right mt-5" handleClick={() => removeItemFromCart(item.node.variant?.id)} />
                </div>
              </div>
            )
          }) :
            <svg
              className={"animate-spin h-5 w-5 mr-3"}
              viewBox={"0 0 24 24"}
              fill={"none"}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )
      }
      <div>TOTAL BEFORE TAXES + SHIPPING</div>
      <Link href={checkoutUrl} scroll={false} className="float-right px-2 mr-2 bg-terracotta text-white">CHECKOUT</Link>
    </div>
  )
}
