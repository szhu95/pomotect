"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Check if user has already accepted cookies
        try {
            const hasAccepted = localStorage.getItem("cookiesAccepted");
            if (!hasAccepted) {
                // Show consent banner after a short delay
                const timer = setTimeout(() => {
                    setShowConsent(true);
                }, 1000);
                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.warn("localStorage not available:", error);
        }
    }, []);

    const acceptCookies = () => {
        try {
            localStorage.setItem("cookiesAccepted", "true");
        } catch (error) {
            console.warn("Could not save to localStorage:", error);
        }
        setShowConsent(false);
    };

    const declineCookies = () => {
        try {
            localStorage.setItem("cookiesAccepted", "false");
        } catch (error) {
            console.warn("Could not save to localStorage:", error);
        }
        setShowConsent(false);
    };

    // Don't render anything until we're on the client
    if (!isClient) {
        return null;
    }

    return (
        <AnimatePresence>
            {showConsent && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-80 z-50"
                >
                    <div className="bg-white border-2 border-primary-blue border-dashed shadow-lg p-4 site-section">
                        <p className="minion-font text-black mb-3 leading-relaxed text-sm">
                            We use cookies to enhance your experience.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={acceptCookies}
                                className="pomotect-font px-4 py-2 bg-primary-blue text-white font-medium hover:bg-black transition-colors duration-200 text-sm"
                            >
                                Accept
                            </button>
                            <button
                                onClick={declineCookies}
                                className="pomotect-font px-4 py-2 bg-white text-black border border-gray-300 font-medium hover:bg-gray-100 hover:border-primary-blue transition-colors duration-200 text-sm"
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
