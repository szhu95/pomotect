"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import headerLogo from "@/assets/images/header-logo-2.7.png";
import OptimizedGlobeVideo from "./OptimizedGlobeVideo";
import { usePathname } from "next/navigation";
import { useSplash } from "@/context/SplashContext";

export default function SplashScreen() {
    const pathname = usePathname();
    const { setRevealed } = useSplash();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('has-visited');
        const isHomepage = pathname === '/';

        if (!isHomepage) {
            setIsLoading(false);
            setRevealed(true);
            return;
        }

        if (hasVisited) {
            setIsLoading(false);
            setRevealed(true);
            return;
        }

        // First visit to home — show splash, then reveal (client-only; avoids SSR/hydration blank screen)
        setIsLoading(true);
        setRevealed(false);
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('has-visited', 'true');
            setRevealed(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [pathname, setRevealed]);

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