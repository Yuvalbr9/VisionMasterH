import React from 'react';

interface LabeledRowProps {
    label: string;
    children: React.ReactNode;
    className?: string;
    labelClassName?: string;
}

export const LabeledRow: React.FC<LabeledRowProps> = ({ label, children, className = '', labelClassName = 'lp-label' }) => {
    return (
        <div className={`lp-row ${className}`.trim()}>
            <span className={labelClassName}>{label}</span>
            {children}
        </div>
    );
};
