import React, { useEffect } from 'react';
import { NavigationData } from '../../types';
import { LeftPanel } from './LeftPanel';
import { useShipCourse } from '../../hooks/useShipCourse';
import { useShipPosition } from '../../hooks/useShipPosition';
import { useCurrentDateTime } from '../../hooks/useCurrentDateTime';

interface LeftBarProps {
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
}

export const LeftBar: React.FC<LeftBarProps> = ({ navData, updateNavData }) => {
  const courseState = useShipCourse();
  const positionState = useShipPosition();
  const timeState = useCurrentDateTime();
  const isManualNavigationMode = !courseState.isLoading && !courseState.shipCourse;

  const isLoading =
    courseState.isLoading ||
    positionState.isLoading ||
    timeState.isLoading;

  const error =
    courseState.error ||
    positionState.error ||
    timeState.error;

  useEffect(() => {
    // We intentionally ignore the course update from the API here to preserve
    // the independent HDG and COG values configured locally in the state.
    // If you need it back later, you can map courseState.shipCourse selectively.
  }, [courseState.shipCourse, updateNavData]);

  useEffect(() => {
    if (!positionState.position) {
      return;
    }

    updateNavData({
      posLat: positionState.position.lat,
      posLon: positionState.position.lon,
    });
  }, [positionState.position, updateNavData]);

  return (
    <LeftPanel
      navData={navData}
      updateNavData={updateNavData}
      dateTimeIso={timeState.currentDateTime}
      isLoading={isLoading}
      error={error ?? null}
      isManualNavigationMode={isManualNavigationMode}
    />
  );
};
