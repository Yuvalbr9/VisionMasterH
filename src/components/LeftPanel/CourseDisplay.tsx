import React from 'react';
import { Angle } from 'unitsnet-js';
import { AngleInput } from '../Inputs';

interface CourseDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
}

export const CourseDisplay: React.FC<CourseDisplayProps> = ({ value, onChange }) => {
  return <AngleInput value={value} onChange={onChange} label="COG" status="GPS" />;
};
