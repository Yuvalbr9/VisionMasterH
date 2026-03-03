import React from 'react';
import { Speed } from 'unitsnet-js';
import { SpeedInput } from '../Inputs';
import { ArrowButton } from '../Buttons';

interface SOGDisplayProps {
  value: Speed;
  onChange: (value: Speed) => void;
}

export const SOGDisplay: React.FC<SOGDisplayProps> = ({ value, onChange }) => {
  return (
    <div className="data-display">
      <div className="data-header">
        <span className="data-label">SOG</span>
      </div>
      <div className="sog-selector-compact">
        <span className="sog-label">Bow P/S</span>
        <div className="sog-arrows">
          <ArrowButton direction="left" />
          <ArrowButton direction="right" />
        </div>
      </div>
      <div className="sog-input-row">
        <SpeedInput value={value} onChange={onChange} />
        <span className="sog-source">Source</span>
      </div>
    </div>
  );
};
