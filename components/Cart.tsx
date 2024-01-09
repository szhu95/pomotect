// "use client";
// import { storefront } from '@/utils';
// import React, { useState } from 'react'

// const gql = String.raw;

// const getCheckoutLineItemsQuery = gql`
// query getCheckoutLineItemsFromNode($id: ID!) {
//   node(id: $id) {
//     id
//     ... on Checkout {
//       id
//       webUrl
//       lineItems(first: 5) {
//          edges {
//            node {
//              title
//              quantity
//              variant {
//               title
//               price {
//                 amount
//                 currencyCode
//               }
//             }
//            }
//          }
//        }
//       subtotalPrice {
//         amount
//         currencyCode
//       },
//       totalTax {
//         amount
//         currencyCode
//       },
//       totalPrice {
//         amount
//         currencyCode
//       },
//       updatedAt
//     }
//   }
// }
//   `;

// async function getCart() {
//     if (localStorage.getItem("checkoutId")) {
//         let id = localStorage.getItem("checkoutId");
//         const { data } = await storefront(getCheckoutLineItemsQuery, {
//             "id": id
//         })

//         console.log("cart page! response is " + JSON.stringify(data));
//     }
// }



export default async function Cart() {

    // const [cart, setCart] = useState(
    //     typeof window !== "undefined" ? localStorage.getItem("checkoutId") : "undefined"
    //   );
    
    // let response = (await getCart()) as any;

    return (
        <div>
            <div className="main_header">CHECKOUT</div>
            <div className="grid grid-cols-4">
                <div>Images</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Items</div>
            </div>
        </div>
    )
}
