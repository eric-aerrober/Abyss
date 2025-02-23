import React from 'react';
import { Input } from '../../../library/input/input';

interface OpenAIConfigProps {
    selectedModel: string;
    config: {
        apiKey: string;
    };
    onModelChange: (model: string) => void;
    onConfigChange: (config: any) => void;
}

const DEFAULT_MODELS = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
];

export function OpenAIConfig({ selectedModel, config, onModelChange, onConfigChange }: OpenAIConfigProps) {
    return (
        <>
            <Input label="Model ID" value={selectedModel} onChange={onModelChange} options={DEFAULT_MODELS} />
            <Input label="API Key" value={config.apiKey} onChange={e => onConfigChange({ ...config, apiKey: e })} />
        </>
    );
}
