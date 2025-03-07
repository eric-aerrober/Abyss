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
        <div className="flex flex-col hover:bg-background-slightlyDark rounded-md p-4 -translate-x-4">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                    <Icon className="w-4 h-4 text-primary-base font-bold" />
                    <h2 className="text-sm font-bold text-text-300">{title}</h2>
                </div>
                {action}
            </div>
            {subtitle && <div className="text-sm opacity-50 py-1">{subtitle}</div>}
            <div className="mt-4">{children}</div>
        </div>
    );
};
