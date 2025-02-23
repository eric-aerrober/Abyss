import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, type LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    title: string;
    icon: LucideIcon;
    url: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, icon: Icon, url }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(url);

    return (
        <Link
            to={url}
            className={`flex items-center gap-3 px-2 py-1 rounded-sm transition-colors text-xs translate-x-[1px] ${
                isActive
                    ? 'bg-primary-900/20 text-primary-300 border-r-2 border-primary-300'
                    : 'text-text-400 hover:bg-primary-950 hover:text-text-300'
            }`}
        >
            <Icon size={16} />
            <span>{title}</span>
        </Link>
    );
};

export function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="fixed left-0 top-0 w-[150px] h-screen bg-primary-950 border-r border-primary-900 flex flex-col bg-opacity-20 pt-10">
            <SidebarItem title="Models" icon={Box} url="/model-connection" />
            <div
                className="flex flex-row gap-4 items-center justify-center bg-primary-950 rounded-sm p-2 bg-opacity-20 cursor-pointer border-t border-primary-900 fixed bottom-0 w-[150px]"
                onClick={() => navigate('/')}
            >
                <img src="/logo.png" alt="Logo" className="w-8 h-8 cursor-pointer" onClick={() => navigate('/')} />
            </div>
        </div>
    );
}
