import React from 'react';
import { ANGLE_UNITS, LENGTH_UNITS } from '../../constants';

export const BottomSection: React.FC = () => {
  return (
    <div className="bottom-section">
      <div className="bottom-controls">
        <div className="control-tabs">
          <button className="ctrl-tab">Grnd.</button>
          <button className="ctrl-tab">Own</button>
          <button className="ctrl-tab">Heads</button>
          <button className="ctrl-tab">Trail</button>
        </div>
        <div className="position-data">
          <div className="pos-line">
            <span className="pos-label">40{ANGLE_UNITS.DEGREE}24.176{ANGLE_UNITS.MINUTE}N</span>
          </div>
          <div className="pos-line">
            <span className="pos-label">073{ANGLE_UNITS.DEGREE}48.444{ANGLE_UNITS.MINUTE}W</span>
            <span className="pos-extra">Rumb$</span>
          </div>
          <div className="pos-line">
            <span className="pos-label">2.77 {LENGTH_UNITS.NAUTICAL_MILES}</span>
          </div>
          <div className="pos-line">
            <span className="pos-label">229.9{ANGLE_UNITS.DEGREE}</span>
            <span className="pos-extra">R (071.3)</span>
          </div>
          <div className="pos-line">
            <span className="pos-label green">TTC 00:15:32 AIS SS</span>
          </div>
        </div>
        <button className="menu-btn">Show Menu</button>
      </div>
    </div>
  );
};
