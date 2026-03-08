import React, { useState } from 'react';
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
import { calculateLeewayDeg } from '../util';

interface LeftPanelProps {
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
  dateTimeIso: string | null;
  isLoading: boolean;
  error: string | null;
  isManualNavigationMode: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  navData,
  updateNavData,
  dateTimeIso,
  isLoading,
  error,
  isManualNavigationMode,
}) => {
  const tabs = [...UI_TEXT.LEFT_PANEL.TABS];
  const [activeTab, setActiveTab] = useState(0);
  const leewayDeg = React.useMemo(
    () => calculateLeewayDeg(navData.cog.Degrees, navData.hdg.Degrees),
    [navData.cog.Degrees, navData.hdg.Degrees]
  );

  const renderDefaultContent = () => (
    <>
      {isLoading && <div className="lp-api-status">{UI_TEXT.LEFT_PANEL.LOADING_SIDEBAR}</div>}
      {error && <div className="lp-api-status lp-api-status-error">{error}</div>}
      {isManualNavigationMode && <div className="lp-api-status lp-api-status-manual">{UI_TEXT.LEFT_PANEL.MANUAL_MODE_ACTIVE}</div>}

      <HeadingDisplay
        value={navData.hdg}
        onChange={(value) => updateNavData({ hdg: value })}
        isManualMode={isManualNavigationMode}
      />

      <SpeedDisplay
        value={navData.stw}
      />

      <PositionDisplay
        lat={navData.posLat}
        lon={navData.posLon}
      />

      <CourseDisplay
        value={navData.cog}
        onChange={(value) => updateNavData({ cog: value })}
        isManualMode={isManualNavigationMode}
      />

      <SOGDisplay
        value={navData.sog}
        leewayDeg={leewayDeg}
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
