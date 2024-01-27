"use client"
import { storefront } from "@/utils";
import React, { useState } from "react";
import CustomDropdown from "@/components/CustomDropdown";
import { CustomButton, LoadButton } from "@/components";

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

    if (data) {
      console.log("cart was created! response is " + JSON.stringify(data));
    }
    localStorage.setItem("checkoutId", data.checkoutCreate.checkout.id);
    let checkoutBtn = document.getElementById("checkout-btn");
    console.log("checkout button is " + checkoutBtn);
  }


  if (!localStorage.getItem("checkoutId")) {
    await createCheckout();
    return;
  }

  await storefront(addToCheckoutQuery, {
    "checkoutId": localStorage.getItem("checkoutId"),
    "lineItems": {
      "variantId": variant_id,
      "quantity": 1
    }
  })
    .then(response => {
      console.log("cart was updated! response is " + JSON.stringify(response));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


const ProductCta = ({ variantName, options, variants }: any) => {

  const [size, setSize] = useState(options[0]);
  const [isLoading, setIsLoading] = useState(false);

  let variantArr = variants.edges;

  async function mapVariants(variantArr: any, searchKey: string) {
    setIsLoading(true);
    if (variantArr) {
      console.log("variant Arr is " + JSON.stringify(variantArr));
      console.log("searchKey is " + searchKey)
    }
    let variantId = "";
    variantArr.filter((obj: any) => {
      if (obj.node?.title === searchKey) {
        variantId = obj.node.id;
      }
    });
    console.log("return value is " + variantId);
    await addToCart(variantId);

    //update cart count

    setIsLoading(false);
  }

  return (
    <div>
      <CustomDropdown selected={size} title={variantName} options={options} handleChange={setSize} />
      {isLoading == false ? <CustomButton containerStyles="w-full bg-gray-300 text-white font-medium mt-5" title={"ADD TO CART"} handleClick={() => mapVariants(variantArr, size)} /> : <LoadButton />}
    </div>
  )
}

export default ProductCta