import { Box, MessageSquare } from 'lucide-react';
import React from 'react';
import { PageSidebar } from '../../library/layout/page-sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

export function ChatMainPage() {
    const navigate = useNavigate();

    const createChatHeader = (
        <div className="flex flex-row items-center justify-between mt-5 border-b border-primary-900">
            <div className="text-text-300 text-sm rounded-sm py-1 mb-1 px-2">Chats</div>
            <button className="text-text-300 hover:text-primary-200 rounded-sm py-1 mb-1 px-2" onClick={() => navigate('/chats/create')}>
                <span className="text-xl">+</span>
            </button>
        </div>
    );

    return (
        <PageSidebar header={createChatHeader} sections={[]}>
            <Outlet />
        </PageSidebar>
    );
}

export default ChatMainPage;
