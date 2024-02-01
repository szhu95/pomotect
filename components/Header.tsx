"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/home-logo.png'

const Header = () => {
    const [cartFilled, setCartFilled] = useState(false)
    const [menuIcon, setIcon] = useState(false);

    const handleSmallerScreensNavigation = () => {
        setIcon(!menuIcon);
    }

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
            <div className="header-link hidden md:block">
                <Link href="/about" scroll={false} className=" hover:bg-primary-blue px-2 hover:text-white">About</Link>
                <Link href="/objects" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Objects</Link>
                <Link href="/words" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Words</Link>
                <Link href="/sounds" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Sounds</Link>
                <Link href="/cart" scroll={false} id="checkout-btn" className="float-right px-2 mr-2 hover:bg-terracotta hover:text-white">{cartFilled ? "Cart (!)" : "Cart"}</Link>
            </div>
            <div onClick={handleSmallerScreensNavigation} className="header-link block md:hidden cursor-pointer">
                {menuIcon ? "X" : "Menu"}
                <Link href="/cart" scroll={false} id="checkout-btn" className="float-right px-2 mr-2 hover:bg-terracotta hover:text-white">{cartFilled ? "Cart (!)" : "Cart"}</Link>
            </div>

            <div className={menuIcon ?
                'md:hidden absolute top-[150px] right-0 bottom-0 italic left-0 flex justify-center items-center w-full h-screen bg-primary-blue text-center text-white ease-in duration-300'
                :
                'md:hidden absolute top-[150px] right-0 italic left-[-100%] flex justify-center items-center w-full h-screen bg-primary-blue text-white text-center ease-in duration-300'
            }>
                <div className="w-full">
                    <ul>
                        <li onClick={handleSmallerScreensNavigation} className="py-5 cursor-pointer text-white font-semibold">
                            <Link href="/about" scroll={false} className=" hover:bg-primary-blue px-2">About</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-5 cursor-pointer text-white font-semibold">
                            <Link href="/objects" scroll={false} className=" hover:bg-primary-blue px-2">Objects</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-5 cursor-pointer text-white font-semibold">
                            <Link href="/words" scroll={false} className=" hover:bg-primary-blue px-2">Words</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-5 cursor-pointer text-white font-semibold">
                            <Link href="/sounds" scroll={false} className=" hover:bg-primary-blue px-2">Sounds</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header