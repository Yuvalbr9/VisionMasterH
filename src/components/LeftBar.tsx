import React, { useEffect } from 'react';
import { NavigationData, RadarControlState } from '../types';
import { LeftPanel } from './LeftPanel';
import { useShipCourse } from '../hooks/useShipCourse';
import { useShipPosition } from '../hooks/useShipPosition';
import { useCurrentDateTime } from '../hooks/useCurrentDateTime';

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
    if (!courseState.shipCourse) {
      return;
    }

    updateNavData({
      hdg: courseState.shipCourse,
      cog: courseState.shipCourse,
    });
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
      radarControls={radarControls}
      updateNavData={updateNavData}
      dateTimeIso={timeState.currentDateTime}
      isLoading={isLoading}
      error={error ?? null}
      isManualNavigationMode={isManualNavigationMode}
    />
  );
};
