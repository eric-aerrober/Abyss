import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './sidebar';

interface Breadcrumb {
    name: string;
    url: string;
}

interface PageCrumbedProps {
    children: React.ReactNode;
    title: string;
    breadcrumbs: Breadcrumb[];
    fullWidth?: boolean;
    hideSidebar?: boolean;
}

export const PageCrumbed = ({ children, title, breadcrumbs, fullWidth, hideSidebar }: PageCrumbedProps) => {
    return (
        <div className="flex flex-row text-text-base">
            {!hideSidebar && <Sidebar />}
            <div className={`w-full px-5 pt-[20px] pb-[60px] mx-auto max-h-[100vh] overflow-y-auto ${!fullWidth && 'max-w-4xl'}`}>
                <h1 className="text-xl font-bold mb-2">{title}</h1>
                <div className="flex items-center gap-2 text-xs mb-8">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.url}>
                            {index > 0 && <span>/</span>}
                            <Link
                                to={crumb.url}
                                className={`hover:underline capitalize ${
                                    index === breadcrumbs.length - 1 ? 'opacity-50 pointer-events-none' : ''
                                }`}
                            >
                                {crumb.name}
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
                {children}
            </div>
        </div>
    );
};
