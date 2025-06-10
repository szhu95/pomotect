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
                    <p className={`${pomotectFont.className} italic`}>Most recently updated on March 09, 2025</p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="md:w-[75%] md:m-auto">
                        <div className={`${pomotectFont.className} about-section`}>
                            <h3 className={`${pomotectFont.className} about_header pl-1 pr-6`}>Postmodern Tectonics </h3>

                            <div className={`${pomotectBoldFont.className} about-section`}><b><span className={`${pomotectBoldFont.className} italic`}>Postmodern Tectonics LLC</span></b>  is the world's first <span className={`${pomotectBoldFont.className} text-primary-blue italic`}>Creative Label™</span>. </div>

                            <div className={`${pomotectBoldFont.className} about-section`}>We exist to help emerging artists and designers actualize their visions for new creations in the physical world through creative joint ventures.</div>

                            <div className={`${pomotectBoldFont.className} about-section italic hover:text-yellow hover:bg-black hover:cursor-pointer text-primary-blue`} onClick={(e) => {window.open('mailto:office@pomotect.com?subject=Project%20Inquiry%20-%20[name%20here]&body=Hello%20Postmodern%20Tectonics%20Team,');}}>
                                [We welcome artist, designer, or misc. project submissions here]
                            </div>

                            <div className={`${pomotectBoldFont.className} about-section`}>
                                Our work centers on the design, fabrication, and distribution of artifacts or experiences that move us into the future, always with a healthy respect for the past.
                            </div>
                        </div>
                        <div className={`${pomotectFont.className} about-section`}>
                            <span className={`${pomotectBoldFont.className}`}>POSTMODERN</span> — because we do not adhere to dogmatic rules about what things should look, feel, or act like.
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            <span className={`${pomotectBoldFont.className}`}>TECTONICS</span> — because we explore the art and science of construction through everything we research and make.
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            Currently, the Label is focused on — but never limited to — four human art forms:
                        </div>

                        <div className={`${pomotectFont.className} text-primary-blue md:text-black hover:text-primary-blue hover:cursor-pointer`}>
                            <Link href="/products/process" className={`${pomotectBoldFont.className}`}> Architecture,</Link>
                        </div>

                        <div className={`${pomotectFont.className} text-primary-blue md:text-black hover:text-primary-blue hover:cursor-pointer`}>
                            <Link href="/products" className={`${pomotectBoldFont.className}`}> Objects,</Link>
                        </div>

                        <div className={`${pomotectFont.className} text-primary-blue md:text-black hover:text-primary-blue hover:cursor-pointer`}>
                            <Link href="/words" className={`${pomotectBoldFont.className}`}> Words,</Link>
                        </div>

                        <div className={`${pomotectFont.className} text-primary-blue md:text-black hover:text-primary-blue hover:cursor-pointer mb-6`}>
                            <Link href="/sounds" className={`${pomotectBoldFont.className}`}> and Sounds.</Link>
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            In the past, we have made or helped others make…
                        </div>

                        <div className={`${pomotectFont.className}`}>
                            …apparel
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …ceramics
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …music
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …vinyl
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …essays
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …books
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …zines
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …tote bags
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …logos
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …typefaces
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …brand strategy
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …event strategy
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …music curation (DJ)
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …spatial design
                        </div>
                        <div className={`${pomotectFont.className}`}>
                            …furniture
                        </div>
                        <div className={`${pomotectFont.className} mb-6`}>
                            …and architecture
                        </div>

                        <div className={`${pomotectFont.className} about-section italic`}>
                            Disciplined observation of the world is the source of all creative inspiration.
                        </div>

                        <div className={`${pomotectFont.className} about-section`}>
                            We were founded in ©2024 somewhere between New York & Los Angeles.
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