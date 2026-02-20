import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    textColor?: string;
    handleFocus?:
    FocusEventHandler<HTMLButtonElement>;
    handleClick: 
    MouseEventHandler<HTMLButtonElement>;
}

export interface CustomDropdownProps {
    selected: string;
    title: string;
    options: string[];
    containerStyles?: string;
    handleChange?: any;
}

export interface SoundcloudProps {
    title_href?: string;
    title?: string;
    label?: string;
    src?: string;
    /** Use compact player height (166px) for grid layouts */
    compact?: boolean;
    /** Album style: fixed width for horizontal scroll strip */
    album?: boolean;
}

export interface CustomImageProps {
    src: string;
    alt: string;
    height: number;
    width: number;
    className: any;
}
