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
                className="w-full p-2 border border-text-700 rounded-md bg-transparent text-text-200"
            />
            {options && (
                <div className="flex gap-2 mt-2">
                    {options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => onChange(option.id)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                value === option.id
                                    ? 'border border-primary-300 text-text-200'
                                    : 'border border-text-700 text-text-500 hover:text-text-200'
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
