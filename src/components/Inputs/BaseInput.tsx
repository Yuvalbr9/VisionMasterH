import React, { ReactNode } from 'react';

export interface BaseInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  status?: string;
  statusColor?: string;
  suffix?: ReactNode;
  placeholder?: string;
  type?: 'text' | 'number';
  step?: string;
  className?: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  value,
  onChange,
  label,
  status,
  statusColor,
  suffix,
  placeholder,
  type = 'text',
  step,
  className = 'data-display editable',
}) => {
  return (
    <div className={className}>
      {(label || status) && (
        <div className="data-header">
          {label && <span className="data-label">{label}</span>}
          {status && <span className="data-status" style={{ color: statusColor }}>{status}</span>}
        </div>
      )}
      <div className="data-value-container">
        <input
          type={type}
          className="data-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          step={step}
        />
        {suffix && <span className="data-unit">{suffix}</span>}
      </div>
    </div>
  );
};
