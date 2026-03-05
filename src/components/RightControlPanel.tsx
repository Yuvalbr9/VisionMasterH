import React from 'react';
import { RightPanel } from './RightPanel';
import { ARPATarget, RadarControlState } from '../types';

interface RightControlPanelProps {
  radarControls: RadarControlState;
  onRadarControlsChange: React.Dispatch<React.SetStateAction<RadarControlState>>;
  velocity: { vn: number; ve: number };
  onVelocityChange: React.Dispatch<React.SetStateAction<{ vn: number; ve: number }>>;
  leewayDeg: number;
  arpaTargets: ARPATarget[];
}

export const RightControlPanel: React.FC<RightControlPanelProps> = (props) => {
  return <RightPanel {...props} />;
};
