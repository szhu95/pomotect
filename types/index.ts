import { FocusEventHandler, MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleFocus?:
    FocusEventHandler<HTMLButtonElement>;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
}