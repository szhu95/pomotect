"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/home-logo.png'

const Header = () => {
    const [cartFilled, setCartFilled] = useState(false)

    useEffect(() => {
        let checkout = typeof window !== "undefined" ? localStorage.getItem("checkoutId") : null;
        if (checkout) {
            setCartFilled(true);
        }
    }, [])

    return (
        <div className="padding-y">
            <div className="home-link">
                <Link href="/" className="padding-y">
                    <Image
                        src={homeLogo}
                        width={400}
                        height={500}
                        alt="home page link"
                    />
                </Link>
            </div>
            <div className="header-link hidden sm:block">
                <Link href="/about" scroll={false} className=" hover:bg-primary-blue px-2 hover:text-white">About</Link>
                <Link href="/objects" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Objects</Link>
                <Link href="/words" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Words</Link>
                <Link href="/sounds" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Sounds</Link>
                <Link href="/cart" scroll={false} id="checkout-btn" className="float-right px-2 mr-2 hover:bg-terracotta hover:text-white">{cartFilled ? "Cart (!)" : "Cart"}</Link>
            </div>
            <div className="header-menu block sm:hidden">
                Test
            </div>
        </div>
    )
}

export default Header