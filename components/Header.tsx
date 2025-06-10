"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/header-logo-2.7.png'
import mobileHomeLogo from '../assets/images/header-logo-2.5.png'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-bold.otf',
});


const Header = ({ title, menuStatus }: any) => {
    const [cartFilled, setCartFilled] = useState(false)
    const [menuIcon, setIcon] = useState(false);
    const pathname = usePathname();
    const { cartItemCount } = useCart();

    const handleSmallerScreensNavigation = () => {
        setIcon(!menuIcon);
    }

    useEffect(() => {
        let checkout = typeof window !== "undefined" ? localStorage.getItem("checkoutId") : null;
        if (checkout) {
            setCartFilled(true);
        }
    }, [])

    const CartCount = () => {
        if (cartItemCount > 0) {
            return (
                <span className={`md:absolute -right-6 text-terracotta ${pomotectFont.className}`}>
                    ({cartItemCount})
                </span>
            );
        }
        return null;
    };

    return (
        <div className="padding-y md:text-center">
            <div onClick={() => setIcon(false)} className="home-link mb-4">
                <Link href="/" scroll={false} className="md:block hidden">
                    <Image
                        src={homeLogo}
                        priority
                        width={500}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                    />
                </Link>
                <Link href="/" className="md:hidden block">
                    <Image
                        src={mobileHomeLogo}
                        priority
                        width={650}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                    />
                </Link>
            </div>
            <div className="header-link hidden md:flex">

                <Link href="/about" scroll={false} className={"px-1"}>
                    {
                        pathname.startsWith("/about")
                            ?
                            <div className={`${pomotectFont.className} text-primary-blue`}>About</div>
                            :
                            <div className={`${pomotectFont.className} hover:text-primary-blue`}>About</div>
                    }
                </Link>
                <Link href="/products" scroll={false} className={"px-1"}>
                    {
                        pathname.startsWith("/products")
                            ?
                            <div className={`${pomotectFont.className} text-primary-blue`}>Objects</div>
                            :
                            <div className={`${pomotectFont.className} hover:text-primary-blue`}>Objects</div>
                    }
                </Link>
                <Link href="/words" scroll={false} className={"px-1"}>
                    {
                        pathname.startsWith("/words")
                            ?
                            <div className={`${pomotectFont.className} text-primary-blue`}>Words</div>
                            :
                            <div className={`${pomotectFont.className} hover:text-primary-blue`}>Words</div>
                    }
                </Link>
                <Link href="/sounds" scroll={false} className={"px-1"}>
                    {
                        pathname.startsWith("/sounds")
                            ?
                            <div className={`${pomotectFont.className} text-primary-blue`}>Sounds</div>
                            :
                            <div className={`${pomotectFont.className} hover:text-primary-blue`}>Sounds</div>
                    }
                </Link>
                <Link href="/cart" scroll={false} id="checkout-btn" className={"px-2 mr-8"}>
                    {
                        pathname.startsWith("/cart")
                            ?
                            <div className={`${pomotectFont.className} text-terracotta inline-flex items-center relative min-w-[50px]`}>
                                [Cart]<CartCount />
                            </div>
                            :
                            <div className={`${pomotectFont.className} hover:text-terracotta inline-flex items-center relative min-w-[50px]`}>
                                [Cart]<CartCount />
                            </div>
                    }
                </Link>
            </div>
            {/* <div className="border border-b border-black border-dashed"/> */}
            <div className="mobile-header-link flex md:hidden cursor-pointer">
                <div onClick={handleSmallerScreensNavigation}>
                    {
                        menuIcon
                            ?
                            <div className="not-italic focus:text-white hover:text-white">
                                <div className={pomotectFont.className}>[ x ]</div>
                            </div>
                            :
                            <div>
                                <div className={pomotectFont.className}>Menu</div>
                            </div>
                    }
                </div>
                <div className="checkout_btn mr-6" onClick={() => setIcon(false)} >
                    <Link href="/cart" scroll={false} id="checkout-btn-mobile">
                        {
                            pathname.startsWith("/cart") ?
                                <div className={`${pomotectFont.className} text-terracotta inline-flex items-center relative min-w-[50px]`}>
                                    <CartCount />
                                    <div className={`${pomotectFont.className} text-terracotta ml-1`}>[Cart]</div>
                                </div>
                                :
                                <div className={`${pomotectFont.className} inline-flex items-center relative min-w-[50px]`}>
                                    <CartCount />
                                    <div className={`${pomotectFont.className} ml-1`}>Cart</div>
                                </div>
                        }
                    </Link>
                </div>
            </div>

            {/* Smaller Screen Navigation */}
            <div className={menuIcon ?
                'md:hidden top-[160px] z-50 right-0 bottom-0 left-0 flex justify-center items-center w-full h-[35%]'
                :
                'md:hidden absolute top-[160px] z-50 right-0 left-[-100%] flex justify-center items-center w-full h-[35%]'
            }>
                <div className="w-full border-b border-black">
                    <ul>
                        <li onClick={handleSmallerScreensNavigation} className="py-4 cursor-pointer text-black">
                            <Link href="/about" scroll={false}>
                                {
                                    pathname.startsWith("/about") ?
                                        <div className={`${pomotectFont.className} text-primary-blue`}>[About]</div>
                                        :
                                        <div className={pomotectFont.className}>About</div>
                                }
                            </Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-4 cursor-pointer text-black">
                            <Link href="/products" scroll={false}>
                                {
                                    pathname.startsWith("/products") ?
                                        <div className={`${pomotectFont.className} text-primary-blue`}>[Objects]</div>
                                        :
                                        <div className={pomotectFont.className}>Objects</div>
                                }
                            </Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-4 cursor-pointer text-black">
                            <Link href="/words" scroll={false}>
                                {
                                    pathname.startsWith("/words") ?
                                        <div className={`${pomotectFont.className} text-primary-blue`}>[Words]</div>
                                        :
                                        <div className={pomotectFont.className}>Words</div>
                                }
                            </Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-4 cursor-pointer text-black">
                            <Link href="/sounds" scroll={false}>
                                {
                                pathname.startsWith("/sounds") ?
                                <div className={`${pomotectFont.className} text-primary-blue`}>[Sounds]</div>
                                    :
                                    <div className={pomotectFont.className}>Sounds</div>
                                }
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Header