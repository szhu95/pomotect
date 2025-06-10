"use client"
import { storefront } from "@/utils";
import React, { useState } from "react";
import CustomDropdown from "@/components/CustomDropdown";
import { CustomButton, LoadButton } from "@/components";
import Link from "next/link";
import { useCart } from '@/context/CartContext';

async function addToCart(variant_id: string) {
  const gql = String.raw;

  const addToCheckoutQuery = gql`
mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
  checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
    checkout {
      id
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
          "variantId": variant_id,
          "quantity": 1
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
      "variantId": variant_id,
      "quantity": 1
    }
  })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  return response?.data?.checkoutLineItemsAdd?.checkout;
}


const ProductCta = ({ variantName, options, quantity, variants }: any) => {
  const { cartItemCount, updateCartItemCount } = useCart();
  const [size, setSize] = useState(options[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  let variantArr = variants.edges;

  async function mapVariants(variantArr: any, searchKey: string) {
    setIsLoading(true);
    setItemAdded(false);
    let variantId = "";
    variantArr.filter((obj: any) => {
      if (obj.node?.title === searchKey) {
        variantId = obj.node.id;
      }
    });
    const checkout = await addToCart(variantId);
    
    // Update cart count immediately with total quantity
    if (checkout?.lineItems?.edges) {
      const totalQuantity = checkout.lineItems.edges.reduce((sum: number, edge: any) => {
        return sum + (edge.node.quantity || 0);
      }, 0);
      updateCartItemCount(totalQuantity);
    }

    setIsLoading(false);
    setItemAdded(true);
  }

  function checkStock(_size: string): number {
    let result = variantArr.find(({ node }: any) => node.title === size)
    return result?.node.quantityAvailable
  }

  return (
    <div>
      <CustomDropdown selected={size} title={variantName} options={options} handleChange={setSize} />
      {isLoading == false ? quantity == "0" || checkStock(size) == 0 ?
        <div className="mt-5 minion-font italic border-dashed border border-slate-400 text-center">
          SOLD OUT
        </div>
        :
        <CustomButton containerStyles="w-full group hover:bg-primary-blue border border-2 border-primary-blue font-medium mt-5 minion-font" textColor="group-hover:text-white minion-font text-primary-blue" title={"ADD TO CART"} handleClick={() => mapVariants(variantArr, size)} />
        :
        <LoadButton />}
      {checkStock(size) == 1 || checkStock(size) == 2 ? <p className="text-primary-blue italic mt-4 text-center minion-font m-auto">ONLY {checkStock(size)} REMAINING</p> : <></>}
      {itemAdded ?
        <Link href='/cart'>
          <div className="mt-4 text-center minion-font animate-pulse border border-primary-blue border-dashed text-primary-blue transition-opacity ease-in-out duration-700 opacity-100">
            OBJECT ADDED TO CART ⇢
          </div>
        </Link>
        :
        <div />
      }
    </div>
  )
}

export default ProductCta