import React, { useEffect } from 'react';
import { NavigationData } from '../types';
import { LeftPanel } from './LeftPanel';
import { useShipCourse } from '../hooks/useShipCourse';
import { useShipPosition } from '../hooks/useShipPosition';
import { useRelativeWaveDirection } from '../hooks/useRelativeWaveDirection';
import { useCurrentDateTime } from '../hooks/useCurrentDateTime';

interface LeftBarProps {
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
}

export const LeftBar: React.FC<LeftBarProps> = ({ navData, updateNavData }) => {
  const courseState = useShipCourse();
  const positionState = useShipPosition();
  const waveState = useRelativeWaveDirection();
  const timeState = useCurrentDateTime();

  const isLoading =
    courseState.isLoading ||
    positionState.isLoading ||
    waveState.isLoading ||
    timeState.isLoading;

  const error =
    courseState.error ||
    positionState.error ||
    waveState.error ||
    timeState.error;

  useEffect(() => {
    if (!courseState.shipCourse || !positionState.position) {
      return;
    }

    updateNavData({
      hdg: courseState.shipCourse,
      cog: courseState.shipCourse,
      posLat: positionState.position.lat,
      posLon: positionState.position.lon,
    });
  }, [courseState.shipCourse, positionState.position, updateNavData]);

  return (
    <LeftPanel
      navData={navData}
      updateNavData={updateNavData}
      waveDirectionRelative={waveState.relativeWaveDirection}
      dateTimeIso={timeState.currentDateTime}
      isLoading={isLoading}
      error={error ?? null}
    />
  );
};
