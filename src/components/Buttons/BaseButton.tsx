import React, { ReactNode } from 'react';
import './buttons.css';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = 'control-btn',
  title,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${className} base-button`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...rest}
    >
      {children}
    </button>
  );
};
