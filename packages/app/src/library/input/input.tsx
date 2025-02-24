import React from 'react';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
    options?: Array<{
        id: string;
        name: string;
    }>;
}

export const Input = ({ value, onChange, label, placeholder, type = 'text', options }: InputProps) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-text-300 mb-2">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-2 border border-background-light rounded-md text-text-200 bg-background-dark"
            />
            {options && (
                <div className="flex gap-2 mt-2">
                    {options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => onChange(option.id)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                value === option.id
                                    ? 'border border-background-light bg-background-dark'
                                    : 'border border-background-light hover:bg-background-dark'
                            }`}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
