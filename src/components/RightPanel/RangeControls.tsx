import React from 'react';
import { Length } from 'unitsnet-js';
import { LENGTH_UNITS } from '../../constants';
import { ArrowButton } from '../Buttons';

export const RangeControls: React.FC = () => {
  const range = Length.FromNauticalMiles(2);
  
  return (
    <div className="range-controls">
      <ArrowButton direction="left" />
      <div className="range-display">
        <span className="range-label">12 RM</span>
        <span className="range-value">Range {range.NauticalMiles.toFixed(1)} {LENGTH_UNITS.NAUTICAL_MILES}</span>
      </div>
      <ArrowButton direction="right" />
    </div>
  );
};
