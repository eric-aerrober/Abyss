import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconSectionProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    action?: React.ReactNode;
}

export const IconSection = ({ children, title, subtitle, icon: Icon, action }: IconSectionProps) => {
    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                    <Icon className="w-5 h-5 text-primary-400" />
                    <h2 className="text-lg font-medium text-text-300">{title}</h2>
                </div>
                {action}
            </div>
            {subtitle && <div className="text-sm text-text-500">{subtitle}</div>}
            {children}
        </div>
    );
};
