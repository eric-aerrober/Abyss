import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    icon: LucideIcon;
    onClick?: () => void;
    className?: string;
    label?: string;
    disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick, className = '', label, disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-1 text-text-500 border border-text-900 rounded-sm transition-colors flex gap-2 items-center ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-300 hover:text-primary-300'
            } ${className}`}
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
            className={`px-3 py-1 text-text-300 border border-text-300 rounded-sm transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : selected ? 'border-primary-300 text-text-200' : 'hover:text-primary-200'
            } ${className}`}
        >
            {children}
        </button>
    );
};
