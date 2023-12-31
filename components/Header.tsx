import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import homeLogo from '../assets/images/home-logo.png'

const Header = () => {
    return (
        <div className="padding-y">
            <div className="home-link">
                <Link href="/" className="padding-y">
                    <Image
                        src={homeLogo}
                        width={550}
                        height={500}
                        alt="home page link"
                    />
                </Link>
            </div>
            <div className="header-link">
                <Link href="/about" className="hover:bg-primary-blue hover:text-white">About</Link>
                <Link href="/objects" className="margin-x hover:bg-primary-blue hover:text-white">Objects</Link>
                <Link href="/articles" className="margin-x hover:bg-primary-blue hover:text-white">Words</Link>
                <Link href="/sounds" className="margin-x hover:bg-primary-blue hover:text-white">Sounds</Link>
                <Link href="/archive" className="margin-x hover:bg-primary-blue hover:text-white">Archive</Link>
                <Link href="/cart" className="float-right mr-2 hover:bg-primary-blue hover:text-white">Cart</Link>
            </div>
        </div>
    )
}

export default Header