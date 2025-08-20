"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem("cookiesAccepted");
        if (!hasAccepted) {
            // Show consent banner after a short delay
            const timer = setTimeout(() => {
                setShowConsent(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setShowConsent(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookiesAccepted", "false");
        setShowConsent(false);
    };

    return (
        <AnimatePresence>
            {showConsent && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-64 z-50"
                >
                    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
                        <p className="text-gray-700 mb-2 leading-tight pomotect-font">
                            We use cookies to enhance your experience.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={acceptCookies}
                                className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors duration-200 pomotect-font"
                            >
                                Accept
                            </button>
                            <button
                                onClick={declineCookies}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors duration-200 pomotect-font"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
