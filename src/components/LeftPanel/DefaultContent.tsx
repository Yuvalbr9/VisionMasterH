import React from 'react';
import { NavigationData } from '../../types';
import { UI_TEXT } from '../../constants';
import { calculateLeewayDeg } from '../../util';
import { HeadingDisplay } from './HeadingDisplay';
import { SpeedDisplay } from './SpeedDisplay';
import { PositionDisplay } from './PositionDisplay';
import { CourseDisplay } from './CourseDisplay';
import { SOGDisplay } from './SOGDisplay';
import { DateTimeDisplay } from './DateTimeDisplay';
import './left-panel.css';

interface DefaultContentProps {
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
  dateTimeIso: string | null;
  isLoading: boolean;
  error: string | null;
  isManualNavigationMode: boolean;
}

export const DefaultContent: React.FC<DefaultContentProps> = ({
  navData,
  updateNavData,
  dateTimeIso,
  isLoading,
  error,
  isManualNavigationMode,
}) => {
  const leewayDeg = calculateLeewayDeg(navData.cog.Degrees, navData.hdg.Degrees);

  return (
    <div className='left-panel'>
      {isLoading && <div className="lp-api-status">{UI_TEXT.LEFT_PANEL.LOADING_SIDEBAR}</div>}
      {error && <div className="lp-api-status lp-api-status-error">{error}</div>}
      {isManualNavigationMode && <div className="lp-api-status lp-api-status-manual">{UI_TEXT.LEFT_PANEL.MANUAL_MODE_ACTIVE}</div>}

      <HeadingDisplay
        value={navData.hdg}
        onChange={(value) => updateNavData({ hdg: value })}
        isManualMode={isManualNavigationMode}
      />

      <SpeedDisplay value={navData.stw} />

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
    </div>
  );
};
