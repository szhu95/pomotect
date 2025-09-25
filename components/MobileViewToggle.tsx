"use client";

import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
    src: '../fonts/pomotect-analog-bold.otf',
});

export default function MobileViewToggle() {
    const [isCondensed, setIsCondensed] = useState(false);

    // Update global state for condensed view
    const toggleView = () => {
        const newCondensed = !isCondensed;
        setIsCondensed(newCondensed);
        
        // Use a timeout to ensure DOM is ready
        setTimeout(() => {
            document.documentElement.style.setProperty('--is-mobile-condensed', newCondensed ? '1' : '0');
        }, 0);
    };

    return (
        <div className="md:hidden">
            <button 
                onClick={toggleView}
                className="hover:opacity-80 transition-opacity duration-300"
                title={isCondensed ? "Show full view" : "Show condensed view"}
            >
                <ChevronUpDownIcon 
                    className={`h-6 w-6 transform transition-transform duration-300 ${isCondensed ? 'rotate-180' : ''}`}
                />
            </button>
        </div>
    );
} 