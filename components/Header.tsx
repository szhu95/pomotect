"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/header-logo-2.5.png'
import aboutLinkImage from '../assets/images/about-link-image.png'
import objectsLinkImage from '../assets/images/objects-link-image.png'
import wordsLinkImage from '../assets/images/words-link-image.png'
import soundsLinkImage from '../assets/images/sounds-link-image.png'
import cartLinkImage from '../assets/images/cart-link-image.png'
import menuLinkImage from '../assets/images/menu-link-image.png'
import aboutLinkFocusImage from '../assets/images/about-link-focus-image.png'
import objectsLinkFocusImage from '../assets/images/objects-link-focus-image.png'
import wordsLinkFocusImage from '../assets/images/words-link-focus-image.png'
import soundsLinkFocusImage from '../assets/images/sounds-link-focus-image.png'
import cartLinkFocusImage from '../assets/images/cart-link-focus-image.png'
import closeIcon from '../assets/images/close-menu-image.png'
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
        <div className="padding-y md:text-center">
            <div onClick={() => setIcon(false)} className="home-link mb-4">
                <Link href="/" className="md:block hidden padding-y">
                    <Image
                        src={homeLogo}
                        priority
                        width={650}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                    />
                </Link>
                <Link href="/" className="md:hidden block">
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
            <div className="header-link hidden md:flex">

                <Link href="/about" scroll={false} className={"px-1"}>
                    {pathname.startsWith("/about")
                        ?
                        <Image src={aboutLinkFocusImage} alt={'about link focus image'} height={100} width={100} className='inline' />
                        :
                        <Image src={aboutLinkImage} alt={'about link image'} height={100} width={100} className='inline' />}
                </Link>
                <Link href="/objects" scroll={false} className={"px-1"}>
                    {pathname.startsWith("/objects")
                        ?
                        <Image src={objectsLinkFocusImage} alt={'objects link focus image'} height={100} width={100} className='inline' />
                        :
                        <Image src={objectsLinkImage} alt={'objects link image'} height={100} width={100} className='inline' />}
                </Link>
                <Link href="/words" scroll={false} className={"px-1"}>
                    {pathname.startsWith("/words")
                        ?
                        <Image src={wordsLinkFocusImage} alt={'words link focus image'} height={100} width={100} className='inline' />
                        :
                        <Image src={wordsLinkImage} alt={'words link image'} height={100} width={100} className='inline' />
                    }
                </Link>
                <Link href="/sounds" scroll={false} className={"px-1"}>
                    {pathname.startsWith("/sounds")
                        ?
                        <Image src={soundsLinkFocusImage} alt={'sounds link focus image'} height={100} width={100} className='inline' />
                        :
                        <Image src={soundsLinkImage} alt={'sounds link image'} height={100} width={100} className='inline' />
                    }
                </Link>
                <Link href="/cart" scroll={false} id="checkout-btn" className={"px-2 mr-2"}>
                    {pathname.startsWith("/cart")
                        ?
                        <Image src={cartLinkFocusImage} alt={'cart link focus image'} height={100} width={100} className='inline' />
                        :
                        <Image src={cartLinkImage} alt={'cart link image'} height={100} width={100} className='inline' />
                    }
                </Link>
            </div>
            {/* <div className="border border-b border-black border-dashed"/> */}
            <div className="mobile-header-link flex md:hidden cursor-pointer">
                <div onClick={handleSmallerScreensNavigation}>
                    {menuIcon
                        ?
                        <div className="not-italic focus:text-white hover:text-white">
                            <Image src={closeIcon} alt={'close icon'} height={100} width={100} className='inline' />
                        </div>
                        :
                        <div>
                            <Image src={menuLinkImage} alt={'menu link image'} height={100} width={100} className='inline' />
                        </div>}
                </div>
                <div className="checkout_btn" onClick={() => setIcon(false)} >
                    <Link href="/cart" scroll={false} id="checkout-btn-mobile">
                        {pathname.startsWith("/cart") ?
                            <Image src={cartLinkFocusImage} alt={'cart link focus image'} height={100} width={100} className='inline' />
                            :
                            <Image src={cartLinkImage} alt={'cart link image'} height={100} width={100} className='inline' />
                        }
                    </Link>
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
                            <Link href="/about" scroll={false}>
                                {pathname.startsWith("/about") ?
                                    <Image src={aboutLinkFocusImage} alt={'about link focus image'} height={100} width={100} className='inline' />
                                    :
                                    <Image src={aboutLinkImage} alt={'about link image'} height={100} width={100} className='inline' />}
                            </Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/objects" scroll={false}>
                                {pathname.startsWith("/objects") ?
                                    <Image src={objectsLinkFocusImage} alt={'objects link focus image'} height={100} width={100} className='inline' />
                                    :
                                    <Image src={objectsLinkImage} alt={'objects link image'} height={100} width={100} className='inline' />}
                            </Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/words" scroll={false}>
                                {pathname.startsWith("/words") ?
                                    <Image src={wordsLinkFocusImage} alt={'words link focus image'} height={100} width={100} className='inline' />
                                    :
                                    <Image src={wordsLinkImage} alt={'words link image'} height={100} width={100} className='inline' />}
                            </Link>
                        </li>

                        <li onClick={handleSmallerScreensNavigation} className="py-2 cursor-pointer text-black">
                            <Link href="/sounds" scroll={false}>
                                {pathname.startsWith("/sounds") ?
                                    <Image src={soundsLinkFocusImage} alt={'sounds link focus image'} height={100} width={100} className='inline' />
                                    :
                                    <Image src={soundsLinkImage} alt={'sounds link image'} height={100} width={100} className='inline' />}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Header