import React from 'react';
import { NavigationData } from '../../types';
import { ANGLE_UNITS, SPEED_UNITS } from '../../constants';
import { ControlButton } from '../Buttons';

interface RadarTopInfoProps {
  navData: NavigationData;
}

export const RadarTopInfo: React.FC<RadarTopInfoProps> = ({ navData }) => {
  return (
    <div className="radar-top-info-form">
      <div className="radar-info-line">
        <span className="radar-label">HDG</span>
        <span className="radar-value-small">{navData.hdg.Degrees.toFixed(1)}{ANGLE_UNITS.DEGREE}</span>
        <ControlButton className="radar-btn-small">Gyro</ControlButton>
      </div>
      <div className="radar-info-line">
        <span className="radar-label">STW</span>
        <span className="radar-value-small">{navData.stw.Knots.toFixed(1)} {SPEED_UNITS.KNOTS}</span>
        <ControlButton className="radar-btn-small">Log</ControlButton>
      </div>
      <div className="radar-info-line">
        <span className="radar-label">SOG</span>
        <span className="radar-value-small">{navData.sog.Knots.toFixed(1)} {SPEED_UNITS.KNOTS}</span>
        <span className="radar-label-small">GPS</span>
      </div>
    </div>
  );
};
