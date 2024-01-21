import { CustomButton } from '@/components';
import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react'

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

            <div className="site-section">Events</div>
        </div>
    )
}

export default Events