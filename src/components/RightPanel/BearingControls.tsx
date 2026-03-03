import React from 'react';
import { LENGTH_UNITS } from '../../constants';

export const BearingControls: React.FC = () => {
  return (
    <div className="bearing-controls">
      <div className="control-group">
        <label>Bearing (R)</label>
        <input type="text" className="control-input" placeholder="---" />
      </div>
      <div className="control-group">
        <label>Bearing (1)</label>
        <input type="text" className="control-input" placeholder="---" />
      </div>
      <div className="control-group">
        <label>Range ({LENGTH_UNITS.METERS})</label>
        <input type="text" className="control-input" placeholder="---" />
      </div>
      <div className="control-group">
        <label>Estimated Time</label>
        <input type="text" className="control-input" defaultValue="0:00:00" />
      </div>
    </div>
  );
};
