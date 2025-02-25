import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    icon: LucideIcon;
    onClick?: () => void;
    className?: string;
    label?: string;
    disabled?: boolean;
    borderless?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    onClick,
    className = '',
    label,
    disabled = false,
    borderless = false,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-1 px-3 border border-primary-light rounded transition-colors flex gap-3 items-center bg-background-dark ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-base hover:text-primary-base'
            } ${className} ${borderless ? 'border-none' : ''}`}
        >
            <Icon size={18} />
            {label && <div className="text-sm">{label}</div>}
        </button>
    );
};

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    selected?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, className = '', children, disabled = false, selected = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` text-sm px-3 py-1 border border-primary-light rounded transition-colors bg-background-dark ${
                disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : selected
                    ? 'border-primary-base text-text-light bg-background-dark'
                    : 'hover:text-text-light hover:border-primary-base'
            } ${className}`}
        >
            {children}
        </button>
    );
};

interface DestructiveButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export const DestructiveButton: React.FC<DestructiveButtonProps> = ({ onClick, className = '', children, disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-fit px-3 py-1 text-sm text-white bg-red-500 bg-opacity-20 border border-red-900 rounded-sm transition-colors bg-background-dark ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:border-red-600'
            } ${className}`}
        >
            {children}
        </button>
    );
};
