"use client";

import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ( { title, containerStyles, handleFocus, handleClick }: CustomButtonProps) => {

    return (
        <button
            disabled={false}
            type={"button"}
            className={`custom-btn ${containerStyles}`}
            onFocus={handleFocus}
            onClick={(e) => handleClick(e)}
        >
            <span className={`flex-1 text-white font-['Minion']`}>
                {title}
            </span>
        </button>
    )
}

export default CustomButton