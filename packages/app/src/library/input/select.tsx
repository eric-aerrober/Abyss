import React from 'react';

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

export function Select({ value, onChange, options, placeholder, className = '' }: SelectProps) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-[300px] bg-primary-900/20 text-text-200 border border-primary-950 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary-700 ${className}`}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
