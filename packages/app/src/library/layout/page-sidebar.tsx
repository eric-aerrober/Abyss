import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Sidebar } from './sidebar';

interface SidebarItemData {
    title: string;
    icon: LucideIcon;
    url: string;
}

interface SidebarSectionData {
    title: string;
    items: SidebarItemData[];
}

interface PageSidebarProps {
    items: SidebarItemData[];
    children: React.ReactNode;
    header?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemData> = ({ title, icon: Icon, url }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(url);

    return (
        <Link
            to={url}
            className={`flex items-center gap-3 px-2 py-1 rounded-sm transition-colors text-xs translate-x-[1px] ${
                isActive ? 'bg-primary-900/20 text-primary-300 bg-background-light' : 'opacity-50 hover:opacity-100 hover:text-text-base'
            }`}
        >
            <Icon size={16} />
            <span>{title}</span>
        </Link>
    );
};

export function PageSidebar({ items, children, header }: PageSidebarProps) {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="left-0 top-0 w-[250px] h-screen border-r border-background-light flex flex-col gap-1 bg-background-dark">
                {header}
                {items.map((item, index) => (
                    <SidebarItem key={index} {...item} />
                ))}
                {items.length === 0 && (
                    <div className="flex flex-col gap-1">
                        <div className="text-xs rounded-sm py-1 mt-5 mb-1 px-2 text-center">Nothing here yet</div>
                    </div>
                )}
            </div>
            <div className="w-full h-full mb-[60px]">{children}</div>
        </div>
    );
}
