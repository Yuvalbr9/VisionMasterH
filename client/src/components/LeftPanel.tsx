import React, { useState } from 'react';
import { NavigationData, RadarControlState } from '../types';
import { PanelTabs } from './LeftPanel/PanelTabs';
import { LeftPanelTabs, PanelContent } from './LeftPanel/PanelContent';
import { RadarOverlayControls } from './LeftPanel/RadarOverlayControls';
import { UI_TEXT } from '../constants';

interface LeftPanelProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  updateNavData: (updates: Partial<NavigationData>) => void;
  dateTimeIso: string | null;
  isLoading: boolean;
  error: string | null;
  isManualNavigationMode: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  navData,
  radarControls,
  updateNavData,
  dateTimeIso,
  isLoading,
  error,
  isManualNavigationMode,
}) => {
  const tabs = [...UI_TEXT.LEFT_PANEL.TABS];
  const [activeTab, setActiveTab] = useState<LeftPanelTabs>(LeftPanelTabs.DEFAULT);

  return (
    <div className="left-panel">
      <PanelTabs tabs={tabs} activeTab={activeTab} onTabChange={(index) => setActiveTab(index as LeftPanelTabs)} />
      <PanelContent
        activeTab={activeTab}
        navData={navData}
        updateNavData={updateNavData}
        dateTimeIso={dateTimeIso}
        isLoading={isLoading}
        error={error}
        isManualNavigationMode={isManualNavigationMode}
      />
      <RadarOverlayControls navData={navData} radarControls={radarControls} />
    </div>
  );
};
