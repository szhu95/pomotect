"use client"
import React from "react";
import OptimizedGlobeVideo from "@/components/OptimizedGlobeVideo";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[10000] hidden md:flex flex-1 items-center justify-center">
            <OptimizedGlobeVideo />
        </div>
    );
}