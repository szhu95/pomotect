"use client";
import React from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { motion } from 'framer-motion';

const About = () => {

    return (
        <div>
            <div className="site-section">
                <div className="about-section">
                    <h3 className="main_header">About</h3>
                    <p><i>Most recently updated on May 28, 2024</i></p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="about-section">
                        <h3 className="about_header minion-font pl-1 pr-6">Postmodern Tectonics </h3>

                        <div className="about-section"><b><span className="minion-font italic">Postmodern Tectonics LLC</span></b> is a general purpose creative studio.</div>

                        <div className="about-section">We behave like a record label, fueled by constant collaboration and the desire for others to join our collective.</div>

                        <div className="about-section">
                            Founded in ©2024 somewhere between New York & Los Angeles, our office was built around three human art forms: Objects, Words and Sounds.
                            Our hope is to create new artifacts and experiences that move us into the future, always with a healthy respect for the past —
                            <span className="minion-font italic"> analog spirit for a digital world.</span>
                        </div>

                        <div className="about-section">
                            Tectonics can be best defined as the science or art of construction. We intend to explore various tectonics, talk about them, and share our research with the world.
                            Through <span className="minion-font italic">listening, thinking </span> and <span className="minion-font italic">making</span>, we plan to manifest an all-encompassing exchange of ideas via our bespoke website:
                        </div>
                    </div>
                    <div className="about-section">
                        <div className="minion-font font-bold">OBJECTS</div>
                        A collection of things that we make and sometimes sell.
                    </div>

                    <div className="about-section">
                        <div className="minion-font font-bold">WORDS</div>
                        Disciplined observation of the world is the source of all creative inspiration, so we try to keep an eye or ear out for goings-on worth going on about.
                    </div>

                    <div className="about-section">
                        <div className="minion-font font-bold">SOUNDS</div>
                        More dance, less talk. From time-to-time, we bring people together on the dancefloor, to enjoy music in a temporary autonomous zone. We hope to see you guys out there.
                    </div>

                    <div className="about-section">
                        We invite you to take a look around – follow us on our socials to stay up to date on our latest releases.
                    </div>
                </motion.div>
            </div>
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div >

    )
}

export default About