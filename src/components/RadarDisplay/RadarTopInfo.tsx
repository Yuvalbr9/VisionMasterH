import React from 'react';
import { NavigationData, RadarControlState } from '../../types';
import { ANGLE_UNITS, SPEED_UNITS } from '../../constants';

interface RadarTopInfoProps {
  navData: NavigationData;
  controls: RadarControlState;
  velocity: { vn: number; ve: number };
  leewayDeg: number;
}

export const RadarTopInfo: React.FC<RadarTopInfoProps> = ({ navData, controls, velocity, leewayDeg }) => {
  const modeLabel = controls.northUp ? 'N UP' : 'H UP';

  return (
    <div className="radar-top-info-form">
      <div className="radar-top-info-row radar-top-info-row-dark">
        <span className="radar-col radar-col-name">HDG</span>
        <span className="radar-col radar-col-value radar-col-value-top">{navData.hdg.Degrees.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{ANGLE_UNITS.DEGREE}</span>
        <span className="radar-col radar-col-meta">Gyro</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-dark">
        <span className="radar-col radar-col-name">STW</span>
        <span className="radar-col radar-col-value radar-col-value-top">{navData.stw.Knots.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{SPEED_UNITS.KNOTS}</span>
        <span className="radar-col radar-col-meta">Log</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-light radar-top-info-row-separator">
        <span className="radar-col radar-col-name">COG</span>
        <span className="radar-col radar-col-value radar-col-value-bottom">{navData.cog.Degrees.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{ANGLE_UNITS.DEGREE}</span>
        <span className="radar-col radar-col-meta">GPS</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-light">
        <span className="radar-col radar-col-name">SOG</span>
        <span className="radar-col radar-col-value radar-col-value-bottom">{navData.sog.Knots.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{SPEED_UNITS.KNOTS}</span>
        <span className="radar-col radar-col-meta">GPS</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-dark radar-top-info-row-separator">
        <span className="radar-col radar-col-name">β</span>
        <span className="radar-col radar-col-value radar-col-value-top">{leewayDeg.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{ANGLE_UNITS.DEGREE}</span>
        <span className="radar-col radar-col-meta">Leeway</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-dark">
        <span className="radar-col radar-col-name">VN/VE</span>
        <span className="radar-col radar-col-value radar-col-value-top">{velocity.vn.toFixed(1)}/{velocity.ve.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">kn</span>
        <span className="radar-col radar-col-meta">Vector</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-light">
        <span className="radar-col radar-col-name">MODE</span>
        <span className="radar-col radar-col-value radar-col-value-bottom">{modeLabel}</span>
        <span className="radar-col radar-col-unit">{controls.selectedRangeNm.toFixed(1)} RM</span>
        <span className="radar-col radar-col-meta">{controls.vectorTimeMin} min</span>
      </div>
    </div>
  );
};
