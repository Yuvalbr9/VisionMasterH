import React from 'react';

export interface GenericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const GenericInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ className, ...props }, ref) => {
    const mergedClassName = className ? `vm-generic-input ${className}` : 'vm-generic-input';

    return <input ref={ref} className={mergedClassName} {...props} />;
  }
);

GenericInput.displayName = 'GenericInput';
