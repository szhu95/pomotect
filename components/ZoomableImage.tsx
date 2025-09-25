"use client";
import { CustomImageProps } from '@/types'
import React from 'react';
import FadeInImage from './FadeInImage';

const ZoomableImage = ({ src, alt, height, width, className, onClick }: CustomImageProps & { onClick?: () => void }) => {
    return (
        <FadeInImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className + ' cursor-zoom-in'}
            onClick={onClick}
            fadeDuration={0.8}
            delay={0.1}
        />
    );
}

export default ZoomableImage