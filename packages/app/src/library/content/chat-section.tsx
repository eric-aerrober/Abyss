import React from 'react';
import { Message } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, User } from 'lucide-react';

export function ChatMessageSection({ message }: { message: Message }) {
    // Format the timestamp to a human-readable string (e.g., "5 minutes ago")
    const formattedTime = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });

    // Determine if the message is from the user or a model
    const isUserMessage = message.role === 'USER';

    return (
        <div className="message-section mb-4">
            <div className="message-header flex items-center text-xs mb-1 px-1">
                {isUserMessage ? <User size={14} className="" /> : <MessageCircle size={14} className="" />}
                <span className="font-medium text-text-dark mr-2">{isUserMessage ? 'You' : message.source}</span>
                <span className="text-text-dark opacity-70">{formattedTime}</span>
            </div>

            <div className="message-content p-3 rounded border bg-background-dark border-background-light text-text-light">
                {message.content}
            </div>
        </div>
    );
}
