import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    onWheel?: (e: React.WheelEvent<HTMLElement>) => void;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', onWheel }) => {
    return (
        <div className={`lp-section ${className}`.trim()} onWheel={onWheel}>
            {children}
        </div>
    );
};
