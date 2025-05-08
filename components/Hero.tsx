"use client";

import Image from 'next/image';
import { motion } from "framer-motion"
import landingPageBackground from '../assets/images/landing-page-bg-3.png'
import landingPageBackgroundMobile from '../assets/images/landing-page-mobile-bg.png'
import aboutLinkImage from '../assets/images/about-part.png'
import objectsLinkImage from '../assets/images/objects-part.png'
import wordsLinkImage from '../assets/images/words-part.png'
import soundsLinkImage from '../assets/images/sounds-part.png'

import { useRouter } from 'next/navigation'
import Link from 'next/link';

const Hero = () => {
    const router = useRouter()

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="hero">
                <div className="hidden w-[100%] md:inline">
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={landingPageBackground}
                            height={1000}
                            width={1000}
                            alt="landing page background image"
                            className='z-0 w-[100%] absolute'
                            loading="lazy" 
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="objects"
                                href={`/products`}
                                scroll={true}
                                className="group md:block absolute top-[6vw] left-[6vw] hidden">
                                <Image
                                    src={objectsLinkImage}
                                    alt={"Objects"}
                                    width="150"
                                    height="150"
                                    className='w-[10vw]'
                                />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="words"
                                href={`/words`}
                                scroll={true}
                                className="group md:block absolute top-[13vw] left-[22vw] hidden">
                                <Image
                                    src={wordsLinkImage}
                                    alt={"Words"}
                                    width="200"
                                    height="200"
                                    className='w-[10vw]'
                                />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="sounds"
                                href={`/sounds`}
                                scroll={true}
                                className="group md:block absolute top-[26vw] left-[6vw] hidden">
                                <Image
                                    src={soundsLinkImage}
                                    alt={"Sounds"}
                                    width="200"
                                    height="200"
                                    className='w-[10vw]'
                                />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="about"
                                href={`/about`}
                                scroll={true}
                                className="group hidden absolute top-[36vw] left-[22vw] md:flex">
                                <Image
                                    src={aboutLinkImage}
                                    alt={"About"}
                                    width="200"
                                    height="200"
                                    className='w-[10vw]'
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                {/* **************MOBILE HOME PAGE LAYOUT**************** */}
                <div className="inline w-[100%] md:hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={landingPageBackgroundMobile}
                            height={1000}
                            width={1000}
                            alt="landing page background mobile image"
                            className='z-0 w-[100%] absolute'
                            loading="lazy" 
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="objects"
                                href={`/products`}
                                scroll={true}
                                className="group block absolute top-[12vw] left-[7vw] md:hidden">
                                <Image
                                    src={objectsLinkImage}
                                    alt={"Objects"}
                                    width="150"
                                    height="150"
                                    className='w-[28vw]'
                                />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="words"
                                href={`/words`}
                                scroll={true}
                                className="group block absolute top-[35vw] left-[35vw] md:hidden">
                                <Image
                                    src={wordsLinkImage}
                                    alt={"Words"}
                                    width="200"
                                    height="200"
                                    className='w-[28vw]'
                                />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="sounds"
                                href={`/sounds`}
                                scroll={true}
                                className="group block absolute top-[60vw] left-[6vw] md:hidden">
                                <Image
                                    src={soundsLinkImage}
                                    alt={"Sounds"}
                                    width="200"
                                    height="200"
                                    className='w-[28vw]'
                                />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                        >
                            <Link
                                key="about"
                                href={`/about`}
                                scroll={true}
                                className="group md:hidden absolute top-[85vw] left-[35vw] block">
                                <Image
                                    src={aboutLinkImage}
                                    alt={"About"}
                                    width="200"
                                    height="200"
                                    className='w-[30vw]'
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Hero