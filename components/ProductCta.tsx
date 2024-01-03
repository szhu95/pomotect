"use client"
import { formatDate, formatPrice, storefront } from "@/utils";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import CustomDropdown from "@/components/CustomDropdown";
import { CustomButton } from "@/components";

async function addToCart(variant_id: any) {
    let data = {
        'items': [{
            'id': variant_id,
            'quantity': 1
        }]
    };

    await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


const ProductCta = ({ variantName, options, variants }: any) => {

    // console.log("VARIANT NAME **********" + JSON.stringify(variantName));

    // console.log("OPTIONS NAME **********" + JSON.stringify(options));

    console.log("VARIANTS ARE **********" + JSON.stringify(variants));

    const [size, setSize] = useState(options[0]);
    const [isLoading, setIsLoading] = useState(false);

    async function mapVariants() {
        //setIsLoading(true);
        let temp = variants.edges[0].node.get(size);
        console.log("VARIANTS ARE **********" + temp);
        await addToCart(temp);
        setIsLoading(false);
    }

    return (
        <div>
            <CustomDropdown selected={size} title={variantName} options={options} handleChange={setSize} />
            {isLoading == false ? <CustomButton containerStyles="w-full bg-gray-300 text-white font-medium mt-5" title={"ADD TO CART"} handleClick={mapVariants} /> : ""}
        </div>
    )
}

export default ProductCta