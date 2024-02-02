"use client";

import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ( { title, containerStyles, textColor, handleFocus, handleClick }: CustomButtonProps) => {

    return (
        <button
            disabled={false}
            type={"button"}
            className={`custom-btn ${containerStyles}`}
            onFocus={handleFocus}
            onClick={(e) => handleClick(e)}
        >
            <div className={`flex-1 ${textColor}`}>
                {title}
            </div>
        </button>
    )
}

export default CustomButton