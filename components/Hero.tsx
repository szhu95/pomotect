"use client";

import Image from 'next/image';
import CustomButton from './CustomButton';
import landingPageBackground from '../assets/images/landing-page-bg.png'

import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()

    return (
        <div className="hero">
            <div className="relative flex-1 pt-20 padding-x landing-page">
                <div className="absolute right-[0px] top-[25%]">
                <CustomButton
                    title="EXPLORE OBJECTS"
                    containerStyles="bg-black hover:bg-primary-blue"
                    textColor="text-white font-semibold bebas-font" 
                    handleClick={() => router.push('/objects')}
                />
                </div>
                <div className="absolute left-[15%] top-[52%] md:top-[37%]">
                <CustomButton
                    title="EXPLORE WORDS"
                    containerStyles="bg-black hover:bg-primary-blue"
                    textColor="text-white font-semibold bebas-font"
                    handleClick={() => router.push('/words')}
                />
                </div>
                <div className="absolute left-[40%] md:left-[50%] top-[80%] md:top-[55%]">
                <CustomButton
                    title="EXPLORE SOUNDS"
                    containerStyles="bg-black hover:bg-primary-blue"
                    textColor="text-white font-semibold bebas-font" 
                    handleClick={() => router.push('/sounds')}
                />
                </div>
                <Image
                    src={landingPageBackground}
                    width={700}
                    priority
                    height={300}
                    alt="landing page background image"
                />
            </div>
        </div>
    )
}

export default Hero