import React from 'react';
import { Angle } from 'unitsnet-js';
import { PositionInput } from '../Inputs';
import { COLORS } from '../../constants';

interface PositionDisplayProps {
  lat: Angle;
  lon: Angle;
  onLatChange: (value: Angle) => void;
  onLonChange: (value: Angle) => void;
}

export const PositionDisplay: React.FC<PositionDisplayProps> = ({ 
  lat, 
  lon, 
  onLatChange, 
  onLonChange 
}) => {
  return (
    <div className="data-display position-display">
      <div className="data-header">
        <span className="data-label">POS</span>
        <span className="data-status" style={{ color: COLORS.GREEN }}>GPS</span>
      </div>
      <div className="position-inputs-row">
        <PositionInput value={lat} onChange={onLatChange} type="latitude" />
        <PositionInput value={lon} onChange={onLonChange} type="longitude" />
      </div>
    </div>
  );
};
