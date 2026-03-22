import React, { useEffect } from 'react';
import { Angle } from 'unitsnet-js';
import { NavigationData, RadarControlState } from '../types';
import { LeftPanel } from './LeftPanel';
import { useCurrentDateTime } from '../hooks/useCurrentDateTime';
import { useOwnship } from '../hooks/useOwnship';

interface LeftBarProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  updateNavData: (updates: Partial<NavigationData>) => void;
}

export const LeftBar: React.FC<LeftBarProps> = ({
  navData,
  radarControls,
  updateNavData,
}) => {
  const ownshipState = useOwnship();
  const timeState = useCurrentDateTime();
  const isManualNavigationMode = !ownshipState.isLoading && !ownshipState.ownship;

  const isLoading =
    ownshipState.isLoading ||
    timeState.isLoading;

  const error =
    ownshipState.error ||
    timeState.error;

  useEffect(() => {
    if (!ownshipState.ownship) {
      return;
    }

    updateNavData({
      hdg: Angle.FromDegrees(ownshipState.ownship.heading),
      cog: Angle.FromDegrees(ownshipState.ownship.heading),
      posLat: Angle.FromDegrees(ownshipState.ownship.position.latitude),
      posLon: Angle.FromDegrees(ownshipState.ownship.position.longitude),
    });
  }, [ownshipState.ownship, updateNavData]);

  return (
    <LeftPanel
      navData={navData}
      radarControls={radarControls}
      updateNavData={updateNavData}
      dateTimeIso={timeState.currentDateTime}
      isLoading={isLoading}
      error={error ?? null}
      isManualNavigationMode={isManualNavigationMode}
    />
  );
};
