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
    sections: SidebarSectionData[];
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
                isActive
                    ? 'bg-primary-900/20 text-primary-300 border-r-2 border-primary-300'
                    : 'text-text-300 hover:bg-primary-950 hover:text-text-200'
            }`}
        >
            <Icon size={16} />
            <span>{title}</span>
        </Link>
    );
};

const SidebarSection: React.FC<SidebarSectionData> = ({ title, items }) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="text-text-500 text-xs rounded-sm py-1 mt-5 mb-1 px-2">{title}</div>
            {items.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))}
        </div>
    );
};

export function PageSidebar({ sections, children, header }: PageSidebarProps) {
    return (
        <div className="flex flex-row text-primary-200">
            <Sidebar />
            <div className="left-0 top-0 w-[250px] h-screen border-r border-primary-900 flex flex-col bg-primary-900/10">
                {header}
                {sections.map((section, index) => (
                    <SidebarSection key={index} {...section} />
                ))}
                {sections.length === 0 && (
                    <div className="flex flex-col gap-1">
                        <div className="text-text-500 text-xs rounded-sm py-1 mt-5 mb-1 px-2 text-center">Nothing here yet</div>
                    </div>
                )}
            </div>
            <div className="w-full h-full px-5 mt-[20px] mb-[60px]">{children}</div>
        </div>
    );
}
