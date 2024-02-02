import BlueHandLogo from "../assets/images/blue-hand-logo.png"
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

    return (
        <div className="flex border-t border-black mt-[250px]">
            <div className="site-section italic text-gray-700 py-1">
                <Link href="/terms" className="mr-8 md:mr-10">
                    Privacy & Terms of Use
                </Link>
                <Link href="/contact">
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
    )
}

export default Footer