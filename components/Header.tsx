"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/logo-3.png'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = ({ title, menuStatus }: any) => {
    const [cartFilled, setCartFilled] = useState(false)
    const [menuIcon, setIcon] = useState(false);
    const pathname = usePathname();

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
            <div onClick={() => setIcon(false)} className="home-link mb-4">
                <Link href="/" className="padding-y">
                    <Image
                        src={homeLogo}
                        priority
                        width={650}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                    />
                </Link>
            </div>
            <div className="header-link hidden md:block">
                <Link href="/about" scroll={false} className={pathname.startsWith("/about") ? "bg-primary-blue text-white hover:bg-primary-blue px-2 hover:text-white" : "hover:bg-primary-blue px-2 hover:text-white"}>About</Link>
                <Link href="/objects" scroll={false} className={pathname.startsWith("/objects")  ? "margin-x px-2 bg-primary-blue text-white hover:bg-primary-blue hover:text-white" : "margin-x px-2 hover:bg-primary-blue hover:text-white"}>Objects</Link>
                <Link href="/words" scroll={false} className={pathname.startsWith("/words") ? "margin-x px-2 bg-primary-blue text-white hover:bg-primary-blue hover:text-white" : "margin-x px-2 hover:bg-primary-blue hover:text-white"}>Words</Link>
                <Link href="/sounds" scroll={false} className={pathname.startsWith("/sounds") ? "margin-x px-2 bg-primary-blue text-white hover:bg-primary-blue hover:text-white" : "margin-x px-2 hover:bg-primary-blue hover:text-white"}>Sounds</Link>
                <Link href="/cart" scroll={false} id="checkout-btn" className={pathname.startsWith("/cart") ? "float-right bg-terracotta text-white px-2 mr-2 hover:bg-terracotta hover:text-white" : "float-right px-2 mr-2 hover:bg-terracotta hover:text-white"}>[ Cart ]</Link>
            </div>
            <div className="header-link flex md:hidden cursor-pointer">
                <div className="hover:bg-primary-blue hover:text-white" onClick={handleSmallerScreensNavigation}>
                    {menuIcon ? <div className="not-italic focus:text-white hover:text-white">ⓧ</div> : "Menu"}
                </div>
                <div className="checkout_btn" onClick={() => setIcon(false)} >
                    <Link href="/cart" scroll={false} id="checkout-btn-mobile" className={pathname.startsWith("/cart") ? "px-2 mr-2 bg-terracotta text-white hover:bg-terracotta hover:text-white" : "px-2 mr-2 hover:bg-terracotta hover:text-white"}>[ Cart ]</Link>
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
                            <Link href="/about" scroll={false} className={pathname.startsWith("/about") ? "bg-primary-blue text-white hover:bg-primary-blue hover:text-white px-2" : "hover:bg-primary-blue hover:text-white px-2"}>About</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/objects" scroll={false} className={pathname.startsWith("/objects") ? "bg-primary-blue text-white hover:bg-primary-blue hover:text-white px-2" : "hover:bg-primary-blue hover:text-white px-2"}>Objects</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/words" scroll={false} className={pathname.startsWith("/words") ? "bg-primary-blue text-white hover:bg-primary-blue hover:text-white px-2" : "hover:bg-primary-blue hover:text-white px-2"}>Words</Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/sounds" scroll={false} className={pathname.startsWith("/sounds") ? "bg-primary-blue text-white hover:bg-primary-blue hover:text-white px-2" : "hover:bg-primary-blue hover:text-white px-2"}>Sounds</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header