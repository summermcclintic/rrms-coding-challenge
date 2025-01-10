import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    color: string;
    onClick: () => void;
    className?: string;
}

const Button = ({ children, onClick, color, className = "" }: Props) => {
    return (
        <button onClick={onClick} className={"bg-" + color + "-500 hover:bg-" + color + "-700 text-white font-bold py-2 px-4 rounded shadow-md " + className}>
            {children}
        </button>
    );
};

export default Button;