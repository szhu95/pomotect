"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import MsFlyer from '../../assets/images/ms-flyer.webp';

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});

const Rsvp = () => {
    // TEMPLATE CODE - COMMENTED OUT FOR FUTURE USE
    /*
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType(null);

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setMessageType('success');
                setName('');
                setEmail('');
            } else {
                setMessage(data.message || 'Something went wrong.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error submitting RSVP. Please try again.');
            setMessageType('error');
        }

        setLoading(false);
    };
    */

    return (
        <div>
            <div className="site-section">
                <div className={`${pomotectFont.className} about-section`}>
                    <h3 className={`${pomotectBoldFont.className} main_header`}>RSVP</h3>
                    <p className={`${pomotectFont.className} italic`}>Most recently updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full max-w-md text-center"
                >
                    <div className={`${pomotectBoldFont.className} text-2xl mb-4`}>
                        Thank you for coming to our listening session.
                    </div>
                    <div className={`${pomotectFont.className} text-lg mb-8`}>
                        We hope you enjoyed the event!
                    </div>
                    <div className={`${pomotectFont.className} text-sm text-gray-600`}>
                        For inquiries about [CASE STUDY - 01] and other upcoming events, please{' '}
                        <Link href="/contact" className={`${pomotectFont.className} text-primary-blue hover:underline`}>
                            contact us directly
                        </Link>.
                    </div>
                </motion.div>
            </div>

            {/* TEMPLATE CODE - COMMENTED OUT FOR FUTURE USE */}
            {/*
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-8 relative w-full aspect-square">
                        <div className="w-full h-full block items-center justify-center text-center">
                            <div className={`${pomotectBoldFont.className} text-black`}>Ysasi Gallery</div>
                            <div className={`${pomotectBoldFont.className} text-black`}>Saturday, June 21</div>
                            <div className={`${pomotectBoldFont.className} text-black`}>5 to 9 PM</div>
                            <div className={`${pomotectBoldFont.className} text-black`}>
                                <span className={`block md:inline ${pomotectBoldFont.className}`}>5104 W Adams Blvd,</span>
                                <span className={`block md:inline ${pomotectBoldFont.className}`}> Los Angeles, CA 90016</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 relative w-full">
                        <Image
                            src={MsFlyer}
                            alt="MS Flyer"
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    <div className="mb-8 relative w-full aspect-square">
                        <div className="w-full h-full flex items-center justify-center">
                            <span className={`${pomotectFont.className} text-black`}>Join us at Casa Ysasi for a listening session — an afternoon and evening of wide-ranging vinyl-only programming — to celebrate the release of Musical Furniture [Case Study 001].
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className={`${pomotectFont.className} w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`${pomotectFont.className} w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                                required
                                disabled={loading}
                            />
                        </div>
                        {message && (
                            <div className={`${pomotectFont.className} text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className={`${pomotectBoldFont.className} w-full bg-primary-blue text-white p-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'RSVP'}
                        </button>
                    </form>
                </motion.div>
            </div>
            */}
        </div>
    );
};

export default Rsvp;