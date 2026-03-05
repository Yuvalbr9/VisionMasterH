import React from 'react';
import { Angle } from 'unitsnet-js';
import { formatLatitude, formatLongitude, getLatitudeDirection, getLongitudeDirection } from '../../types';

interface PositionDisplayProps {
  lat: Angle;
  lon: Angle;
  onLatChange: (value: Angle) => void;
  onLonChange: (value: Angle) => void;
}

export const PositionDisplay: React.FC<PositionDisplayProps> = ({ lat, lon }) => {
  const latStr = formatLatitude(lat) + getLatitudeDirection(lat);
  const lonStr = formatLongitude(lon) + getLongitudeDirection(lon);

  return (
    <div className="lp-section">
      <div className="lp-row">
        <span className="lp-label">POS</span>
        <span className="lp-value-box lp-value-box-wide">{latStr}</span>
        <span className="lp-badge lp-badge-green">GPS</span>
      </div>
      <div className="lp-row">
        <span className="lp-label lp-label-spacer"></span>
        <span className="lp-value-box lp-value-box-wide">{lonStr}</span>
        <span className="lp-badge lp-badge-autonomous">Autonomous</span>
      </div>
    </div>
  );
};
