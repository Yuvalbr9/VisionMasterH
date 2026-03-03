import React from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { NavigationData } from '../types';
import { PanelTabs } from './LeftPanel/PanelTabs';
import { HeadingDisplay } from './LeftPanel/HeadingDisplay';
import { SpeedDisplay } from './LeftPanel/SpeedDisplay';
import { PositionDisplay } from './LeftPanel/PositionDisplay';
import { CourseDisplay } from './LeftPanel/CourseDisplay';
import { SOGDisplay } from './LeftPanel/SOGDisplay';
import { CCRPControls } from './LeftPanel/CCRPControls';
import { DateTimeDisplay } from './LeftPanel/DateTimeDisplay';

interface LeftPanelProps {
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ navData, updateNavData }) => {
  const tabs = ['Default', 'Docking', 'Environment', 'Route', 'Sea &'];

  return (
    <div className="left-panel">
      <PanelTabs tabs={tabs} activeTab={0} />

      <HeadingDisplay 
        value={navData.hdg} 
        onChange={(value) => updateNavData({ hdg: value })} 
      />

      <SpeedDisplay 
        value={navData.stw} 
        onChange={(value) => updateNavData({ stw: value })} 
      />

      <PositionDisplay 
        lat={navData.posLat}
        lon={navData.posLon}
        onLatChange={(value) => updateNavData({ posLat: value })}
        onLonChange={(value) => updateNavData({ posLon: value })}
      />

      <CourseDisplay 
        value={navData.cog} 
        onChange={(value) => updateNavData({ cog: value })} 
      />

      <SOGDisplay 
        value={navData.sog} 
        onChange={(value) => updateNavData({ sog: value })} 
      />

      <CCRPControls 
        ccrpPS={navData.ccrpPS}
        ccrpFA={navData.ccrpFA}
        stemPS={navData.stemPS}
        onCcrpPSChange={(value: Length) => updateNavData({ ccrpPS: value })}
        onCcrpFAChange={(value: Length) => updateNavData({ ccrpFA: value })}
        onStemPSChange={(value: Length) => updateNavData({ stemPS: value })}
      />

      <DateTimeDisplay />
    </div>
  );
};
