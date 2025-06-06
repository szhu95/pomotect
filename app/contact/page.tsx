"use client";
import React, { useState, useEffect } from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import localFont from 'next/font/local';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingDots from '@/components/LoadingDots';

const pomotectBoldFont = localFont({
    src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../fonts/pomotect-analog-regular.otf',
});

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                setStatus('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header mb-2`}>Contact</h3>
                <p className={`${pomotectFont.className} italic mb-8`}>Questions? Ideas? Want to collaborate? Let's create something.</p>
            </div>
            <div className="site-section max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 md:gap-8">
                            <div>
                                <label htmlFor="name" className={`${pomotectFont.className} block text-sm mb-2`}>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={`${pomotectFont.className} w-full px-4 py-2 border border-gray-300 focus:border-primary-blue focus:outline-none bg-transparent backdrop-blur-sm`}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className={`${pomotectFont.className} block text-sm mb-2`}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`${pomotectFont.className} w-full px-4 py-2 border border-gray-300 focus:border-primary-blue focus:outline-none bg-transparent backdrop-blur-sm`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className={`${pomotectFont.className} block text-sm mb-2`}>Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Inquiry from [your name]"
                                className={`${pomotectFont.className} w-full px-4 py-2 border border-gray-300 focus:border-primary-blue focus:outline-none bg-transparent backdrop-blur-sm`}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className={`${pomotectFont.className} block text-sm mb-2`}>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={10}
                                className={`${pomotectFont.className} w-full px-4 py-2 border border-gray-300 focus:border-primary-blue focus:outline-none bg-transparent backdrop-blur-sm resize-none`}
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`${pomotectFont.className} w-auto min-w-[120px] bg-primary-blue text-white py-2 px-6 hover:bg-opacity-90 transition-colors disabled:opacity-50`}
                                >
                                    {status === 'sending' ? <LoadingDots /> : 'Send'}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`${pomotectFont.className} text-green-600 text-center mt-4`}
                                >
                                    Message sent successfully!
                                </motion.p>
                            )}
                        </AnimatePresence>
                        
                        {status === 'error' && (
                            <p className={`${pomotectFont.className} text-red-600 text-center mt-4`}>
                                Failed to send message. Please try again.
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div>
    )
}

export default Contact