import React from 'react';
import { createPortal } from 'react-dom';
import { NavigationData, RadarControlState } from '../../types';
import { RadarTopInfo } from '../RadarDisplay/RadarTopInfo';
import { RadarBottomControls } from '../RadarDisplay/RadarBottomControls';

interface RadarOverlayControlsProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  onRadarControlsChange: React.Dispatch<React.SetStateAction<RadarControlState>>;
}

export const RadarOverlayControls: React.FC<RadarOverlayControlsProps> = ({
  navData,
  radarControls,
  onRadarControlsChange,
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
      <RadarTopInfo navData={navData} controls={radarControls} />
      <RadarBottomControls />
    </>,
    radarHost
  );
};
