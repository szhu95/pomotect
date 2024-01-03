import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleFocus?:
    FocusEventHandler<HTMLButtonElement>;
    handleClick?: any;
}

export interface CustomDropdownProps {
    selected: string;
    title: string;
    options: string[];
    containerStyles?: string;
    handleChange?: any;
}