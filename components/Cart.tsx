"use client";
import { storefront } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react'
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

        console.log("cart page! response is " + JSON.stringify(data));
    }
}



export default function Cart() {

    let checkout;

    // const [cart, setCart] = useState('');
    // const [data, setData] = useState(null);

    // const retrieveCart = useCallback(async () => {
    //     let response = (await getCart()) as any;
    //     setData(response);
    //     console.log("data is " + data);
    // }, [])

    // useEffect(() => {
    //     checkout = localStorage.getItem("checkoutId");
    //     setCart(checkout ? checkout : '');
    //     retrieveCart();
    // }, [retrieveCart]);

    return (
        <div>
            <div className="grid grid-cols-4">
                <div className="cart-header col-start-4">CHECKOUT</div>
                <div>Images</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Items</div>
            </div>

             <div>Your Cart is Empty</div>
            {/* <CustomButton title='PROCEED'/> */}
        </div>
    )
}
