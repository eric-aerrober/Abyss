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
        <div className="flex flex-row  text-primary-200">
            {!hideSidebar && <Sidebar />}
            <div className={`w-full px-5 mt-[20px] mb-[60px] mx-auto h-full ${!fullWidth && 'max-w-4xl'}`}>
                <h1 className="text-xl font-bold mb-2">{title}</h1>
                <div className="flex items-center gap-2 text-xs text-primary-200 mb-8">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.url}>
                            {index > 0 && <span>/</span>}
                            <Link
                                to={crumb.url}
                                className={`hover:text-primary-400 hover:underline capitalize ${
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
