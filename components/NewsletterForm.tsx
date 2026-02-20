"use client"
import { useState } from 'react';
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});

export default function NewsletterForm() {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email }),
            });
        

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setEmail('');
            } else {
                setMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            //console.error('Subscription error:', error);
            setMessage('Error subscribing. Please try again.');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className={`${pomotectFont.className} newsletter-form md:flex md:items-center md:text-center text-sm gap-2`}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-h-[48px] md:min-h-0 border-0 border-b border-gray-300 bg-white rounded-none focus:outline-none focus:border-primary-blue text-sm md:border-b-2 md:border-primary-blue/40 md:border-dashed py-2 px-1"
            />
            <button type="submit" disabled={loading} className="min-h-[48px] min-w-[48px] md:min-h-0 md:min-w-0 inline-flex items-center justify-center ml-2 px-4 text-sm transition-colors duration-200 text-primary-blue hover:text-terracotta">
                {loading ? 'Submitting...' : ' Join '}
            </button>
            {message && <p className={`${pomotectFont.className} ml-2 text-sm`}>{message}</p>}
        </form>
    );
}