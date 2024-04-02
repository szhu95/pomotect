"use client";
import { SoundcloudProps } from '@/types';
import React from 'react'

const Soundcloud = ({ title_href, title, label, src }: SoundcloudProps) => {
    return (
        <div className="site-section border-b border-black pb-4">
            <a className="soundcloud_title font-['Minion'] hover:bg-terracotta" href={title_href} title={title} target="_blank">{label}</a>
            <div className="border-b border-black pb-2 -ml-[10px]" />
            <iframe className="soundcloud_link soundcloud-section" width="100%" height="250" allow="autoplay" src={src}></iframe>
        </div>
    )
}

export default Soundcloud


