import React from 'react';
import { useRadarCanvas } from './useRadarCanvas';
import { ARPATarget, NavigationData, RadarControlState } from '../../types';

interface RadarCanvasProps {
  navData: NavigationData;
  controls: RadarControlState;
  arpaTargets: ARPATarget[];
}

export const RadarCanvas: React.FC<RadarCanvasProps> = ({ navData, controls, arpaTargets }) => {
  const canvasRef = useRadarCanvas({ navData, controls, arpaTargets });

  return (
    <canvas
      ref={canvasRef}
      className="radar-canvas"
    />
  );
};
