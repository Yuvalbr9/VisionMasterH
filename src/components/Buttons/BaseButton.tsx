import React, { ReactNode } from 'react';

export interface BaseButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = 'control-btn',
  title,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};
