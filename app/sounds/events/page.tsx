"use client";
import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react'
import WinstonFlyer from '../../../assets/images/flyer-1.webp'
import FlashFlyer from '../../../assets/images/flash-flyer.webp'
import CellarFlyer from '../../../assets/images/cellar.webp'
import MillionGoodsFlyer from '../../../assets/images/million-goods.webp'
import CellarFlyer2 from '../../../assets/images/cellar-2.webp'
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
    src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../../fonts/pomotect-analog-regular.otf',
});

const Events = () => {

    let lastUpdatedDate = formatDate();

    return (
        <div>
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header`}>Sounds</h3>
                <p className={`${pomotectFont.className} italic`}>Most recently updated on June 28, 2024</p>
            </div>
            <div className="site-section flex justify-center items-center gap-16 -ml-6">
                <Link href="/sounds" scroll={false} className={`${pomotectFont.className} objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white`}>Mixes</Link>
                <Link href="/sounds/events" scroll={false} className={`${pomotectFont.className} objects_link bg-black text-white hover:bg-black hover:text-white`}>Events</Link>
            </div>

            <div className="flex px-2 w-1/8 min-w-12 site-section">
                <ol className="w-full">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        {/* <div className="text-right text-primary-blue italic font-semibold font-['Minion'] border-b border-dashed border-primary-blue -ml-2">UPCOMING</div> */}
                        <div className="text-right text-grey italic font-semibold font-['Minion'] mt-4 border-b border-grey border-dashed">ARCHIVE</div>
                        <li className="border-b border-black">
                            <span className="soundcloud_title font-['Minion']">Coast To Coast</span>
                            <br></br>
                            <p className="text-right text-primary-blue italic font-['Minion']">Cellar 36, New York</p>
                        </li>
                        <div className="mt-4 min-w-10 flex-col">
                            <Image
                                width={650}
                                height={650}
                                src={CellarFlyer2}
                                alt="Coast To Coast Flyer"
                                className='mx-auto'
                            />
                        </div>
                        <li className="border-b border-black">
                            <span className="soundcloud_title font-['Minion']">Million Goods Showcase</span>
                            <br></br>
                            <p className="text-right text-primary-blue italic font-['Minion']">Million Goods, New York</p>
                        </li>
                        <div className="mt-4 min-w-10 flex-col">
                            <Image
                                width={650}
                                height={650}
                                src={MillionGoodsFlyer}
                                alt="Million Goods Flyer"
                                className='mx-auto'
                            />
                        </div>
                        <li className="border-b border-black">
                            <span className="soundcloud_title font-['Minion']">Wine & Wax</span>
                            <br></br>
                            <p className="text-right text-primary-blue italic font-['Minion']">Cellar 36, New York</p>
                        </li>
                        <div className="mt-4 min-w-10 flex-col">
                            <Image
                                width={650}
                                height={650}
                                src={CellarFlyer}
                                alt="Wine & Wax Flyer"
                                className='mx-auto'
                            />
                        </div>
                        <li className="border-b border-black">
                            <span className="soundcloud_title font-['Minion']">Flash Nightclub</span>
                            <br></br>
                            <p className="text-right text-primary-blue italic font-['Minion']">Flash, Washington D.C.</p>
                        </li>
                        <div className="mt-4 min-w-10 flex-col">
                            <Image
                                width={650}
                                height={650}
                                src={FlashFlyer}
                                alt="Flash Nightclub Flyer"
                                className='mx-auto'
                            />
                        </div>
                        <li className="border-b border-black">
                            <span className="soundcloud_title font-['Minion']">Out of the Blue</span>
                            <br></br>
                            <p className="text-right text-primary-blue italic font-['Minion']">Winston House, Los Angeles</p>
                        </li>
                        <div className="mt-4 min-w-10 flex-col">
                            <Image
                                width={650}
                                height={650}
                                src={WinstonFlyer}
                                alt="Winston House Flyer"
                                className='mx-auto'
                            />
                        </div>
                    </motion.div>
                </ol>
            </div>
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div >
    )
}

export default Events