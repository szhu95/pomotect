"use client"
import emailHandler from '@/utils';
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
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                setMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            setMessage('Error subscribing. Please try again.');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className={`${pomotectFont.className} newsletter-form`}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Join'}
            </button>
            {message && <p className={`${pomotectFont.className}`}>{message}</p>}
        </form>
    );
}