import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

export interface ArrowButtonProps extends Omit<BaseButtonProps, 'children' | 'className'> {
  direction: 'left' | 'right';
  size?: 'small' | 'medium';
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  size = 'medium',
  variant = 'default',
  className,
  ...props
}) => {
  const arrow = direction === 'left' ? '◄' : '►';
  const sizeClass = size === 'small' ? 'arrow-btn-small' : '';
  const variantClass = variant === 'compact' ? 'arrow-btn-compact' : variant === 'minimal' ? 'arrow-btn-minimal' : '';
  const finalClassName = className || `arrow-btn ${sizeClass} ${variantClass}`.trim();
  
  return (
    <BaseButton {...props} className={finalClassName}>
      {arrow}
    </BaseButton>
  );
};

export interface ControlButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  const sizeClass = `btn-${size}`;
  const variantClass = `btn-${variant}`;
  const finalClassName = className || `control-btn ${sizeClass} ${variantClass}`;
  
  return (
    <BaseButton {...props} className={finalClassName}>
      {children}
    </BaseButton>
  );
};

export interface DataButtonProps extends BaseButtonProps {
  label?: string;
}

export const DataButton: React.FC<DataButtonProps> = ({
  label,
  children = label,
  className = 'data-button',
  ...props
}) => {
  return (
    <BaseButton {...props} className={className}>
      {children}
    </BaseButton>
  );
};

export interface TabButtonProps extends BaseButtonProps {
  active?: boolean;
  label: string;
}

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  active = false,
  className,
  ...props
}) => {
  const finalClassName = active ? 'tab active' : (className || 'tab');
  return (
    <BaseButton {...props} className={finalClassName}>
      {label}
    </BaseButton>
  );
};
