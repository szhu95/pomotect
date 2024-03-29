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
}

export interface CustomImageProps {
    src: string;
    alt: string;
    height: number;
    width: number;
    className: any;
}
