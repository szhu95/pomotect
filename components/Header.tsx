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
            <div onClick={() => setIcon(false)} className="home-link">
                <Link href="/" className="padding-y">
                    <Image
                        src={homeLogo}
                        priority
                        width={450}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                        placeholder="blur"
                    />
                </Link>
            </div>
            <div className="header-link hidden md:block">
                <Link href="/about" scroll={false} className=" hover:bg-primary-blue px-2 hover:text-white">About</Link>
                <Link href="/objects" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Objects</Link>
                <Link href="/words" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Words</Link>
                <Link href="/sounds" scroll={false} className="margin-x px-2 hover:bg-primary-blue hover:text-white">Sounds</Link>
                <Link href="/cart" scroll={false} id="checkout-btn" className="float-right px-2 mr-2 hover:bg-terracotta hover:text-white">[ Cart ]</Link>
            </div>
            <div className="header-link flex md:hidden cursor-pointer">
                <div className="hover:bg-primary-blue hover:text-white" onClick={handleSmallerScreensNavigation}>
                    {menuIcon ? "X" : "Menu"}
                </div>
                <div className="checkout_btn" onClick={() => setIcon(false)} >
                    <Link href="/cart" scroll={false} id="checkout-btn" className="px-2 mr-2 hover:bg-terracotta hover:text-white">[ Cart ]</Link>
                </div>
            </div>

            {/* Smaller Screen Navigation */}
            <div className={menuIcon ?
                'md:hidden top-[160px] z-50 right-0 bottom-0 italic left-0 flex justify-center items-center w-full h-[35%]'
                :
                'md:hidden absolute top-[160px] z-50 right-0 italic left-[-100%] flex justify-center items-center w-full h-[35%]'
            }>
                <div className="w-full border-b border-black">
                    <ul>
                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/about" scroll={false} className=" hover:bg-primary-blue hover:text-white px-2">About</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/objects" scroll={false} className=" hover:bg-primary-blue hover:text-white px-2">Objects</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/words" scroll={false} className=" hover:bg-primary-blue hover:text-white px-2">Words</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/sounds" scroll={false} className=" hover:bg-primary-blue hover:text-white px-2">Sounds</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header