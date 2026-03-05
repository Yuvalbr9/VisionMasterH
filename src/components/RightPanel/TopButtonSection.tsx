import React from 'react';
import { LENGTH_UNITS } from '../../constants';
import { ControlButton } from '../Buttons';
import { RadarControlState } from '../../types';

interface TopButtonSectionProps {
  controls: RadarControlState;
  onChange: (updates: Partial<RadarControlState>) => void;
}

export const TopButtonSection: React.FC<TopButtonSectionProps> = ({ controls, onChange }) => {
  return (
    <div className="top-button-section">
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn" onClick={() => onChange({ northUp: !controls.northUp })}>
          {controls.northUp ? 'N UP' : 'Head Up'}
        </ControlButton>
        <ControlButton className="control-btn top-line-btn">RM</ControlButton>
        <ControlButton className="control-btn top-line-btn" onClick={() => onChange({ trailsOn: !controls.trailsOn })}>
          Trails {controls.trailsOn ? 'On' : 'Off'}
        </ControlButton>
      </div>
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">Own Ga</ControlButton>
        <ControlButton className="control-btn top-line-btn">Radar</ControlButton>
        <span className="info-text top-inline-info">Group: Stabilized</span>
      </div>
      <div className="btn-row">
        <span className="info-text top-inline-info">R Masters</span>
        <span className="info-text top-inline-info">{controls.vectorTimeMin}.0 min</span>
        <ControlButton className="control-btn top-line-btn">12 RM</ControlButton>
        <ControlButton className="control-btn top-line-btn">Arc Priority</ControlButton>
        <ControlButton className="control-btn top-line-btn" onClick={() => onChange({ aisOn: !controls.aisOn })}>
          AIS {controls.aisOn ? 'On' : 'Off'}
        </ControlButton>
      </div>
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">CDA</ControlButton>
        <span className="info-text top-inline-info">Range {controls.selectedRangeNm.toFixed(1)} {LENGTH_UNITS.NAUTICAL_MILES}</span>
        <ControlButton className="control-btn top-line-btn">Center</ControlButton>
        <ControlButton className="control-btn top-line-btn">Max</ControlButton>
        <ControlButton className="control-btn top-line-btn">Hdop</ControlButton>
      </div>
      <div className="btn-row">
        <ControlButton className="control-btn top-line-btn">5 {LENGTH_UNITS.NAUTICAL_MILES}</ControlButton>
        <ControlButton className="control-btn top-line-btn" onClick={() => onChange({ chartOverlayOn: !controls.chartOverlayOn })}>
          Charts {controls.chartOverlayOn ? 'On' : 'Off'}
        </ControlButton>
        <ControlButton className="control-btn top-line-btn">Sym On</ControlButton>
      </div>
    </div>
  );
};
