import React from 'react';
import { Message, ModelConnections } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Bell, CircleHelp, ExternalLink, Globe, MessageCircle, Network, Notebook, NotepadText, User } from 'lucide-react';
import { GhostIconButton, IconButton } from '../input/button';
import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { useDatabaseRecordSubscription } from '../../state/database-connection';

export function ChatMessageSection({ message }: { message: Message }) {
    // Format the timestamp to a human-readable string (e.g., "5 minutes ago")
    const formattedTime = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });

    // Get the model name
    const model = useDatabaseRecordSubscription('modelConnections', message.source, db =>
        db.table.modelConnections.findUnique(message.source)
    );

    // Determine if the message is from the user or a model
    const isUserMessage = message.role === 'USER';
    const isAiMessage = message.role === 'AI';
    const isInternalMessage = message.role === 'INTERNAL';

    const navigate = useNavigate();

    return (
        <div className="mb-10">
            <div className="flex items-center text-xs mb-1 gap-2">
                {isUserMessage && <User size={14} className="" />}
                {isAiMessage && <MessageCircle size={14} className="" />}
                {isInternalMessage && <Bell size={14} className="" />}
                {isUserMessage && <span className="font-medium text-text-dark mr-2">You</span>}
                {isAiMessage && (
                    <span
                        className="font-medium text-text-dark mr-2 cursor-pointer hover:underline"
                        onClick={() => navigate(`/database/id/modelConnections/record/${message.source}`)}
                    >
                        {model.data?.name}
                    </span>
                )}
                <span className="text-text-dark opacity-70">{formattedTime}</span>
            </div>
            <div className="py-3 rounded text-text-light text-xs font-mono markdown">
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            <div className="flex items-center justify-end text-xs my-1 gap-2">
                {message.apiCallId && (
                    <GhostIconButton icon={Globe} onClick={() => navigate(`/database/id/apiCall/record/${message.apiCallId}`)} />
                )}
                {message.renderedId && (
                    <GhostIconButton
                        icon={NotepadText}
                        onClick={() => navigate(`/database/id/renderedConversationThread/record/${message.renderedId}`)}
                    />
                )}
            </div>
        </div>
    );
}
