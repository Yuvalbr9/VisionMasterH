import React from 'react';

export const RadarBottomControls: React.FC = () => {
  return (
    <div className="radar-bottom-controls">
      <div className="radar-console-main radar-console-block">
        <button className="radar-console-btn radar-console-btn-wide">Enhance Off</button>

        <div className="radar-console-rows">
          <div className="radar-console-row">
            <span className="radar-console-label">Gain</span>
            <div className="radar-console-value-box">
              <div className="radar-console-fill" />
            </div>
          </div>

          <div className="radar-console-row">
            <span className="radar-console-label">Rain</span>
            <div className="radar-console-value-box" />
          </div>

          <div className="radar-console-row">
            <span className="radar-console-label">Sea</span>
            <div className="radar-console-value-box" />
          </div>

          <div className="radar-console-row">
            <span className="radar-console-label">Tune</span>
            <div className="radar-console-value-box" />
          </div>
        </div>

        <button className="radar-console-btn radar-console-btn-wide">TxRx A Master</button>

        <div className="radar-console-bottom-row">
          <button className="radar-console-btn radar-console-btn-grow">Transmit</button>
          <button className="radar-console-btn radar-console-btn-small">MP</button>
        </div>
      </div>

      <div className="radar-console-side-buttons">
        <button className="radar-console-btn">Man</button>
        <button className="radar-console-btn">AFC</button>
      </div>
    </div>
  );
};
