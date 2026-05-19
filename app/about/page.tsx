"use client";
import React from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import Link from 'next/link';

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});


const About = () => {

    return (
        <div>
            <div className="site-section">
                <div className={`${pomotectFont.className} about-section`}>
                    <h3 className={`${pomotectBoldFont.className} main_header`}>About</h3>
                    <p className={`${pomotectFont.className} italic`}>Most recently updated on February 27, 2026</p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="md:w-[75%] md:m-auto">
                        <div className={`${pomotectFont.className} about-section`}>
                            <h3 className={`${pomotectFont.className} about_header pl-1 pr-6`}>Postmodern Tectonics</h3>
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            <span className={pomotectBoldFont.className}>POSTMODERN TECTONICS LLC</span> is a creative label.
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            We design brands, buildings, products, and objects with our own ideas or yours. We exist to bring original works into the world across practically any creative discipline. In the process, we meet and collaborate with incredible people who become friends and members of our label.
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            Founded and operated somewhere between Los Angeles and New York in 2024 by <span className={pomotectBoldFont.className}>STEVIE HU</span>, <span className={pomotectBoldFont.className}>PETE DAILEY</span>, and <span className={pomotectBoldFont.className}>XANDER SHAMBAUGH</span>.
                        </div>

                        <div className="mb-8">
                            <Link className={`${pomotectBoldFont.className} about-section italic hover:text-yellow hover:bg-black hover:cursor-pointer text-primary-blue`} href={'/contact'}>
                                [We welcome artist, designer, or misc. project submissions here]
                            </Link>
                        </div>

                        <div className={`${pomotectBoldFont.className} about-section mt-6`}>
                            MEMBERS
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Casa Ysasi
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            JC
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Lee Pozin
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Blaise Slattery
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Owen Higgs
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Luciano Menghini
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Andrea Sanchez
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Ben Elmer
                        </div>
                        <div className={`${pomotectFont.className} mb-6`}>
                            Niko Pagones
                        </div>

                        <div className={`${pomotectBoldFont.className} about-section mt-6`}>
                            CLIENTS
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Creative Entrepreneurs
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Kolf LLC
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Conca Capital
                        </div>
                        <div className={`${pomotectFont.className} mb-6`}>
                            Amaxi Autosport
                        </div>

                        <div className={`${pomotectBoldFont.className} about-section mt-6`}>
                            PRESS
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Basic Space
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            Public Announcement
                        </div>
                        <div className={`${pomotectFont.className} mb-6`}>
                            Wear Many Hats
                        </div>

                        <div className={`${pomotectBoldFont.className} about-section italic mt-8`}>
                            A B2B OF IDEAS
                        </div>
                    </div>
                </motion.div>
            </div >
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div >

    )
}

export default About
