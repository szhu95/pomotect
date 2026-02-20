"use client";
import InstaLogo from "../assets/images/insta-logo.png"
import InstaEasterLogo from "../assets/images/insta-easter-logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { WordsTicker } from "@/components";
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});


const DisplayedFooter = ({ response, objectsResponse }: any) => {
    const pathname = usePathname();
    return (
        <div>
            {pathname == "/" || pathname == "/cart" ? <></> : <WordsTicker response={response} objectsResponse={objectsResponse} />}
            <div className={
                pathname == "/" ? "flex border-t border-black md:mt-[15%] mt-[20%]" : pathname == "/cart" ? "flex border-t border-black mt-[250px]" : "flex border-t border-black mt-[10px]"}>
                <div className="site-section italic text-gray-700 py-1 flex flex-wrap items-center gap-1">
                    <Link href="/terms" className={`inline-flex items-center min-h-[48px] min-w-[48px] py-3 pr-2 md:min-h-0 md:min-w-0 md:py-0 md:mr-10 ${pathname.startsWith("/terms") ? `${pomotectFont.className} text-primary-blue` : `${pomotectFont.className} hover:text-primary-blue`}`}>
                        Privacy & Terms of Use
                    </Link>
                    <Link href="/contact" className={`inline-flex items-center min-h-[48px] min-w-[48px] py-3 px-2 md:min-h-0 md:min-w-0 md:py-0 ${pathname.startsWith("/contact") ? `${pomotectFont.className} text-primary-blue` : `${pomotectFont.className} hover:text-primary-blue`}`}>
                        Contact
                    </Link>
                </div>
                <div className="site-section italic pt-1 text-primary-blue checkout_btn">
                    {
                        pathname == "/cart" ?
                            <a target="_blank" href="https://www.instagram.com/pomotect/" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] md:min-h-0 md:min-w-0">
                                <Image
                                    src={InstaEasterLogo}
                                    width={18}
                                    height={18}
                                    alt="postmodern tectonics instagram"
                                />
                            </a> :
                            <a target="_blank" href="https://www.instagram.com/pomotect/" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] md:min-h-0 md:min-w-0">
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
    )
}

export default DisplayedFooter