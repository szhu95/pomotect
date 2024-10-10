import React from "react";
import Image from 'next/image';
import globeAnimation from '../assets/images/globe-animation.gif'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[10000] hidden md:flex flex-1 items-center justify-center">
            <Image
                src={globeAnimation}
                alt="pomo-globe"
                height={300}
                width={300}
            />
        </div>
    );
}