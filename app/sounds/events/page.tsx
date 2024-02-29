import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react'
import WinstonFlyer from '../../../assets/images/flyer-1.jpg'
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const Events = () => {

    let lastUpdatedDate = formatDate();

    return (
        <div>
            <div className="site-section">
                <h3 className="main_header">Sounds</h3>
                <p><i>Most recently updated on February 29, 2024</i></p>
            </div>
            <div className="site-section">
                <Link href="/sounds" scroll={false} className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">Mixes</Link>
                <Link href="/sounds/events" scroll={false} className="objects_link bg-black text-white hover:bg-black hover:text-white">Events</Link>
            </div>
            <div className="flex px-2 w-1/8 max-w-12 site-section">
                <ol className="relative">
                    {/* <span>PAST</span> */}
                    <li className="border-b border-black -ml-2">
                        <span className="soundcloud_title ml-2 font-['Minion']">Out of the Blue</span>
                        <br></br>
                        <p className="text-right text-primary-blue italic font-['Minion']">Winston House, Los Angeles</p>
                    </li>
                    <div className="mt-3 max-w-10 flex-col items-center center centered float-right">
                        <Image
                            width={2831}
                            height={2877}
                            src={WinstonFlyer}
                            alt="Winston Flyer"
                        />
                    </div>
                </ol>
            </div>
            <ScrollToTopButton />
        </div>
    )
}

export default Events