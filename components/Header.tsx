import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className="flex-center padding-y">
            <Link href="/objects" className="padding-x">Objects</Link>
            <Link href="/articles" className="padding-x">Articles</Link>
            <Link href="/about" className="padding-x">About</Link>
        </div>
    )
}

export default Header