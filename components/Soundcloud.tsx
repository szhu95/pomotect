"use client";
import { SoundcloudProps } from '@/types';
import React from 'react'

const Soundcloud = ({ title_href, title, label, src }: SoundcloudProps) => {
    return (
        <div className="site-section soundcloud-section">
            <div>
                <a className="soundcloud_title" href={title_href} title={title} target="_blank">{label}</a>
            </div>
            <iframe className="soundcloud_link" width="100%" height="250" allow="autoplay" src={src}></iframe>
        </div>
    )
}

export default Soundcloud


