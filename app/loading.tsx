"use client"
import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[10000] hidden md:flex flex-1 items-center justify-center">
            <video
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
                }}
                onLoadStart={() => {
                    console.log('Video loading started');
                }}
                onCanPlay={() => {
                    console.log('Video can play');
                }}
            />
        </div>
    );
}