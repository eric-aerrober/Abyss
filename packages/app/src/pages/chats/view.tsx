import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageCrumbed } from '../../library/layout/page-crumbed';
import { useChatWithModel } from '../../state/hooks/useChat';
import { ChatMessageSection } from '../../library/content/chat-section';

export function ChatViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const chat = useChatWithModel(id || '');

    if (chat.loading || !chat.chat || !chat.messages) {
        return <div>Loading...</div>;
    }

    return (
        <PageCrumbed
            title={`Chat with ${chat.chat.partyA}`}
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
        </PageCrumbed>
    );
}
