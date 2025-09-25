"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import headerLogo from "@/assets/images/header-logo-2.7.png";
import globeImage from "@/assets/images/globe-animation.gif";
import { useImageLoading } from "@/context/ImageLoadingContext";

export default function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { isAllImagesLoaded, loadedImages, imagesToLoad } = useImageLoading();

    useEffect(() => {
        // Wait for both minimum time and all images to load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Hide loading when images are loaded (but still respect minimum time)
        if (isAllImagesLoaded) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 100); // Small delay to ensure smooth transition
            return () => clearTimeout(timer);
        }
    }, [isAllImagesLoaded]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Desktop: Show video */}
                        <div className="hidden md:block">
                            <video
                                src="/globe-animation.webm"
                                autoPlay
                                loop
                                muted
                                playsInline
                                width={300}
                                height={300}
                                className="w-[300px] h-[300px]"
                                style={{
                                    WebkitUserSelect: 'none',
                                    WebkitTouchCallout: 'none',
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                            />
                        </div>
                        {/* Mobile: Show static globe image */}
                        <div className="block md:hidden">
                            <Image
                                src={globeImage}
                                alt="Globe"
                                width={300}
                                height={300}
                                className="w-[300px] h-[300px]"
                                priority
                            />
                        </div>
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