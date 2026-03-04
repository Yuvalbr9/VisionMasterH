import React from 'react';
import { Angle } from 'unitsnet-js';
import { DegreeRuler } from './DegreeRuler';

interface CourseDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
}

export const CourseDisplay: React.FC<CourseDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section">
      <div className="lp-row">
        <span className="lp-label">COG</span>
        <span className="lp-value-box">{value.Degrees.toFixed(1)}°</span>
        <span className="lp-badge lp-badge-green">GPS</span>
      </div>
      <DegreeRuler value={value.Degrees} />
    </div>
  );
};
