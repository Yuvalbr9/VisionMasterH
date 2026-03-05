import React from 'react';
import { Speed, Length } from 'unitsnet-js';

interface SOGDisplayProps {
  value: Speed;          // CCRP F/A speed
  onChange: (value: Speed) => void;
}

export const SOGDisplay: React.FC<SOGDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section lp-sog-section">
      <div className="lp-sog-header">SOG</div>

      {/* Bow P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">Bow P/S</span>
        <span className="lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-left">0.0</span>
        <span className="lp-sog-source">Source</span>
      </div>

      {/* CCRP P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">CCRP P/S</span>
        <span className="lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-left">0.0</span>
        <span className="lp-badge lp-badge-green lp-badge-mr">GPS</span>
      </div>

      {/* CCRP F/A */}
      <div className="lp-sog-row" style={{ marginTop: '4px', marginBottom: '4px' }}>
        <span className="lp-sog-label">CCRP F/A</span>
        <span className="lp-value-box lp-value-box-med lp-has-triangle lp-triangle-down">{value.Knots.toFixed(1)} kn</span>
      </div>

      {/* Stern P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">Stern P/S</span>
        <span className="lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-left">0.0</span>
      </div>
    </div>
  );
};
