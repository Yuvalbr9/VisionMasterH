import React from 'react';
import { Speed } from 'unitsnet-js';
import { SPEED_UNITS, UI_TEXT, UI_VALUES } from '../../constants';

interface SpeedDisplayProps {
  value: Speed;
}

export const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section">
      <div className="lp-row lp-stw-row-main">
        <span className="lp-label">{UI_TEXT.RADAR_TOP_INFO.STW}</span>
        <span className="lp-value-box lp-has-triangle lp-triangle-up">{value.Knots.toFixed(1)} {SPEED_UNITS.KNOTS}</span>
      </div>
      <div className="lp-row lp-row-sub lp-stw-row-sub">
        <span className="lp-dashes-box lp-has-triangle lp-triangle-right">{UI_VALUES.SPEED_DISPLAY.DASHES}</span>
        <span className="lp-badge lp-badge-green lp-badge-btn lp-log-btn lp-log-btn-offset">{UI_TEXT.RADAR_TOP_INFO.LOG}</span>
      </div>
    </div>
  );
};
