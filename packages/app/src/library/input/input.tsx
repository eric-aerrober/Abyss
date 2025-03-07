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
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = ({ value, onChange, label, placeholder, type = 'text', options, onKeyDown }: InputProps) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-text-300 mb-2">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
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

export const InputArea = ({ value, onChange, label, placeholder, onKeyDown }: InputProps) => {
    return (
        <div className="mb-2">
            {label && <label className="block text-sm font-medium text-text-300 mb-1">{label}</label>}
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                rows={7}
                className="w-full p-2 border border-background-light rounded-md text-text-200 bg-background-dark"
            />
        </div>
    );
};
