"use client";

import Image from 'next/image';
import { motion } from "framer-motion"
import FadeInImage from './FadeInImage'
import landingPageBackground from '../assets/images/landing-page-bg-3.webp'
import landingPageBackgroundMobile from '../assets/images/landing-page-mobile-bg.webp'
import aboutLinkImage from '../assets/images/about-part.webp'
import objectsLinkImage from '../assets/images/objects-part.webp'
import wordsLinkImage from '../assets/images/words-part.webp'
import soundsLinkImage from '../assets/images/sounds-part.webp'

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useImagePreloader } from '@/hooks/useImagePreloader';

const Hero = () => {
    const router = useRouter()

    // Preload all critical images
    useImagePreloader(landingPageBackground.src);
    useImagePreloader(landingPageBackgroundMobile.src);
    useImagePreloader(aboutLinkImage.src);
    useImagePreloader(objectsLinkImage.src);
    useImagePreloader(wordsLinkImage.src);
    useImagePreloader(soundsLinkImage.src);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="hero">
                <div className="hidden w-[100%] md:inline">
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FadeInImage
                            src={landingPageBackground}
                            height={2000}
                            width={2000}
                            alt="landing page background image"
                            className='z-0 w-[100%] absolute'
                            priority
                            decoding="async"
                            quality={85}
                            fadeDuration={1.2}
                            delay={0}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                key="objects"
                                href={`/products`}
                                className="group md:block absolute top-[6vw] left-[6vw] hidden"
                                scroll={false}>
                                <Image
                                    src={objectsLinkImage}
                                    alt={"Objects"}
                                    width="150"
                                    height="150"
                                    className='w-[10vw]'
                                    loading="lazy"
                                    quality={80}
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
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link
                                key="words"
                                href={`/words`}
                                className="group md:block absolute top-[13vw] left-[22vw] hidden">
                                <Image
                                    src={wordsLinkImage}
                                    alt={"Words"}
                                    width="200"
                                    height="200"
                                    className='w-[10vw]'
                                    loading="lazy"
                                    quality={80}
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
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                key="sounds"
                                href={`/sounds`}
                                className="group md:block absolute top-[26vw] left-[6vw] hidden"
                                scroll={false}>
                                <Image
                                    src={soundsLinkImage}
                                    alt={"Sounds"}
                                    width="200"
                                    height="200"
                                    className='w-[10vw]'
                                    loading="lazy"
                                    quality={80}
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
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Link
                                key="about"
                                href={`/about`}
                                className="group hidden absolute top-[36vw] left-[22vw] md:flex"
                                scroll={false}>
                                <Image
                                    src={aboutLinkImage}
                                    alt={"About"}
                                    width="200"
                                    height="200"
                                    className='w-[10vw]'
                                    loading="lazy"
                                    quality={80}
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
                        <FadeInImage
                            src={landingPageBackgroundMobile}
                            height={1000}
                            width={1000}
                            alt="landing page background mobile image"
                            className='z-0 w-[100%] absolute'
                            priority
                            decoding="async"
                            quality={85}
                            fadeDuration={1.2}
                            delay={0}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            animate={{ opacity: 1.0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                key="objects"
                                href={`/products`}
                                className="group block absolute top-[12vw] left-[7vw] md:hidden"
                                scroll={false}>
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
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link
                                key="words"
                                href={`/words`}
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
                                className="group block absolute top-[60vw] left-[6vw] md:hidden"
                                scroll={false}>
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
                                className="group md:hidden absolute top-[85vw] left-[35vw] block"
                                scroll={false}>
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