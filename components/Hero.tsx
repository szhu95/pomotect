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
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <Link
                                key="about"
                                href={`about`}
                                scroll={true}
                                className="group">
                                {/* <div className='hidden minion-font z-40 group-hover:inline-block absolute px-2 mt-8 text-white bg-primary-blue'>EXPLORE OBJECTS</div> */}
                                <Image
                                    src={aboutLinkImage}
                                    alt={"about link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                            {/* <CustomButton
                                title="EXPLORE OBJECTS"
                                containerStyles="bg-black hover:bg-primary-blue max-h-[20px]"
                                textColor="text-white minion-font"
                                handleClick={() => router.push('/objects')}
                            /> */}
                        </motion.div>
                    </div>
                    <div className="hero-link">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <Link
                                key="objects"
                                href={`objects`}
                                scroll={true}
                                className="group">
                                {/* <div className='hidden minion-font z-40 group-hover:inline-block absolute px-2 mt-8 text-white bg-primary-blue'>EXPLORE OBJECTS</div> */}
                                <Image
                                    src={objectsLinkImage}
                                    alt={"objects link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                            {/* <CustomButton
                                title="EXPLORE OBJECTS"
                                containerStyles="bg-black hover:bg-primary-blue max-h-[20px]"
                                textColor="text-white minion-font"
                                handleClick={() => router.push('/objects')}
                            /> */}
                        </motion.div>
                    </div>
                    <div className="hero-link">
                        {/* <div className="absolute left-[15%] top-[50%] md:top-[40%]"> */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <Link
                                key="words"
                                href={`words`}
                                scroll={true}
                                className="group">
                                {/* <div className='hidden minion-font z-40 group-hover:inline-block absolute px-2 mt-8 text-white bg-primary-blue'>EXPLORE WORDS</div> */}
                                <Image
                                    src={wordsLinkImage}
                                    alt={"words link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                            {/* <CustomButton
                                title="EXPLORE WORDS"
                                containerStyles="bg-black hover:bg-primary-blue max-h-[18px]"
                                textColor="text-white minion-font"
                                handleClick={() => router.push('/words')}
                            /> */}
                        </motion.div>
                    </div>
                    {/* <div className="absolute left-[40%] md:left-[47%] top-[75%] md:top-[75%]"> */}
                    <div className="hero-link">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.25 },
                            }}
                            whileTap={{ scale: 1.0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <Link
                                key="sounds"
                                href={`sounds`}
                                scroll={true}
                                className="group">
                                {/* <div className='hidden minion-font z-40 group-hover:inline-block absolute px-2 mt-8 text-white bg-primary-blue'>EXPLORE SOUNDS</div> */}
                                <Image
                                    src={soundsLinkImage}
                                    alt={"sounds link image"}
                                    width="200"
                                    height="200"
                                />
                            </Link>
                            {/* <CustomButton
                                title="EXPLORE SOUNDS"
                                containerStyles="bg-black hover:bg-primary-blue max-h-[18px]"
                                textColor="text-white minion-font"
                                handleClick={() => router.push('/sounds')}
                            /> */}
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