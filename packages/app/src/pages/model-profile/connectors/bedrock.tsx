import React, { useState, useEffect } from 'react';

interface BedrockConfigProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
    onConfigChange: (config: any) => void;
}

const DEFAULT_MODELS = [
    { id: 'anthropic.claude-v2', name: 'Claude V2' },
    { id: 'amazon.titan-text', name: 'Titan Text' },
];

export const BedrockConfig: React.FC<BedrockConfigProps> = ({ selectedModel, onModelChange, onConfigChange }) => {
    const [credentialSource, setCredentialSource] = useState<'environment' | 'profile'>('environment');

    useEffect(() => {
        onConfigChange({ credentialSource });
    }, [credentialSource, onConfigChange]);

    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Model ID</label>
                <input
                    type="text"
                    value={selectedModel}
                    onChange={e => onModelChange(e.target.value)}
                    placeholder="anthropic.claude-v2"
                    className="w-full p-2 bg-bg-primary border border-bg-secondary rounded-md"
                />
                <div className="flex gap-2 mt-2">
                    {DEFAULT_MODELS.map(model => (
                        <button
                            key={model.id}
                            onClick={() => onModelChange(model.id)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                selectedModel === model.id ? 'bg-blue-500 text-white' : 'bg-bg-primary hover:bg-bg-secondary'
                            }`}
                        >
                            {model.name}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Credential Source</label>
                <select
                    value={credentialSource}
                    onChange={e => setCredentialSource(e.target.value as 'environment' | 'profile')}
                    className="w-full p-2 bg-bg-primary border border-bg-secondary rounded-md"
                >
                    <option value="environment">Environment Variables</option>
                    <option value="profile">AWS Profile</option>
                </select>
            </div>
        </>
    );
};
