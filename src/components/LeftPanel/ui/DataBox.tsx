import React from 'react';
import './left-panel-triangles.css';

type TriangleDirection = 'up' | 'down' | 'left' | 'right';

interface DataBoxProps {
    value: string;
    triangleDirection?: TriangleDirection;
    size?: 'sm' | 'med' | 'wide';
    isEditable?: boolean;
    isEditing?: boolean;
    className?: string; // Appends custom CSS classes to the main box
    badgeText?: string;
    badgeType?: 'green' | 'autonomous' | 'manual' | 'neutral';
    badgeClassName?: string;
    tabIndex?: number;
    role?: string;
    ariaLabel?: string;
    ariaValueNow?: number;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    onWheel?: (e: React.WheelEvent<HTMLElement>) => void;
}

export const DataBox: React.FC<DataBoxProps> = ({
    value,
    triangleDirection,
    size,
    isEditable,
    isEditing,
    className = '',
    badgeText,
    badgeType,
    badgeClassName = '',
    tabIndex,
    role,
    ariaLabel,
    ariaValueNow,
    onClick,
    onKeyDown,
    onBlur,
    onWheel,
}) => {
    const sizeClass = size ? `lp-value-box-${size}` : '';
    const editableClass = isEditable ? 'lp-value-box-editable' : '';
    const editingClass = isEditing ? 'lp-value-box-editing' : '';
    const triangleClass = triangleDirection ? `lp-has-triangle lp-triangle-${triangleDirection}` : '';

    const combinedClassName = `lp-value-box ${sizeClass} ${editableClass} ${editingClass} ${triangleClass} ${className}`.trim();

    const getBadgeClass = (type?: string) => {
        switch (type) {
            case 'green': return 'lp-badge-green';
            case 'autonomous': return 'lp-badge-autonomous';
            case 'manual': return 'lp-badge-manual';
            default: return '';
        }
    };

    const combinedBadgeClass = `lp-badge ${getBadgeClass(badgeType)} ${badgeClassName}`.trim();

    return (
        <>
            <span
                className={combinedClassName}
                tabIndex={tabIndex}
                role={role}
                aria-label={ariaLabel}
                aria-valuenow={ariaValueNow}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onWheel={onWheel}
            >
                {value}
            </span>
            {badgeText && (
                <span className={combinedBadgeClass}>
                    {badgeText}
                </span>
            )}
        </>
    );
};
