import React from 'react';
import { Length } from 'unitsnet-js';
import { LENGTH_UNITS } from '../../constants';
import { ArrowButton } from '../Buttons';

interface RangeControlsProps {
  selectedRangeNm: number;
  onRangeChange: (value: number) => void;
}

const RANGE_STEPS = [0.5, 1, 2, 3, 6, 12, 24, 48, 96];

export const RangeControls: React.FC<RangeControlsProps> = ({ selectedRangeNm, onRangeChange }) => {
  const currentIndex = RANGE_STEPS.findIndex((step) => step === selectedRangeNm);
  const range = Length.FromNauticalMiles(selectedRangeNm);

  const stepLeft = () => {
    if (currentIndex > 0) {
      onRangeChange(RANGE_STEPS[currentIndex - 1]);
    }
  };

  const stepRight = () => {
    if (currentIndex >= 0 && currentIndex < RANGE_STEPS.length - 1) {
      onRangeChange(RANGE_STEPS[currentIndex + 1]);
    }
  };
  
  return (
    <div className="range-controls">
      <ArrowButton direction="left" onClick={stepLeft} />
      <div className="range-display">
        <span className="range-label">{selectedRangeNm.toFixed(selectedRangeNm < 1 ? 1 : 0)} RM</span>
        <span className="range-value">Range {range.NauticalMiles.toFixed(1)} {LENGTH_UNITS.NAUTICAL_MILES}</span>
      </div>
      <ArrowButton direction="right" onClick={stepRight} />
    </div>
  );
};
