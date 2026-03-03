import React from 'react';
import { NavigationData } from '../types';
import { RadarTopInfo } from './RadarDisplay/RadarTopInfo';
import { RadarCanvas } from './RadarDisplay/RadarCanvas';
import { RadarBottomControls } from './RadarDisplay/RadarBottomControls';

interface RadarDisplayProps {
  navData: NavigationData;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({ navData }) => {
  return (
    <div className="radar-display">
      <RadarTopInfo navData={navData} />
      <RadarCanvas />
      <RadarBottomControls />
    </div>
  );
};
