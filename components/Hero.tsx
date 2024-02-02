"use client";

import Image from 'next/image';
import CustomButton from './CustomButton';
import landingPageBackground from '../assets/images/landing-page-bg.png'

import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()

    return (
        <div className="hero">
            <div className="relative flex-1 pt-20 padding-x landing_page">
                <div className="absolute right-[0px] top-[25%]">
                <CustomButton
                    title="Explore Objects"
                    containerStyles="group bg-primary-blue hover:bg-yellow italic"
                    textColor="text-white group-hover:text-black" 
                    handleClick={() => router.push('/objects')}
                />
                </div>
                <div className="absolute left-[15%] top-[37%]">
                <CustomButton
                    title="Explore Words"
                    containerStyles="group bg-primary-blue text-white hover:bg-yellow italic"
                    textColor="text-white group-hover:text-black" 
                    handleClick={() => router.push('/words')}
                />
                </div>
                <div className="absolute left-[30%] md:left-[50%] top-[55%]">
                <CustomButton
                    title="Explore Sounds"
                    containerStyles="group bg-primary-blue text-white hover:bg-yellow italic"
                    textColor="text-white group-hover:text-black" 
                    handleClick={() => router.push('/sounds')}
                />
                </div>
                <Image
                    src={landingPageBackground}
                    width={700}
                    height={300}
                    alt="landing page background image"
                />
            </div>
        </div>
    )
}

export default Hero