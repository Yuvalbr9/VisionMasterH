import React from 'react';
import { TIME_UNITS, COLORS } from '../../constants';
import { BaseInput } from './BaseInput';

export interface TimeInputProps {
  value: string; // Format: "HH:mm:ss"
  onChange: (value: string) => void;
  label?: string;
  status?: string;
  statusColor?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  label,
  status,
  statusColor = COLORS.GREEN,
}) => {
  const validateTimeFormat = (val: string): boolean => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeRegex.test(val) || val === '';
  };

  const handleChange = (val: string | number) => {
    const strVal = val.toString();
    if (validateTimeFormat(strVal)) {
      onChange(strVal);
    }
  };

  return (
    <BaseInput
      value={value}
      onChange={handleChange}
      label={label}
      status={status}
      statusColor={statusColor}
      placeholder="HH:mm:ss"
      className="data-display editable"
    />
  );
};

export interface DurationInputProps {
  value: number; // Duration in seconds
  onChange: (value: number) => void;
  label?: string;
  format?: 'seconds' | 'minutes' | 'hours';
}

export const DurationInput: React.FC<DurationInputProps> = ({
  value,
  onChange,
  label,
  format = 'seconds',
}) => {
  const getValue = () => {
    switch (format) {
      case 'minutes': return (value / 60).toFixed(1);
      case 'hours': return (value / 3600).toFixed(2);
      default: return value.toString();
    }
  };

  const getUnitText = () => {
    switch (format) {
      case 'minutes': return TIME_UNITS.MINUTES;
      case 'hours': return TIME_UNITS.HOURS;
      default: return TIME_UNITS.SECONDS;
    }
  };

  const parseValue = (val: string) => {
    const num = parseFloat(val) || 0;
    switch (format) {
      case 'minutes': return num * 60;
      case 'hours': return num * 3600;
      default: return num;
    }
  };

  return (
    <BaseInput
      value={getValue()}
      onChange={(val) => onChange(parseValue(val as string))}
      label={label}
      suffix={getUnitText()}
      type="number"
      step="0.1"
      className="data-display editable"
    />
  );
};
