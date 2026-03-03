import React from 'react';
import { LENGTH_UNITS } from '../../constants';
import { ControlButton } from '../Buttons';

export const TopButtonSection: React.FC = () => {
  return (
    <div className="top-button-section">
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">N UP</ControlButton>
        <ControlButton className="control-btn top-line-btn">RM</ControlButton>
        <ControlButton className="control-btn top-line-btn">Trails Off</ControlButton>
      </div>
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">Own Ga</ControlButton>
        <ControlButton className="control-btn top-line-btn">Radar</ControlButton>
        <span className="info-text top-inline-info">Group: Stabilized</span>
      </div>
      <div className="btn-row">
        <span className="info-text top-inline-info">R Masters</span>
        <span className="info-text top-inline-info">6.0 mm</span>
        <ControlButton className="control-btn top-line-btn">12 RM</ControlButton>
        <ControlButton className="control-btn top-line-btn">Arc Priority</ControlButton>
        <ControlButton className="control-btn top-line-btn">AIS On</ControlButton>
      </div>
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">CDA</ControlButton>
        <span className="info-text top-inline-info">Range 2 {LENGTH_UNITS.NAUTICAL_MILES}</span>
        <ControlButton className="control-btn top-line-btn">Center</ControlButton>
        <ControlButton className="control-btn top-line-btn">Max</ControlButton>
        <ControlButton className="control-btn top-line-btn">Hdop</ControlButton>
      </div>
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">5 {LENGTH_UNITS.NAUTICAL_MILES}</ControlButton>
        <ControlButton className="control-btn top-line-btn">Charts Off</ControlButton>
        <ControlButton className="control-btn top-line-btn">Sym On</ControlButton>
      </div>
    </div>
  );
};
