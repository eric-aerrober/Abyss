import React, { useEffect, useState } from 'react';
import { PageCenter } from '../../library/layout/page-center';
import { useDatabaseQuery, useDatabaseTableSubscription } from '../../state/database-connection';
import { Select } from '../../library/input/select';
import { Database } from '../../main';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../library/input/button';

export function ChatCreatePage() {
    const allModels = useDatabaseTableSubscription('ModelConnections', async database => database.table.modelConnections.findMany());
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        if (allModels.data) {
            setSelectedModel(allModels.data[0].id);
        }
    }, [allModels.data]);

    const handleSubmit = async () => {
        if (selectedModel && message) {
            const thread = await Database.table.chat.createWithThread({
                name: 'New Chat',
                partyA: selectedModel,
                partyB: 'USER',
            });
            navigate(`/chats/id/${thread.threadId}`);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">Start new chat</div>
            <Select
                label="Choose what to chat with"
                value={selectedModel}
                onChange={setSelectedModel}
                options={allModels.data?.map(model => ({ value: model.id, label: model.name })) || []}
                placeholder="Select a model"
            />
            <textarea
                rows={6}
                className="mt-4 w-full bg-primary-900/20 text-text-200 border border-primary-950 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary-700"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter your message here"
            />
            <Button onClick={handleSubmit}>Start Chat</Button>
        </div>
    );
}
