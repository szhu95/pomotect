"use client";
import { storefront } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import { CustomButton } from '.';

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

  const retrieveCart = useCallback(async () => {
    let response = (await getCart()) as any;
    console.log("data is " + JSON.stringify(response));
    setData(response ? response : '')

  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
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
        data ?
          <div className="grid grid-cols-4 border-y border-black my-2 py-2">
            <div>
              <Image
                className="border-2 border-dashed border-terracotta py-2"
                src={data.node.lineItems.edges[0].node.variant.image.url}
                width={100}
                height={200}
                alt="product image" />
            </div>
            <div>{data.node?.lineItems.edges[0].node.quantity}</div>
            <div>{Number(data.node?.lineItems.edges[0].node.variant.price.amount) * Number(data.node?.lineItems.edges[0].node.quantity)}</div>
            <div>
              {data.node?.lineItems.edges[0].node.title} <br></br>
              <i>{data.node?.lineItems.edges[0].node.variant.title}</i> <br></br>
              <CustomButton title={'REMOVE'} containerStyles="flex bg-terracotta float-right mt-2" handleClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                throw new Error('Function not implemented.');
              } } />
            </div>
          </div> :
          <div>
            Your Cart is Empty
          </div>
      }
      <CustomButton title='CHECKOUT' containerStyles="flex float-right bg-terracotta mt-10" handleClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error('Function not implemented.');
      } }/>
    </div>
  )
}
