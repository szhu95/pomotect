"use client";
import { motion } from "framer-motion";
import InstaLogo from "../assets/images/insta-logo.png"
import InstaEasterLogo from "../assets/images/insta-easter-logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useSplash } from "@/context/SplashContext";
import { WordsTicker } from "@/components";
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});


const DisplayedFooter = ({ response, objectsResponse }: any) => {
    const pathname = usePathname();
    const { isRevealed } = useSplash();
    const isHome = pathname === "/";
    const hideForSplash = isHome && !isRevealed;

    const content = (
        <div>
            {pathname == "/" || pathname == "/cart" ? <></> : <WordsTicker response={response} objectsResponse={objectsResponse} />}
            <div className={
                pathname == "/" ? "flex border-t border-black md:mt-[15%] mt-[20%]" : pathname == "/cart" ? "flex border-t border-black mt-[250px]" : "flex border-t border-black mt-[10px]"}>
                <div className="site-section italic text-gray-700 py-1">
                    <Link href="/terms" className={`${pathname.startsWith("/terms") ? `${pomotectFont.className} pr-2 md:mr-10 text-primary-blue` : `${pomotectFont.className} pr-2 md:mr-10 hover:text-primary-blue`}`}>
                        Privacy & Terms of Use
                    </Link>
                    <Link href="/contact" className={`${pomotectFont.className} ${pathname.startsWith("/contact") ? `${pomotectFont.className} text-primary-blue px-2` : `${pomotectFont.className} hover:text-primary-blue px-2`}`}>
                        Contact
                    </Link>
                </div>
                <div className="site-section italic pt-1 text-primary-blue checkout_btn">
                    {
                        pathname == "/cart" ?
                            <a target="_blank" href="https://www.instagram.com/pomotect/" rel="noopener noreferrer">
                                <Image
                                    src={InstaEasterLogo}
                                    width={18}
                                    height={18}
                                    alt="postmodern tectonics instagram"
                                />
                            </a> :
                            <a target="_blank" href="https://www.instagram.com/pomotect/" rel="noopener noreferrer">
                                <Image
                                    src={InstaLogo}
                                    width={18}
                                    height={18}
                                    alt="postmodern tectonics instagram"
                                />
                            </a>
                    }
                </div>
            </div>
        </div>
    );

    if (hideForSplash) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                className="pointer-events-none select-none"
                aria-hidden
            >
                {content}
            </motion.div>
        );
    }

    if (isHome) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {content}
            </motion.div>
        );
    }

    return content;
}

export default DisplayedFooter