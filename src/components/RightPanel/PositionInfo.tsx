import React from 'react';
import { ARPATarget } from '../../types';

interface PositionInfoProps {
  leewayDeg: number;
  primaryTarget?: ARPATarget;
}

export const PositionInfo: React.FC<PositionInfoProps> = ({ leewayDeg, primaryTarget }) => {
  return (
    <div className="position-info">
      <div className="info-section">
        <span className="section-label">Center</span>
        <div className="section-values">
          <span>Max</span>
          <span>Charts Off Gyro On β {leewayDeg.toFixed(1)}°</span>
        </div>
      </div>

      <div className="info-section">
        <span className="section-label">CPA / TCPA</span>
        <div className="section-values">
          <span>CPA {primaryTarget?.cpaNm.toFixed(2) ?? '--'} NM</span>
          <span>TCPA {primaryTarget?.tcpaMin.toFixed(0) ?? '--'} min</span>
        </div>
      </div>

      <div className="datetime-stamp">
        <span>22 Jul 2014 16:00:31 UTC</span>
      </div>
      
      <div className="man-overboard-section">
        <button className="overboard-btn-left">
          <span className="arrow">◄</span>
          <span>Man Overboard</span>
          <span className="arrow">►</span>
        </button>
      </div>
    </div>
  );
};
