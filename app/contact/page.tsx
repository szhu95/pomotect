import React from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Image from "next/image";
import BusinessCard from "../../assets/images/business-card.png";
import BusinessCardBack from "../../assets/images/business-card-back.png"

const Contact = () => {

    return (
        <div>
            <div className="site-section">
                <div className="mt-[10%] mx-[10%] center items-center">
                    <Image
                        width={700}
                        height={1000}
                        src={BusinessCard}
                        alt="business card"
                    />

                    <Image
                        width={700}
                        height={1000}
                        className='mt-[15%]'
                        src={BusinessCardBack}
                        alt="business card back"
                    />
                </div>
            </div>
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div >
    )
}

export default Contact