import React from 'react';
import { Angle } from 'unitsnet-js';
import { UI_TEXT, UI_VALUES } from '../../constants';
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
        <span className="lp-label">{UI_VALUES.LEFT_PANEL.POS}</span>
        <span className="lp-value-box lp-value-box-wide">{latStr}</span>
        <span className="lp-badge lp-badge-green">{UI_TEXT.COMMON.GPS}</span>
      </div>
      <div className="lp-row">
        <span className="lp-label lp-label-spacer">{UI_VALUES.LEFT_PANEL.EMPTY_LABEL}</span>
        <span className="lp-value-box lp-value-box-wide">{lonStr}</span>
        <span className="lp-badge lp-badge-autonomous">{UI_TEXT.LEFT_PANEL.AUTONOMOUS}</span>
      </div>
    </div>
  );
};
