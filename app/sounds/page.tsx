import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react';


const Events = () => {

    let lastUpdatedDate = formatDate();

    return (
        <div>
            <div className="site-section">
                <div className="main_header">Sounds</div>
                <p><i>Most recently updated on {lastUpdatedDate}</i></p>
            </div>
            <div className="site-section">
                <Link href="/sounds" className="objects_link bg-black text-white hover:bg-black hover:text-white">Mixes</Link>
                <Link href="/sounds/events" className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">Events</Link>
            </div>
            <div className="site-section">
                <iframe className="soundcloud_link" width="100%" height="100" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1692501831&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                <div>
                    <a className="soundcloud_title" href="https://soundcloud.com/pomotect" title="pomotect" target="_blank">SPACE SOUNDS [1 of ?]</a>
                </div>
            </div>
        </div>
    )
}

export default Events