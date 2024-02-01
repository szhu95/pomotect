"use client";

import Image from 'next/image';
import CustomButton from './CustomButton';
import landingPageBackground from '../assets/images/landing-page-bg.png'

import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()

    return (
        <div className="hero">
            <div className="flex-1 pt-20 padding-x landing_page">
                <CustomButton
                    title="Explore Objects"
                    containerStyles="flex float-right bg-primary-blue mt-10"
                    handleClick={() => router.push('/objects')}
                />
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