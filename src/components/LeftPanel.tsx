import React, { useState } from 'react';
import { Angle } from 'unitsnet-js';
import { NavigationData } from '../types';
import { PanelTabs } from './LeftPanel/PanelTabs';
import { HeadingDisplay } from './LeftPanel/HeadingDisplay';
import { SpeedDisplay } from './LeftPanel/SpeedDisplay';
import { PositionDisplay } from './LeftPanel/PositionDisplay';
import { CourseDisplay } from './LeftPanel/CourseDisplay';
import { SOGDisplay } from './LeftPanel/SOGDisplay';
import { DateTimeDisplay } from './LeftPanel/DateTimeDisplay';
import { DockingTab } from '../components/DockingTab';
import { UI_TEXT } from '../constants';

interface LeftPanelProps {
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
  waveDirectionRelative: Angle | null;
  dateTimeIso: string | null;
  isLoading: boolean;
  error: string | null;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  navData,
  updateNavData,
  waveDirectionRelative,
  dateTimeIso,
  isLoading,
  error,
}) => {
  const tabs = [...UI_TEXT.LEFT_PANEL.TABS];
  const [activeTab, setActiveTab] = useState(0);

  const renderDefaultContent = () => (
    <>
      {isLoading && <div className="lp-api-status">{UI_TEXT.LEFT_PANEL.LOADING_SIDEBAR}</div>}
      {error && <div className="lp-api-status lp-api-status-error">{error}</div>}

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


      <DateTimeDisplay isoDateTime={dateTimeIso} />
    </>
  );

  return (
    <div className="left-panel">
      <PanelTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 1 ? <DockingTab /> : renderDefaultContent()}
    </div>
  );
};
