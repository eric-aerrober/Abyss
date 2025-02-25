import React from 'react';

interface LabelValueProps {
    data: Record<string, any>;
    className?: string;
}

export const LabelValue: React.FC<LabelValueProps> = ({ data, className = '' }) => {
    return (
        <div
            className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs border border-background-light rounded items-center ${className}`}
        >
            {Object.entries(data).map(([key, value]) => (
                <React.Fragment key={key}>
                    <div className="font-sm text-text-400 min-w-[100px] bg-background-light h-full p-2 border-r border-background-light border-b text-center  ">
                        {key}
                    </div>
                    <div className="text-text-300">{value}</div>
                </React.Fragment>
            ))}
        </div>
    );
};
