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
            if (allModels.data.length) {
                setSelectedModel(allModels.data[0].id);
            }
        }
    }, [allModels.data]);

    const handleSubmit = async () => {
        if (selectedModel && message) {
            const chatRecord = await Database.table.chat.createWithThread({
                name: 'New Chat',
                partyA: selectedModel,
                partyB: 'USER',
            });
            const messageRecord = await Database.table.messageThread.addMessage(chatRecord.threadId, {
                role: 'USER',
                source: 'USER',
                content: message,
            });
            navigate(`/chats/id/${chatRecord.id}`);
        }
    };

    return (
        <div className="flex flex-col gap-2 p-5">
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
                className="mt-4 w-full bg-background-dark border border-background-light rounded px-2 py-1 text-sm focus:outline-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter your message here"
            />
            <Button disabled={!selectedModel} onClick={handleSubmit}>
                Start Chat
            </Button>
        </div>
    );
}
