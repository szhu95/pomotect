import BlueHandLogo from "../assets/images/blue-hand-logo.png"
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

    return (
        <div className="flex border-t border-black">
            <div>
                Terms & Conditions Privacy Policy Contact Us
            </div>
            <div className="checkout_btn">
                
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