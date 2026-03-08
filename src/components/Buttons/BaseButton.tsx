import React, { ReactNode, useState } from 'react';

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
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onBlur,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type={type}
      className={`${className} base-button${isPressed ? ' is-pressed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      onMouseDown={(event) => {
        if (!disabled) {
          setIsPressed(true);
        }
        onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        setIsPressed(false);
        onMouseUp?.(event);
      }}
      onMouseLeave={(event) => {
        setIsPressed(false);
        onMouseLeave?.(event);
      }}
      onBlur={(event) => {
        setIsPressed(false);
        onBlur?.(event);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
