"use client";
import React, { useState } from 'react';
import localFont from 'next/font/local';

const minionFont = localFont({
  src: '../fonts/garamond.ttf'
});

const sendButtonClass = `bg-primary-blue text-white minion-font hover:bg-opacity-90 disabled:opacity-50 px-4 py-1 border border-primary-blue shadow-sm tracking-wide transition-all duration-200 ease-in-out`;
const sendButtonStyle = { borderRadius: 0, fontSize: '0.85rem', height: '2rem' };

interface InquiryFormProps {
  productTitle: string;
  onClose: () => void;
}

export default function InquiryForm({ productTitle, onClose }: InquiryFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`I'm interested in ${productTitle}. Please provide more information.`);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject: `Inquiry about ${productTitle}`,
          message,
          type: 'inquiry',
          productTitle,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={`${minionFont.className} bg-white p-6 shadow-lg`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium mb-1 minion-font" style={{ fontSize: '0.85rem' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="[Your Email]"
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue minion-font`}
            style={{ borderRadius: 0, fontSize: '0.85rem' }}
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1 minion-font" style={{ fontSize: '0.85rem' }}>
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue minion-font`}
            style={{ borderRadius: 0, fontSize: '0.85rem' }}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 minion-font"
            style={{ borderRadius: 0, fontSize: '0.85rem', background: 'none' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === 'sending'}
            className={sendButtonClass + ' hover:scale-[1.03]'}
            style={sendButtonStyle}
          >
            {status === 'sending' ? 'Sending...' : 
             status === 'success' ? 'Sent!' : 
             status === 'error' ? 'Error' : 
             'Send Inquiry'}
          </button>
        </div>
      </form>
    </div>
  );
} 