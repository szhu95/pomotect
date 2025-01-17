import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
    src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../../fonts/pomotect-analog-regular.otf',
});

const Projects = () => {

    return (
        <div>
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
                <p className={`${pomotectFont.className} italic`}>Most recently updated on January 11, 2025</p>
            </div>
            <div className="site-section">
                <Link href="/products" scroll={false} className={`${pomotectFont.className} objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white`}>For Sale</Link>
                <Link href="/products/concepts" scroll={false} className={`${pomotectFont.className} objects_link bg-black text-white hover:bg-black hover:text-white`}>Projects</Link>
            </div>

            <div className="site-section italic font-['Minion']">Still Thinking . . .</div>
        </div>
    )
}

export default Projects

