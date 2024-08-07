"use client";
import BlueHandLogo from "../assets/images/blue-hand-logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { WordsTicker } from "@/components";

const DisplayedFooter = ({ response, objectsResponse }: any) => {
    const pathname = usePathname();
    return (
        <div>
            {pathname == "/" || pathname == "/cart" ? <></> : <WordsTicker response={response} objectsResponse={objectsResponse} />}
            <div className={pathname == "/" ? "flex border-t border-black md:mt-[75%] mt-[140%]" : pathname == "/cart" ? "flex border-t border-black mt-[250px]" : "flex border-t border-black mt-[10px]"}>
                <div className="site-section italic text-gray-700 py-1">
                    <Link href="/terms" className={pathname.startsWith("/terms") ? "mr-8 pr-2 md:mr-10 bg-primary-blue text-white hover:bg-primary-blue hover:text-white" : "mr-8 pr-2 md:mr-10 hover:bg-primary-blue hover:text-white"}>
                        Privacy & Terms of Use
                    </Link>
                    <Link href="/contact" className={pathname.startsWith("/contact") ? "bg-primary-blue text-white hover:bg-primary-blue hover:text-white px-2" : "hover:bg-primary-blue hover:text-white px-2"}>
                        Contact
                    </Link>
                </div>
                <div className="site-section italic text-gray-700 checkout_btn">
                    <a target="_blank" href="https://www.instagram.com/pomotect/" rel="noopener noreferrer">
                        <Image
                            src={BlueHandLogo}
                            width={25}
                            height={25}
                            alt="instagram link"
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default DisplayedFooter