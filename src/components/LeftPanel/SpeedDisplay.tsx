import React from 'react';
import { Speed } from 'unitsnet-js';

interface SpeedDisplayProps {
  value: Speed;
  onChange: (value: Speed) => void;
}

export const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section">
      <div className="lp-row" style={{ marginTop: '6px' }}>
        <span className="lp-label">STW</span>
        <span className="lp-value-box lp-has-triangle lp-triangle-up">{value.Knots.toFixed(1)} kn</span>
      </div>
      <div className="lp-row lp-row-sub" style={{ marginTop: '2px' }}>
        <span className="lp-dashes-box lp-has-triangle lp-triangle-right">- - -</span>
        <span className="lp-badge lp-badge-green lp-badge-btn lp-log-btn" style={{ marginLeft: '12px' }}>Log</span>
      </div>
    </div>
  );
};
