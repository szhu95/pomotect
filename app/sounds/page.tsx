"use client";
import { Soundcloud } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import { motion } from 'framer-motion';

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});

const EMBED_BASE = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
const EMBED_OPTS = '&color=%233100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true';

const MIXES = [
    { id: '1933063748', slug: 'detroit-locomotive', title: 'DETRIOT LOCOMOTIVE [8 of ?]' },
    { id: '1932471983', slug: 'help-me-put-out-the-flames', title: 'HELP ME PUT OUT THE FLAMES [7 of ?]' },
    { id: '1864662273', slug: 'cellar-36-set-062824', title: 'Cellar 36 Set 06.28.24' },
    { id: '1853273079', slug: 'wine-vinyl', title: 'HAPPY ACCIDENTS [6 of ?]' },
    { id: '1842391086', slug: 'in-no-particular-order', title: 'IN NO PARTICULAR ORDER [5 of ?]' },
    { id: '1835031039', slug: 'so-into-dancing', title: 'SO INTO DANCING [4 of ?]' },
    { id: '1832468715', slug: 'down-tempo-ii', title: 'DOWN TEMPO II [3 of ?]' },
    { id: '1804373067', slug: 'flash-dc-set-04132024-3-of-3', title: 'Flash D.C. Set 04.13.2024 [3 of 3]' },
    { id: '1804005675', slug: 'pomotect-flash-dc-set-04132024-part-2', title: 'Flash D.C. Set 04.13.2024 [2 of 3]' },
    { id: '1804004796', slug: 'pomotect-flash-dc-set-04132024-part-1', title: 'Flash D.C. Set 04.13.2024 [1 of 3]' },
    { id: '1761435171', slug: 'down-tempo', title: 'DOWN TEMPO [2 of ?]' },
    { id: '1692501831', slug: 'space-sounds', title: 'SPACE SOUNDS [1 of ?]' },
];

export const dynamic = 'force-dynamic';

export default function Sounds() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div suppressHydrationWarning>
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header`}>Sounds</h3>
                <p className={`${pomotectFont.className} italic`}>Most recently updated on November 28, 2024</p>
            </div>
            <div className="site-section flex justify-center items-center gap-16 -ml-6">
                <Link href="/sounds" scroll={false} className={`${pomotectFont.className} objects_link bg-black text-white hover:bg-black hover:text-white`}>Mixes</Link>
                <Link href="/sounds/sets" scroll={false} className={`${pomotectFont.className} objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white`}>Sets</Link>
            </div>
            {mounted && (
                <div className="site-section">
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                        {MIXES.map((mix, i) => (
                            <motion.div
                                key={mix.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <Soundcloud
                                    compact
                                    tile
                                    title_href={`https://soundcloud.com/pomotect/${mix.slug}`}
                                    title={mix.title}
                                    label={mix.title}
                                    src={`${EMBED_BASE}${mix.id}${EMBED_OPTS}`}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="hidden md:block mt-8">
                        <ScrollToTopButton />
                    </div>
                </div>
            )}
        </div>
    );
}