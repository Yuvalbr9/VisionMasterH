import React from 'react';
import { Angle } from 'unitsnet-js';
import { AngleInput } from '../Inputs';

interface HeadingDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
}

export const HeadingDisplay: React.FC<HeadingDisplayProps> = ({ value, onChange }) => {
  return (
    <>
      <AngleInput value={value} onChange={onChange} label="HDG" status="GPS" />
      <div className="data-graph"></div>
    </>
  );
};
