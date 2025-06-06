"use client";
import { motion } from "framer-motion";

const LoadingDots = () => {
    return (
        <div className="flex space-x-1 items-center justify-center">
            <div className="flex space-x-1">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0,
                    }}
                    className="w-1 h-1 bg-white rounded-full"
                />
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.2,
                    }}
                    className="w-1 h-1 bg-white rounded-full"
                />
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.4,
                    }}
                    className="w-1 h-1 bg-white rounded-full"
                />
            </div>
        </div>
    );
};

export default LoadingDots; 