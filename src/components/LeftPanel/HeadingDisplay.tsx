import React from 'react';
import { Angle } from 'unitsnet-js';
import { DegreeRuler } from './DegreeRuler';

interface HeadingDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
}

export const HeadingDisplay: React.FC<HeadingDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section">
      <div className="lp-row">
        <span className="lp-label">HDG</span>
        <span className="lp-value-box">{value.Degrees.toFixed(1)}°</span>
        <span className="lp-badge lp-badge-green">GPS</span>
      </div>
      <DegreeRuler value={value.Degrees} />
    </div>
  );
};
