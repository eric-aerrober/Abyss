import React, { useEffect, useState } from 'react';
import { PageCenter } from '../../library/layout/page-center';
import { useDatabaseQuery, useDatabaseTableSubscription } from '../../state/database-connection';
import { Select } from '../../library/input/select';

export function ChatCreatePage() {
    const allModels = useDatabaseTableSubscription('ModelConnections', async database => database.table.ModelConnections.findMany());
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (allModels.data) {
            setSelectedModel(allModels.data[0].id);
        }
    }, [allModels.data]);

    return (
        <div>
            <div className="text-xl font-bold">Start new chat</div>
            <Select
                value={selectedModel}
                onChange={setSelectedModel}
                options={allModels.data?.map(model => ({ value: model.id, label: model.name })) || []}
                placeholder="Select a model"
            />
            <textarea
                rows={6}
                className="w-full bg-primary-900/20 text-text-200 border border-primary-950 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary-700"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
        </div>
    );
}
