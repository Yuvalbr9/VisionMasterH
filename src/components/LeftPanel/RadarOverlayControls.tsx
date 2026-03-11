import React from 'react';
import { createPortal } from 'react-dom';
import { NavigationData, RadarControlState } from '../../types';
import { RadarTopInfo } from '../RadarDisplay/RadarTopInfo';
import { RadarBottomControls } from '../RadarDisplay/RadarBottomControls';

interface RadarOverlayControlsProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  leewayDeg: number;
}

export const RadarOverlayControls: React.FC<RadarOverlayControlsProps> = ({
  navData,
  radarControls,
  leewayDeg,
}) => {
  const [radarHost, setRadarHost] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const nextHost = document.querySelector<HTMLElement>('.radar-display');
    setRadarHost(nextHost);
  }, []);

  if (!radarHost) {
    return null;
  }

  return createPortal(
    <>
      <RadarTopInfo navData={navData} controls={radarControls} leewayDeg={leewayDeg} />
      <RadarBottomControls />
    </>,
    radarHost
  );
};
