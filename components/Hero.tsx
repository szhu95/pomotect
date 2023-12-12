"use client";

import Image from 'next/image';
import CustomButton from './CustomButton';

const Hero = () => {
    const handleScroll = () => { };

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Postmodern Tectonics
                </h1>

                <p className="hero__subtitle">
                    A b2b of ideas
                </p>

                <CustomButton
                    title="Explore Objects"
                    containerStyles="bg-primary-blue text-white mt-10"
                    handleClick={handleScroll}
                />
            </div>
        </div>
    )
}

export default Hero