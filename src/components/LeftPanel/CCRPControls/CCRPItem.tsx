import React from 'react';
import { Length } from 'unitsnet-js';
import { LengthInput } from '../../Inputs';
import { ArrowButton } from '../../Buttons';

interface CCRPItemProps {
  label: string;
  value: Length;
  onChange: (value: Length) => void;
}

export const CCRPItem: React.FC<CCRPItemProps> = ({ label, value, onChange }) => {
  return (
    <div className="ccrp-item-compact">
      <span className="ccrp-label">{label}</span>
      <div className="ccrp-input-buttons">
        <ArrowButton direction="left" />
        <LengthInput value={value} onChange={onChange} />
        <ArrowButton direction="right" />
      </div>
    </div>
  );
};
