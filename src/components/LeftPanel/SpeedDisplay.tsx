import React from 'react';
import { Speed } from 'unitsnet-js';
import { SPEED_UNITS, UI_TEXT, UI_VALUES } from '../../constants';

interface SpeedDisplayProps {
  value: Speed;
  onChange: (value: Speed) => void;
}

export const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section">
      <div className="lp-row" style={{ marginTop: UI_VALUES.SPEED_DISPLAY.TOP_MARGIN }}>
        <span className="lp-label">{UI_TEXT.RADAR_TOP_INFO.STW}</span>
        <span className="lp-value-box lp-has-triangle lp-triangle-up">{value.Knots.toFixed(1)} {SPEED_UNITS.KNOTS}</span>
      </div>
      <div className="lp-row lp-row-sub" style={{ marginTop: UI_VALUES.SPEED_DISPLAY.SUB_ROW_MARGIN_TOP }}>
        <span className="lp-dashes-box lp-has-triangle lp-triangle-right">{UI_VALUES.SPEED_DISPLAY.DASHES}</span>
        <span className="lp-badge lp-badge-green lp-badge-btn lp-log-btn" style={{ marginLeft: UI_VALUES.SPEED_DISPLAY.LOG_MARGIN_LEFT }}>{UI_TEXT.RADAR_TOP_INFO.LOG}</span>
      </div>
    </div>
  );
};
