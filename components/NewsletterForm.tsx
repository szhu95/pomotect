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
        <form onSubmit={handleSubmit} className={`${pomotectFont.className} newsletter-form md:flex md:text-center`}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" disabled={loading} className="text-primary-blue ml-2">
                {loading ? 'Submitting...' : ' Join '}
            </button>
            {message && <p className={`${pomotectFont.className} ml-2`}>{message}</p>}
        </form>
    );
}