"use client";
import { SoundcloudProps } from '@/types';
import React from 'react';

const Soundcloud = ({ title_href, title, label, src, compact = false, album = false, tile = false }: SoundcloudProps) => {
    const height = compact ? 166 : 250;
    const articleClass = tile
        ? 'group aspect-square rounded-lg border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-primary-blue/40 hover:shadow-lg flex flex-col'
        : album
            ? 'group flex-shrink-0 w-[280px] md:w-[320px] rounded-lg border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-primary-blue/40 hover:shadow-lg snap-start'
            : 'group rounded-lg border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-primary-blue/40 hover:shadow-md';
    return (
        <article className={articleClass}>
            <div className={tile ? 'p-3 pb-1 flex-shrink-0' : album ? 'p-3 pb-0' : 'p-3 md:p-4 pb-0'}>
                <a
                    className="soundcloud_title font-['Minion'] hover:bg-yellow hover:text-black inline-block text-sm line-clamp-2"
                    href={title_href}
                    title={title}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {label}
                </a>
            </div>
            <div className={tile ? 'px-3 pb-3 flex-1 min-h-0' : album ? 'px-3 pb-3' : 'px-3 md:px-4 pb-3 md:pb-4'}>
                <iframe
                    className="w-full rounded-b transition-opacity duration-300 group-hover:opacity-[0.98]"
                    width="100%"
                    height={height}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay"
                    src={src}
                    title={title}
                    loading="lazy"
                />
            </div>
        </article>
    );
};

export default Soundcloud;


