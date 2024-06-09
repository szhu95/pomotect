"use client";
import { Soundcloud } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate } from '@/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';


const Sounds = () => {

    let lastUpdatedDate = formatDate();

    return (
        <div>
            <div className="site-section">
                <div className="main_header">Sounds</div>
                <p><i>Most recently updated on June 01, 2024</i></p>
            </div>
            <div className="site-section">
                <Link href="/sounds" scroll={false} className="objects_link bg-black text-white hover:bg-black hover:text-white">Mixes</Link>
                <Link href="/sounds/events" scroll={false} className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">Events</Link>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <Soundcloud title_href="https://soundcloud.com/pomotect/in-no-particular-order" title="IN NO PARTICULAR ORDER [5 of ?]" label="IN NO PARTICULAR ORDER [5 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1842391086&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/so-into-dancing" title="SO INTO DANCING [4 of ?]" label="SO INTO DANCING [4 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1835031039&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/down-tempo-ii" title="DOWN TEMPO II [3 of ?]" label="DOWN TEMPO II [3 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1832468715&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/flash-dc-set-04132024-3-of-3" title="Flash D.C. Set 04.13.2024 [3 of 3]" label="Flash D.C. Set 04.13.2024 [3 of 3]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1804373067&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/pomotect-flash-dc-set-04132024-part-2" title="Flash D.C. Set 04.13.2024 [2 of 3]" label="Flash D.C. Set 04.13.2024 [2 of 3]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1804005675&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/pomotect-flash-dc-set-04132024-part-1" title="Flash D.C. Set 04.13.2024 [1 of 3]" label="Flash D.C. Set 04.13.2024 [1 of 3]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1804004796&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/down-tempo" title="DOWN TEMPO [2 of ?]" label="DOWN TEMPO [2 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1761435171&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                <Soundcloud title_href="https://soundcloud.com/pomotect/space-sounds" title="SPACE SOUNDS [1 of ?]" label="SPACE SOUNDS [1 of ?]" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1692501831&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />

                <div className="hidden md:block">
                    <ScrollToTopButton />
                </div>
            </motion.div>
        </div>
    )
}

export default Sounds