"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/header-logo-2.7.png'
import mobileHomeLogo from '../assets/images/header-logo-2.5.png'
import { usePathname, useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { useCart } from '@/context/CartContext';
import globeAnimation from '../assets/images/globe-animation.gif';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});

const pomotectBoldFont = localFont({
    src: '../fonts/pomotect-analog-bold.otf',
});


const Header = ({ title, menuStatus }: any) => {
    const [cartFilled, setCartFilled] = useState(false)
    const [menuIcon, setIcon] = useState(false);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const { cartItemCount } = useCart();
    const router = useRouter();

    const handleSmallerScreensNavigation = () => {
        setIcon(!menuIcon);
    }

    useEffect(() => {
        let checkout = typeof window !== "undefined" ? localStorage.getItem("checkoutId") : null;
        if (checkout) {
            setCartFilled(true);
        }
    }, [])

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleMobileNavClick = (href: string) => {
        setLoading(true);
        setIcon(false);
        router.push(href);
    };

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
                <Link href="/" scroll={true} className="md:block hidden" onClick={() => setTimeout(() => window.scrollTo(0, 0), 0)}>
                    <Image
                        src={homeLogo}
                        priority
                        width={500}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                    />
                </Link>
                <Link href="/" scroll={true} className="md:hidden block" onClick={() => setTimeout(() => window.scrollTo(0, 0), 0)}>
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
                                <div className={pomotectBoldFont.className}>[ x ]</div>
                            </div>
                            :
                            <div>
                                <div className={pomotectBoldFont.className}>Menu</div>
                            </div>
                    }
                </div>
                <div className="checkout_btn mr-6" onClick={() => setIcon(false)} >
                    <Link href="/cart" scroll={false} id="checkout-btn-mobile">
                        {
                            pathname.startsWith("/cart") ?
                                <div className={`${pomotectBoldFont.className} text-terracotta inline-flex items-center relative min-w-[50px]`}>
                                    <CartCount />
                                    <div className={`${pomotectBoldFont.className} text-terracotta ml-1`}>[Cart]</div>
                                </div>
                                :
                                <div className={`${pomotectBoldFont.className} inline-flex items-center relative min-w-[50px]`}>
                                    <CartCount />
                                    <div className={`${pomotectBoldFont.className} ml-1`}>Cart</div>
                                </div>
                        }
                    </Link>
                </div>
            </div>

            {/* Smaller Screen Navigation */}
            <div className={`md:hidden w-full transition-all duration-300 overflow-hidden ${menuIcon ? 'max-h-[400px]' : 'max-h-0'}`}>
                <div className="w-full border-b border-black">
                    <ul>
                        <li onClick={() => handleMobileNavClick('/about')} className="py-4 cursor-pointer text-black">
                            <Link href="/about" scroll={false}>
                                {
                                    pathname.startsWith("/about") ?
                                        <div className={`${pomotectFont.className} text-primary-blue`}>[About]</div>
                                        :
                                        <div className={pomotectFont.className}>About</div>
                                }
                            </Link>
                        </li>

                        <li onClick={() => handleMobileNavClick('/products')} className="py-4 cursor-pointer text-black">
                            <Link href="/products" scroll={false}>
                                {
                                    pathname.startsWith("/products") ?
                                        <div className={`${pomotectFont.className} text-primary-blue`}>[Objects]</div>
                                        :
                                        <div className={pomotectFont.className}>Objects</div>
                                }
                            </Link>
                        </li>

                        <li onClick={() => handleMobileNavClick('/words')} className="py-4 cursor-pointer text-black">
                            <Link href="/words" scroll={false}>
                                {
                                    pathname.startsWith("/words") ?
                                        <div className={`${pomotectFont.className} text-primary-blue`}>[Words]</div>
                                        :
                                        <div className={pomotectFont.className}>Words</div>
                                }
                            </Link>
                        </li>

                        <li onClick={() => handleMobileNavClick('/sounds')} className="py-4 cursor-pointer text-black">
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

            {/* Globe animation overlay for mobile loading */}
            {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-80 md:hidden">
                    <Image src={globeAnimation} alt="Loading..." width={220} height={220} className="animate-spin-slow" />
                </div>
            )}
        </div >
    )
}

export default Header