import { Soundcloud } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react';


const Sounds = () => {

    let lastUpdatedDate = formatDate();

    return (
        <div>
            <div className="site-section">
                <div className="main_header">Sounds</div>
                <p><i>Most recently updated on March 05, 2024</i></p>
            </div>
            <div className="site-section">
                <Link href="/sounds" scroll={false} className="objects_link bg-black text-white hover:bg-black hover:text-white">Mixes</Link>
                <Link href="/sounds/events" scroll={false} className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">Events</Link>
            </div>

            <Soundcloud title_href="https://soundcloud.com/pomotect/down-tempo" title="pomotect" label="DOWN TEMPO [2 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1761435171&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
            <Soundcloud title_href="https://soundcloud.com/pomotect/space-sounds" title="pomotect" label="SPACE SOUNDS [1 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1692501831&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
            {/* <Soundcloud title_href="https://soundcloud.com/stevie-hu/sets/zeba-residency" title="stevie-residency" label="SH DC RESIDENCY" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1601725162&color=%230000ff&auto_play=false&hide_related=false&show_comments=true&show_user=false&show_reposts=false&show_teaser=false&visual=true" /> */}

            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>

        </div>
    )
}

export default Sounds