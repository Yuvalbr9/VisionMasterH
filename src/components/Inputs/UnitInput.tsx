import React from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { ANGLE_UNITS, SPEED_UNITS, LENGTH_UNITS } from '../../constants';
import { BaseInput } from './BaseInput';
import { COLORS } from '../../constants';

export interface AngleInputProps {
  value: Angle;
  onChange: (value: Angle) => void;
  label?: string;
  status?: string;
  statusColor?: string;
}

export const AngleInput: React.FC<AngleInputProps> = ({
  value,
  onChange,
  label,
  status,
  statusColor = COLORS.GREEN,
}) => {
  return (
    <BaseInput
      value={value.Degrees.toFixed(1)}
      onChange={(val) => onChange(Angle.FromDegrees(parseFloat(val as string) || 0))}
      label={label}
      status={status}
      statusColor={statusColor}
      suffix={ANGLE_UNITS.DEGREE}
      type="number"
      step="0.1"
      className="data-display editable"
    />
  );
};

export interface SpeedInputProps {
  value: Speed;
  onChange: (value: Speed) => void;
  label?: string;
  unit?: 'knots' | 'ms' | 'kmh';
}

export const SpeedInput: React.FC<SpeedInputProps> = ({
  value,
  onChange,
  label,
  unit = 'knots',
}) => {
  const getValue = () => {
    switch (unit) {
      case 'ms': return value.MetersPerSecond.toFixed(1);
      case 'kmh': return value.KilometersPerHour.toFixed(1);
      default: return value.Knots.toFixed(1);
    }
  };

  const getUnitText = () => {
    switch (unit) {
      case 'ms': return SPEED_UNITS.METERS_PER_SECOND;
      case 'kmh': return SPEED_UNITS.KILOMETERS_PER_HOUR;
      default: return SPEED_UNITS.KNOTS;
    }
  };

  const parseValue = (val: string) => {
    const num = parseFloat(val) || 0;
    switch (unit) {
      case 'ms': return Speed.FromMetersPerSecond(num);
      case 'kmh': return Speed.FromKilometersPerHour(num);
      default: return Speed.FromKnots(num);
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

export interface LengthInputProps {
  value: Length;
  onChange: (value: Length) => void;
  label?: string;
  unit?: 'meters' | 'feet' | 'nauticalMiles';
}

export const LengthInput: React.FC<LengthInputProps> = ({
  value,
  onChange,
  label,
  unit = 'meters',
}) => {
  const getValue = () => {
    switch (unit) {
      case 'feet': return value.Feet.toFixed(1);
      case 'nauticalMiles': return value.NauticalMiles.toFixed(3);
      default: return value.Meters.toFixed(1);
    }
  };

  const getUnitText = () => {
    switch (unit) {
      case 'feet': return LENGTH_UNITS.FEET;
      case 'nauticalMiles': return LENGTH_UNITS.NAUTICAL_MILES;
      default: return LENGTH_UNITS.METERS;
    }
  };

  const parseValue = (val: string) => {
    const num = parseFloat(val) || 0;
    switch (unit) {
      case 'feet': return Length.FromFeet(num);
      case 'nauticalMiles': return Length.FromNauticalMiles(num);
      default: return Length.FromMeters(num);
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
