"use client";
import { CustomImageProps } from '@/types'
import React, { useCallback, useState } from 'react';
import Image from "next/image";
import {Controlled as ControlledZoom} from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ZoomableImage = ({ src, alt, height, width, className }: CustomImageProps) => {
    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback((shouldZoom: boolean | ((prevState: boolean) => boolean)) => {
      setIsZoomed(shouldZoom)
    }, [])
    
    return (
        <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} IconUnzoom={() => <>-</>}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
            />
        </ControlledZoom>
    )
}

export default ZoomableImage