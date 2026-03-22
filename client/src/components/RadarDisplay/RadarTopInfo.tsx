import React from 'react';
import { NavigationData, RadarControlState } from '../../types';
import { ANGLE_UNITS, SPEED_UNITS, UI_TEXT } from '../../constants';

interface RadarTopInfoProps {
  navData: NavigationData;
  controls: RadarControlState;
}

export const RadarTopInfo: React.FC<RadarTopInfoProps> = ({ navData, controls }) => {
  const modeLabel = controls.northUp ? UI_TEXT.RADAR_TOP_INFO.MODE_NORTH_UP : UI_TEXT.RADAR_TOP_INFO.MODE_HEAD_UP;

  return (
    <div className="radar-top-info-form" title={`Orientation: ${modeLabel}`}>
      <div className="radar-top-info-row radar-top-info-row-dark">
        <span className="radar-col radar-col-name">{UI_TEXT.RADAR_TOP_INFO.HDG}</span>
        <span className="radar-col radar-col-value radar-col-value-top">{navData.hdg.Degrees.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{ANGLE_UNITS.DEGREE}</span>
        <span className="radar-col radar-col-meta">{UI_TEXT.RADAR_TOP_INFO.GYRO}</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-dark">
        <span className="radar-col radar-col-name">{UI_TEXT.RADAR_TOP_INFO.STW}</span>
        <span className="radar-col radar-col-value radar-col-value-top">{navData.stw.Knots.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{SPEED_UNITS.KNOTS}</span>
        <span className="radar-col radar-col-meta">{UI_TEXT.RADAR_TOP_INFO.LOG}</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-light radar-top-info-row-separator">
        <span className="radar-col radar-col-name">{UI_TEXT.RADAR_TOP_INFO.COG}</span>
        <span className="radar-col radar-col-value radar-col-value-bottom">{navData.cog.Degrees.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{ANGLE_UNITS.DEGREE}</span>
        <span className="radar-col radar-col-meta">{UI_TEXT.COMMON.GPS}</span>
      </div>

      <div className="radar-top-info-row radar-top-info-row-light">
        <span className="radar-col radar-col-name">{UI_TEXT.RADAR_TOP_INFO.SOG}</span>
        <span className="radar-col radar-col-value radar-col-value-bottom">{navData.sog.Knots.toFixed(1)}</span>
        <span className="radar-col radar-col-unit">{SPEED_UNITS.KNOTS}</span>
        <span className="radar-col radar-col-meta">{UI_TEXT.COMMON.GPS}</span>
      </div>
    </div>
  );
};
