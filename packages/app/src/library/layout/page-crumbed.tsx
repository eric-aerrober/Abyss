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
}

export const PageCrumbed = ({ children, title, breadcrumbs }: PageCrumbedProps) => {
    return (
        <div className="flex flex-row items-center text-primary-200">
            <Sidebar />
            <div className="max-w-4xl px-5 ml-[150px] mt-[20px] mb-[60px]">
                <h1 className="text-2xl font-bold mb-2">{title}</h1>
                <div className="flex items-center gap-2 text-sm text-primary-200 mb-8">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.url}>
                            {index > 0 && <span>/</span>}
                            <Link
                                to={crumb.url}
                                className={`hover:text-primary-400 hover:underline ${
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
