import React from 'react';
import { ARPATarget, NavigationData, RadarControlState } from '../types';
import { RadarTopInfo } from './RadarDisplay/RadarTopInfo';
import { RadarCanvas } from './RadarDisplay/RadarCanvas';
import { RadarBottomControls } from './RadarDisplay/RadarBottomControls';

interface RadarDisplayProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  arpaTargets: ARPATarget[];
  leewayDeg: number;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({ navData, radarControls, arpaTargets, leewayDeg }) => {
  return (
    <div className="radar-display">
      <RadarTopInfo navData={navData} controls={radarControls} leewayDeg={leewayDeg} />
      <RadarCanvas navData={navData} controls={radarControls} arpaTargets={arpaTargets} />
      <RadarBottomControls />
    </div>
  );
};
