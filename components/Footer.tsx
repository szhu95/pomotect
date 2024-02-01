import BlueHandLogo from "../assets/images/blue-hand-logo.png"
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

    return (
        <div className="flex border-t border-black">
            <div className="site-section italic text-gray-700 py-1">
                <Link href="/terms" className="mr-2 md:mr-10">
                    Privacy & Terms Of Use
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
            </div>
            <div className="site-section italic text-gray-700 checkout_btn">
                <Link href="https://www.instagram.com/pomotect/">
                    <Image
                        src={BlueHandLogo}
                        width={25}
                        height={25}
                        alt="instagram link"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Footer