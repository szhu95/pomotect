"use client";
import { CustomImageProps } from '@/types'
import React, { useCallback, useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';

const ZoomableImage = ({ src, alt, height, width, className, onClick }: CustomImageProps & { onClick?: () => void }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className + ' cursor-zoom-in'}
            onClick={onClick}
        />
    );
}

export default ZoomableImage