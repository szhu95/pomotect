import React from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Image from "next/image";
import BusinessCard from "../../assets/images/business-card.png"

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
                </div>
            </div>
            <ScrollToTopButton />
        </div >
    )
}

export default Contact