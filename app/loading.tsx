"use client"
import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[10000] hidden md:flex flex-1 items-center justify-center">
            <video
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
            >
                <source src="/globe-animation.webm" type="video/webm" />
                <source src="/globe-animation.mp4" type="video/mp4" />
                <img src="/globe-animation.gif" alt="Loading..." className="w-[300px] h-[300px]" />
            </video>
        </div>
    );
}