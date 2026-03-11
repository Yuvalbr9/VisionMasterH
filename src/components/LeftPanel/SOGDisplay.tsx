import React from 'react';
import { Speed } from 'unitsnet-js';
import { SPEED_UNITS, UI_TEXT } from '../../constants';
import { decomposeSogByLeeway, formatSpeedMagnitudeKnots } from '../../util';

interface SOGDisplayProps {
  value: Speed;
  leewayDeg: number;
}

export const SOGDisplay: React.FC<SOGDisplayProps> = ({ value, leewayDeg }) => {
  const { lateralKn, foreAftKn } = decomposeSogByLeeway(value.Knots, leewayDeg);

  return (
    <div className="lp-section lp-sog-section">
      <div className="lp-sog-header">{UI_TEXT.LEFT_PANEL.SOG}</div>

      {/* Bow P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.BOW_PS}</span>
        <span className={`lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-right`}>{formatSpeedMagnitudeKnots(lateralKn)}</span>
        <span className="lp-sog-source">{UI_TEXT.LEFT_PANEL.SOURCE}</span>
      </div>

      {/* CCRP P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.CCRP_PS}</span>
        <span className={`lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-right`}>{formatSpeedMagnitudeKnots(lateralKn)}</span>
        <span className="lp-badge lp-badge-green lp-badge-mr">{UI_TEXT.COMMON.GPS}</span>
      </div>

      {/* CCRP F/A */}
      <div className="lp-sog-row lp-sog-row-center">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.CCRP_FA}</span>
        <span className={`lp-value-box lp-value-box-med lp-has-triangle lp-triangle-down`}>{formatSpeedMagnitudeKnots(foreAftKn)} {SPEED_UNITS.KNOTS}</span>
      </div>

      {/* Stern P/S */}
      <div className="lp-sog-row">
        <span className="lp-sog-label">{UI_TEXT.LEFT_PANEL.STERN_PS}</span>
        <span className={`lp-value-box lp-value-box-sm lp-has-triangle lp-triangle-right`}>{formatSpeedMagnitudeKnots(lateralKn)}</span>
      </div>
    </div>
  );
};
