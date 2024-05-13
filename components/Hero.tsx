"use client";

import Image from 'next/image';
import { motion } from "framer-motion"
import CustomButton from './CustomButton';
import landingPageBackground from '../assets/images/landing-page-bg-2.jpg'
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
                <div className="pt-20 landing-page">
                    <div className="hero-link">
                        <motion.div
                            initial={{ opacity: 0.0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1.0 }}
                        >
                            <Link
                                key="about"
                                href={`/about`}
                                scroll={true}
                                className="group md:hidden">
                                <Image
                                    src={aboutLinkImage}
                                    alt={"about link image"}
                                    width="150"
                                    height="150"
                                />
                            </Link>
                            <Link
                                key="about"
                                href={`/about`}
                                scroll={true}
                                className="group hidden md:block">
                                <Image
                                    src={aboutLinkImage}
                                    alt={"about link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="hero-link">
                        <motion.div
                            initial={{ opacity: 0.0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1.0 }}
                        >
                            <Link
                                key="objects"
                                href={`/objects`}
                                scroll={true}
                                className="group md:hidden">
                                <Image
                                    src={objectsLinkImage}
                                    alt={"objects link image"}
                                    width="150"
                                    height="150"
                                />
                            </Link>
                            <Link
                                key="objects"
                                href={`/objects`}
                                scroll={true}
                                className="group md:block hidden">
                                <Image
                                    src={objectsLinkImage}
                                    alt={"objects link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="hero-link">
                        <motion.div
                            initial={{ opacity: 0.0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1.0 }}
                        >
                            <Link
                                key="words"
                                href={`/words`}
                                scroll={true}
                                className="group md:hidden">
                                <Image
                                    src={wordsLinkImage}
                                    alt={"words link image"}
                                    width="150"
                                    height="150"
                                />
                            </Link>
                            <Link
                                key="words"
                                href={`/words`}
                                scroll={true}
                                className="group md:block hidden">
                                <Image
                                    src={wordsLinkImage}
                                    alt={"words link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="hero-link">
                        <motion.div
                            initial={{ opacity: 0.0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1.0 }}
                        >
                            <Link
                                key="sounds"
                                href={`/sounds`}
                                scroll={true}
                                className="group md:hidden">
                                <Image
                                    src={soundsLinkImage}
                                    alt={"sounds link image"}
                                    width="150"
                                    height="150"
                                />
                            </Link>
                            <Link
                                key="sounds"
                                href={`/sounds`}
                                scroll={true}
                                className="group md:block hidden">
                                <Image
                                    src={soundsLinkImage}
                                    alt={"sounds link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <div className="float-right hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={landingPageBackground}
                            width={700}
                            priority
                            height={300}
                            alt="landing page background image"
                            className='z-0'
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Hero