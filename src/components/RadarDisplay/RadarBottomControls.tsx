import React from 'react';
import { ControlButton } from '../Buttons';

export const RadarBottomControls: React.FC = () => {
  return (
    <div className="radar-bottom-controls">
      <div className="form-title">Radar Controls</div>
      <ControlButton>Enhance Off</ControlButton>
      
      <div className="gain-control">
        <span>Gain</span>
        <input type="range" min="0" max="100" defaultValue="50" />
      </div>
      
      <div className="gain-control">
        <span>Save Value</span>
        <input type="range" min="0" max="100" defaultValue="50" />
      </div>
      
      <ControlButton>Main</ControlButton>
      <ControlButton>AFG</ControlButton>
      
      <div className="tune-control">
        <span>Tune & Attune</span>
        <ControlButton className="tune-btn">Manual</ControlButton>
      </div>
    </div>
  );
};
