import React from 'react';
import { Speed } from 'unitsnet-js';
import { SpeedInput } from '../Inputs';
import { DataButton } from '../Buttons';

interface SpeedDisplayProps {
  value: Speed;
  onChange: (value: Speed) => void;
}

export const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ value, onChange }) => {
  return (
    <div className="speed-display-wrapper">
      <SpeedInput value={value} onChange={onChange} label="STW" />
      <DataButton label="Log" />
    </div>
  );
};
