import React from 'react';
import { useRadarCanvas } from './useRadarCanvas';

export const RadarCanvas: React.FC = () => {
  const canvasRef = useRadarCanvas();

  return (
    <canvas
      ref={canvasRef}
      width={550}
      height={550}
      className="radar-canvas"
    />
  );
};
