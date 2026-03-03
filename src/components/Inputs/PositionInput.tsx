import React, { useState } from 'react';
import { Angle } from 'unitsnet-js';
import { BaseInput } from './BaseInput';
import { parseLatitude, parseLongitude, getLatitudeDirection, getLongitudeDirection, formatLatitude, formatLongitude } from '../../types';
import { COLORS } from '../../constants';

export interface PositionInputProps {
  value: Angle;
  onChange: (value: Angle) => void;
  label?: string;
  type: 'latitude' | 'longitude';
  status?: string;
  statusColor?: string;
}

export const PositionInput: React.FC<PositionInputProps> = ({
  value,
  onChange,
  label,
  type: positionType,
  status,
  statusColor = COLORS.GREEN,
}) => {
  const [displayValue, setDisplayValue] = useState(
    positionType === 'latitude' ? formatLatitude(value) : formatLongitude(value)
  );

  const direction = positionType === 'latitude' ? getLatitudeDirection(value) : getLongitudeDirection(value);

  const handleChange = (val: string | number) => {
    const strVal = val.toString();
    setDisplayValue(strVal);

    try {
      const parsed = positionType === 'latitude' ? parseLatitude(strVal) : parseLongitude(strVal);
      if (parsed) {
        onChange(parsed);
      }
    } catch {
      // Keep local display value even if parsing fails
    }
  };

  return (
    <div className="position-input-wrapper">
      <BaseInput
        value={displayValue}
        onChange={handleChange}
        label={label}
        status={status}
        statusColor={statusColor}
        placeholder={positionType === 'latitude' ? '4027.269' : '10255.123'}
        className="data-display editable"
      />
      <span className="position-direction-label">
        {direction}
      </span>
    </div>
  );
};
