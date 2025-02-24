import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageCrumbed } from '../../library/layout/page-crumbed';
import { IconSection } from '../../library/layout/icon-section';
import { Box, Globe, Settings, Trash2 } from 'lucide-react';
import { Button, DestructiveButton } from '../../library/input/button';
import { Database } from '../../main';
import { useDatabaseTableSubscription } from '../../state/database-connection';
import { LabelValue } from '../../library/layout/label-value';
import { useChatWithModel } from '../../state/hooks/useChat';

export function ChatViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const chat = useChatWithModel(id || '');

    if (chat.loading || !chat.chat) {
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
            123
        </PageCrumbed>
    );
}
