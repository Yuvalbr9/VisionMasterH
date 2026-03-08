import React from 'react';
import { Angle } from 'unitsnet-js';
import { DegreeRuler } from './DegreeRuler';
import { ANGLE_UNITS, UI_TEXT } from '../../constants';

interface HeadingDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
}

export const HeadingDisplay: React.FC<HeadingDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section">
      <div className="lp-row">
        <span className="lp-label">{UI_TEXT.LEFT_PANEL.HDG}</span>
        <span className="lp-value-box">{value.Degrees.toFixed(1)}{ANGLE_UNITS.DEGREE}</span>
        <span className="lp-badge lp-badge-green">{UI_TEXT.COMMON.GPS}</span>
      </div>
      <DegreeRuler value={value.Degrees} />
    </div>
  );
};
