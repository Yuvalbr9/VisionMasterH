import React from 'react';

export const PositionInfo: React.FC = () => {
  return (
    <div className="position-info">
      <div className="info-section">
        <span className="section-label">Center</span>
        <div className="section-values">
          <span>Max</span>
          <span>Charts Off Gyro On</span>
        </div>
      </div>

      <div className="datetime-stamp">
        <span>22 Jul 2024 16:00:31 UTC</span>
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
