"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import headerLogo from "@/assets/images/header-logo-2.7.png";
import OptimizedGlobeVideo from "./OptimizedGlobeVideo";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
    const pathname = usePathname();
    
    // Initialize state immediately to prevent flash - start with true on client
    // to cover the splash screen, then check if we should actually show it
    const [isLoading, setIsLoading] = useState(() => {
        // On client, check immediately if we should show splash
        if (typeof window !== 'undefined') {
            const hasVisited = sessionStorage.getItem('has-visited');
            // Check if we're on homepage by checking window.location
            const isHomepage = window.location.pathname === '/';
            return !hasVisited && isHomepage;
        }
        // On server, default to false
        return false;
    });

    useEffect(() => {
        // Only show splash screen on homepage and only on first visit
        const hasVisited = sessionStorage.getItem('has-visited');
        const isHomepage = pathname === '/';
        
        if (!hasVisited && isHomepage && isLoading) {
            // First visit to homepage - set up timer to hide splash screen
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('has-visited', 'true');
            }, 2000);

            return () => clearTimeout(timer);
        } else if (hasVisited || !isHomepage) {
            // If already visited or not homepage, ensure loading is false
            setIsLoading(false);
        }
    }, [pathname, isLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[10001] bg-white flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <OptimizedGlobeVideo />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4"
                    >
                        <Image
                            src={headerLogo}
                            alt="Postmodern Tectonics"
                            width={200}
                            height={50}
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 