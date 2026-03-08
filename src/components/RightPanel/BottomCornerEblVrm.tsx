import React from 'react';
import { ANGLE_UNITS, LENGTH_UNITS, UI_TEXT, UI_VALUES } from '../../constants';
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
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.EBL1}</ControlButton>
          <div className="vm-ebl-value">{radarControls.ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS)}{ANGLE_UNITS.DEGREE}</div>
          <div className="vm-ebl-meta">{UI_TEXT.EBL_VRM.EBL1_META}</div>
          <ControlButton className="vm-ebl-flag">{UI_TEXT.EBL_VRM.TRUE_FLAG}</ControlButton>
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.VRM1}</ControlButton>
          <div className="vm-ebl-value">{radarControls.vrm1Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS)} {LENGTH_UNITS.NAUTICAL_MILES}</div>
          <div className="vm-ebl-meta" />
          <div className="vm-ebl-flag-empty" />
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.EBL2}</ControlButton>
          <div className="vm-ebl-value">{radarControls.ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS)}{ANGLE_UNITS.DEGREE}</div>
          <div className="vm-ebl-meta">{UI_TEXT.EBL_VRM.EBL2_META}</div>
          <ControlButton className="vm-ebl-flag">{UI_TEXT.EBL_VRM.TRUE_FLAG}</ControlButton>
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.VRM2}</ControlButton>
          <div className="vm-ebl-value">{radarControls.vrm2Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS)} {LENGTH_UNITS.NAUTICAL_MILES}</div>
          <div className="vm-ebl-meta" />
          <div className="vm-ebl-flag-empty" />
        </div>
      </div>
    </div>
  );
};
