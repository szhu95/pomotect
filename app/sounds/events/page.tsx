import { CustomButton } from '@/components';
import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react'
import WinstonFlyer from '../../../assets/images/flyer-1.jpeg'
import Image from 'next/image';

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
            <div className="flex p-2 w-1/8 max-w-12">
                <ol className="relative">
                    <li>
                        <span>Out of the Blue</span>
                        <br></br>
                        <span>Winston House, Los Angeles</span>
                    </li>
                    <div className="w-1/4 p-1 max-w-10 flex-col items-center center centered fixed">
                        <figure className="portrait">
                            <Image
                                loading="eager"
                                width={2831}
                                height={2877}
                                src={WinstonFlyer}
                                alt="Altered Egos"
                            />
                        </figure>
                    </div>
                </ol>
            </div>
        </div>
    )
}

export default Events