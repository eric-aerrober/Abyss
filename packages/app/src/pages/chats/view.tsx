import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PageCrumbed } from '../../library/layout/page-crumbed';
import { useChatWithModel } from '../../state/hooks/useChat';
import { ChatMessageSection } from '../../library/content/chat-section';
import { Button } from '../../library/input/button';
import { Database } from '../../main';

export function ChatViewPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const chat = useChatWithModel(id || '');

    if (chat.loading || !chat.chat || !chat.messages || !chat.thread) {
        return <div>Loading...</div>;
    }

    const onAskAiToRespond = async () => {
        try {
            if (chat.chat && chat.chat.id) {
                Database.workflows.respondToChat(chat.chat.id);
            }
        } catch (error) {}
    };

    return (
        <PageCrumbed
            title={`Chat with ${chat.chat.assistantId}`}
            breadcrumbs={[
                { name: 'Home', url: '/' },
                { name: 'Chats', url: '/chats' },
                { name: chat.chat.name, url: `/chats/id/${id}` },
            ]}
            hideSidebar
        >
            {chat.messages.map(m => (
                <ChatMessageSection message={m} key={m.id} />
            ))}
            <Button onClick={onAskAiToRespond}>Ask AI to respond</Button>
        </PageCrumbed>
    );
}
