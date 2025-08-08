"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import headerLogo from "@/assets/images/header-logo-2.7.png";

export default function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Simulate minimum loading time of 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Handle mobile autoplay restrictions
        const video = videoRef.current;
        if (video) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay failed, show play button or handle gracefully
                    console.log('Autoplay failed, user interaction required');
                });
            }
        }
    }, []);

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
                                ref={videoRef}
                                src="/globe-animation.webm"
                                autoPlay
                                loop
                                muted
                                playsInline
                                width={300}
                                height={300}
                                className="w-[300px] h-[300px]"
                                onError={(e) => {
                                    console.log('Video failed to load:', e);
                                    setVideoError(true);
                                }}
                                onLoadStart={() => {
                                    console.log('Video loading started');
                                }}
                                onCanPlay={() => {
                                    console.log('Video can play');
                                }}
                            />
                        </div>
                        {/* Mobile: Show static image or simplified animation */}
                        <div className="block md:hidden">
                            <div className="w-[300px] h-[300px] bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="text-white text-2xl font-bold">POMOTECT</div>
                            </div>
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