import React from 'react';
import { LENGTH_UNITS } from '../../constants';
import { RadarControlState } from '../../types';

interface BearingControlsProps {
  controls: RadarControlState;
  onChange: (updates: Partial<RadarControlState>) => void;
}

export const BearingControls: React.FC<BearingControlsProps> = ({ controls, onChange }) => {
  return (
    <div className="bearing-controls">
      <div className="control-group">
        <label>EBL1 (°)</label>
        <input
          type="number"
          className="control-input"
          value={controls.ebl1Deg.toFixed(1)}
          onChange={(event) => onChange({ ebl1Deg: Number(event.target.value) || 0 })}
        />
      </div>
      <div className="control-group">
        <label>EBL2 (°)</label>
        <input
          type="number"
          className="control-input"
          value={controls.ebl2Deg.toFixed(1)}
          onChange={(event) => onChange({ ebl2Deg: Number(event.target.value) || 0 })}
        />
      </div>
      <div className="control-group">
        <label>VRM1 ({LENGTH_UNITS.NAUTICAL_MILES})</label>
        <input
          type="number"
          className="control-input"
          value={controls.vrm1Nm.toFixed(2)}
          onChange={(event) => onChange({ vrm1Nm: Number(event.target.value) || 0 })}
        />
      </div>
      <div className="control-group">
        <label>VRM2 ({LENGTH_UNITS.NAUTICAL_MILES})</label>
        <input
          type="number"
          className="control-input"
          value={controls.vrm2Nm.toFixed(2)}
          onChange={(event) => onChange({ vrm2Nm: Number(event.target.value) || 0 })}
        />
      </div>
      <div className="control-group">
        <label>Estimated Time</label>
        <input type="text" className="control-input" defaultValue="0:00:00" />
      </div>
    </div>
  );
};
