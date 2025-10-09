"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import homeLogo from '../assets/images/header-logo-2.7.png'
import mobileHomeLogo from '../assets/images/header-logo-2.5.webp'
import { usePathname, useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { useCart } from '@/context/CartContext';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import OptimizedGlobeVideo from './OptimizedGlobeVideo';

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
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const { cartItemCount } = useCart();
    const router = useRouter();

    // Preload header images
    useImagePreloader(homeLogo.src);
    useImagePreloader(mobileHomeLogo.src);

    const handleSmallerScreensNavigation = () => {
        setIcon(!menuIcon);
    }

    useEffect(() => {
        let cart = typeof window !== "undefined" ? localStorage.getItem("cartId") : null;
        if (cart) {
            setCartFilled(true);
        }
    }, [])

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleScroll = () => {
            // Show sticky header when scrolled past 300px
            setShowStickyHeader(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMounted]);

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
        <>
            {/* Sticky Header - shows on scroll - only render after client mount */}
            {isMounted && (
                <div className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-black transition-transform duration-300 ${showStickyHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="px-[10%] py-0 flex justify-between items-center">
                        <Link href="/" scroll={true} className="flex items-center">
                            <Image
                                src={homeLogo}
                                alt="Postmodern Tectonics"
                                width={400}
                                height={90}
                                className="h-14 w-auto hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <Link href="/cart" scroll={false} className="flex items-center">
                            <div className={`${pomotectFont.className} hover:text-terracotta inline-flex items-center relative min-w-[50px] ${pathname.startsWith("/cart") ? 'text-terracotta' : ''}`}>
                                [Cart]<CartCount />
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            <div className="padding-y md:text-center" suppressHydrationWarning>
            <div onClick={() => setIcon(false)} className="home-link mb-4">
                <Link href="/" scroll={true} className="md:block hidden">
                    <Image
                        src={homeLogo}
                        priority
                        width={500}
                        height={600}
                        alt="home page link"
                        className="w-auto h-auto"
                    />
                </Link>
                <Link href="/" scroll={true} className="md:hidden block">
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
                    <Link href="/cart" scroll={false} id="checkout-btn-mobile" onClick={() => handleMobileNavClick('/cart')}>
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
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white md:hidden">
                    <OptimizedGlobeVideo showOnMobile={true} />
                </div>
            )}
        </div>
        </>
    )
}

export default Header