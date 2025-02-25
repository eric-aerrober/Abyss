import React from 'react';
import { Message } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Bell, CircleHelp, ExternalLink, Globe, MessageCircle, Network, User } from 'lucide-react';
import { IconButton } from '../input/button';
import { useNavigate } from 'react-router';

export function ChatMessageSection({ message }: { message: Message }) {
    // Format the timestamp to a human-readable string (e.g., "5 minutes ago")
    const formattedTime = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });

    // Determine if the message is from the user or a model
    const isUserMessage = message.role === 'USER';
    const isAiMessage = message.role === 'AI';
    const isInternalMessage = message.role === 'INTERNAL';

    const navigate = useNavigate();

    return (
        <div className="mb-4">
            <div className="flex items-center text-xs mb-1 px-1 gap-2">
                {isUserMessage && <User size={14} className="" />}
                {isAiMessage && <MessageCircle size={14} className="" />}
                {isInternalMessage && <Bell size={14} className="" />}
                <span className="font-medium text-text-dark mr-2">{isUserMessage ? 'You' : message.source}</span>
                <span className="text-text-dark opacity-70">{formattedTime}</span>
            </div>
            <div className="p-3 rounded border bg-background-dark border-background-light text-text-light text-xs font-mono">
                <pre className="overflow-x-auto whitespace-pre-wrap">{message.content}</pre>
            </div>
            <div className="flex items-center justify-end text-xs my-1 gap-2">
                {message.apiCallId && (
                    <IconButton icon={Globe} onClick={() => navigate(`/database/id/apiCall/record/${message.apiCallId}`)} borderless />
                )}
            </div>
        </div>
    );
}
