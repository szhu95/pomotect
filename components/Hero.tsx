"use client";

import Image from 'next/image';
import { motion } from "framer-motion"
import CustomButton from './CustomButton';
import landingPageBackground from '../assets/images/landing-page-bg.png'

import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()

    return (
        <div className="hero">
            <div className="relative flex-1 pt-20 padding-x landing-page">
                <div className="absolute right-[20px] top-[25%]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.25 },
                        }}
                        whileTap={{ scale: 1.0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <CustomButton
                            title="EXPLORE OBJECTS"
                            containerStyles="bg-black hover:bg-primary-blue max-h-[20px]"
                            textColor="text-white minion-font"
                            handleClick={() => router.push('/objects')}
                        />
                    </motion.div>
                </div>
                <div className="absolute left-[15%] top-[50%] md:top-[37%]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.25 },
                        }}
                        whileTap={{ scale: 1.0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <CustomButton
                            title="EXPLORE WORDS"
                            containerStyles="bg-black hover:bg-primary-blue max-h-[18px]"
                            textColor="text-white minion-font"
                            handleClick={() => router.push('/words')}
                        />
                    </motion.div>
                </div>
                <div className="absolute left-[35%] md:left-[52%] top-[75%] md:top-[55%]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.25 },
                        }}
                        whileTap={{ scale: 1.0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <CustomButton
                            title="EXPLORE SOUNDS"
                            containerStyles="bg-black hover:bg-primary-blue max-h-[18px]"
                            textColor="text-white minion-font"
                            handleClick={() => router.push('/sounds')}
                        />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5,  }}
                >
                    <Image
                        src={landingPageBackground}
                        width={700}
                        priority
                        height={300}
                        alt="landing page background image"
                    />
                </motion.div>
            </div>
        </div >
    )
}

export default Hero