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
                        width={700}
                        height={500}
                        alt="pomotect logo"
                    />
                </Link>
            </div>
            <div className="header-link">
                <Link href="/about" className="focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">About</Link>
                <Link href="/objects" className="padding-x focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">Objects</Link>
                <Link href="/articles" className="padding-x focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">Words</Link>
                <Link href="/sounds" className="padding-x focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">Sounds</Link>
                <Link href="/archive" className="padding-x focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">Archive</Link>
            </div>
        </div>
    )
}

export default Header