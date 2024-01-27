import { CustomButton } from '@/components';
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
                <p><i>Most recently updated on {lastUpdatedDate}</i></p>
            </div>
            <div className="site-section">
                <Link href="/sounds" scroll={false} className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">Mixes</Link>
                <Link href="/sounds/events" scroll={false} className="objects_link bg-black text-white hover:bg-black hover:text-white">Events</Link>
            </div>
            <div className="flex p-2 w-1/8 max-w-12 site-section">
                <ol className="relative">
                    <li>
                        <span>Out of the Blue</span>
                        <br></br>
                        <span>Winston House, Los Angeles</span>
                    </li>
                    <div className="w-2/3 mt-3 max-w-10 flex-col items-center center centered float-right">
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