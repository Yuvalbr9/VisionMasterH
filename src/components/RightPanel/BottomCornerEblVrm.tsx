import React from 'react';
import { RadarControlState } from '../../types';
import { ControlButton } from '../Buttons';

interface BottomCornerEblVrmProps {
  radarControls: RadarControlState;
}

export const BottomCornerEblVrm: React.FC<BottomCornerEblVrmProps> = ({ radarControls }) => {
  return (
    <div className="vm-bottom-corner-floating">
      <div className="vm-ebl-vrm-table">
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">EBL1</ControlButton>
          <div className="vm-ebl-value">{radarControls.ebl1Deg.toFixed(1)}°</div>
          <div className="vm-ebl-meta">(123.4°)</div>
          <ControlButton className="vm-ebl-flag">T</ControlButton>
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">VRM1</ControlButton>
          <div className="vm-ebl-value">{radarControls.vrm1Nm.toFixed(2)} NM</div>
          <div className="vm-ebl-meta" />
          <div className="vm-ebl-flag-empty" />
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">EBL2</ControlButton>
          <div className="vm-ebl-value">{radarControls.ebl2Deg.toFixed(1)}°</div>
          <div className="vm-ebl-meta">(201.7°)</div>
          <ControlButton className="vm-ebl-flag">T</ControlButton>
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">VRM2</ControlButton>
          <div className="vm-ebl-value">{radarControls.vrm2Nm.toFixed(2)} NM</div>
          <div className="vm-ebl-meta" />
          <div className="vm-ebl-flag-empty" />
        </div>
      </div>
    </div>
  );
};
