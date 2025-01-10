import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined;
}

const Button = ({ children, onClick, className = "", type = undefined }: Props) => {
    return (
        <button type={type} onClick={onClick} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md " + className}>
            {children}
        </button>
    );
};

export default Button;