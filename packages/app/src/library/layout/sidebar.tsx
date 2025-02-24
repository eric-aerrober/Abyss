import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, ChevronLeft, ChevronRight, DatabaseIcon, MessageSquare, Settings, type LucideIcon } from 'lucide-react';
import { useDatabaseQuery, useDatabaseRecordSubscription, useDatabaseTableSubscription } from '../../state/database-connection';
import { Database } from '../../main';

interface SidebarItemProps {
    title: string;
    icon: LucideIcon;
    url: string;
    open: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, icon: Icon, url, open }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(url);

    return (
        <Link
            to={url}
            className={`flex items-center gap-3 px-2 py-1 rounded-sm transition-colors text-xs translate-x-[1px] mb-1 ${
                isActive
                    ? 'bg-primary-900/50 text-primary-300 border-r-2 border-primary-300'
                    : 'text-text-300 hover:bg-primary-950 hover:text-text-200'
            }`}
        >
            <Icon size={open ? 16 : 18} />
            {open && <span>{title}</span>}
        </Link>
    );
};
interface SidebarSectionProps {
    title: string;
    open: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, open }) => {
    return (
        <div className={`flex flex-col gap-1 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-text-500 text-xs rounded-sm py-1 mt-5 mb-1 px-2 ">{title}</div>
        </div>
    );
};

export function Sidebar() {
    const userSettings = useDatabaseTableSubscription('UserSettings', async database => database.table.userSettings.get());

    const toggleSidebar = () => {
        if (!userSettings.data) return;
        userSettings.data.sidebarOpen = !userSettings.data.sidebarOpen;
        Database.table.userSettings.update(userSettings.data);
    };

    const isSidebarOpen = userSettings.data?.sidebarOpen || false;

    return (
        <div
            className={`relative left-0 top-0 h-screen bg-primary-900/20  border-r border-primary-900 flex flex-col pt-10 ${
                isSidebarOpen ? 'min-w-[150px]' : 'w-[35px]'
            }`}
        >
            <SidebarSection title="Activity" open={isSidebarOpen} />
            <SidebarItem title="Chats" icon={MessageSquare} url="/chats" open={isSidebarOpen} />

            <SidebarSection title="Configuration" open={isSidebarOpen} />
            <SidebarItem title="Models" icon={Box} url="/model-connection" open={isSidebarOpen} />
            <SidebarItem title="Storage" icon={DatabaseIcon} url="/database" open={isSidebarOpen} />
            <SidebarItem title="Settings" icon={Settings} url="/settings" open={isSidebarOpen} />

            <div
                className={`absolute bottom-0 h-[35px] flex flex-row gap-4 items-center justify-center bg-primary-950 rounded-sm p-2 bg-opacity-20 cursor-pointer border-t border-primary-900 w-full
                }`}
                onClick={e => {
                    e.stopPropagation();
                    toggleSidebar();
                }}
            >
                <ChevronLeft size={isSidebarOpen ? 16 : 18} className={`left-0 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
            </div>
        </div>
    );
}
