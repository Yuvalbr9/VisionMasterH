import React from 'react';
import { Speed, Length } from 'unitsnet-js';
import { SPEED_UNITS, UI_TEXT, UI_VALUES } from '../../constants';

interface SOGDisplayProps {
  value: Speed;          // CCRP F/A speed
  onChange: (value: Speed) => void;
}

export const SOGDisplay: React.FC<SOGDisplayProps> = ({ value }) => {
  return (
    <div className="lp-section lp-sog-section">
      <div className="lp-sog-header">{UI_TEXT.LEFT_PANEL.SOG}</div>

      {/* Bow P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.BOW_PS}</span>
        <span className="lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-left">{UI_VALUES.SOG.ZERO_TEXT}</span>
        <span className="lp-sog-source">{UI_TEXT.LEFT_PANEL.SOURCE}</span>
      </div>

      {/* CCRP P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.CCRP_PS}</span>
        <span className="lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-left">{UI_VALUES.SOG.ZERO_TEXT}</span>
        <span className="lp-badge lp-badge-green lp-badge-mr">{UI_TEXT.COMMON.GPS}</span>
      </div>

      {/* CCRP F/A */}
      <div className="lp-sog-row" style={{ marginTop: `${UI_VALUES.SOG.ROW_MARGIN_PX}px`, marginBottom: `${UI_VALUES.SOG.ROW_MARGIN_PX}px` }}>
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.CCRP_FA}</span>
        <span className="lp-value-box lp-value-box-med lp-has-triangle lp-triangle-down">{value.Knots.toFixed(1)} {SPEED_UNITS.KNOTS}</span>
      </div>

      {/* Stern P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.STERN_PS}</span>
        <span className="lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-left">{UI_VALUES.SOG.ZERO_TEXT}</span>
      </div>
    </div>
  );
};
