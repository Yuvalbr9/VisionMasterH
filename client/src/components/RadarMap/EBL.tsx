import React from 'react';
import { RadarOrientationMode } from '../../types';
import { toRadarMapDisplayBearing } from '../../util';
import { getRadarSvgPoint } from './radarMapUtils';

interface EBLProps {
  centerX: number;
  centerY: number;
  radius: number;
  angleDeg: number;
  headingDeg: number;
  orientationMode: RadarOrientationMode;
  variant: 'primary' | 'secondary';
  onMouseDown?: (event: React.MouseEvent) => void;
}

export const EBL: React.FC<EBLProps> = ({
  centerX,
  centerY,
  radius,
  angleDeg,
  headingDeg,
  orientationMode,
  variant,
  onMouseDown,
}) => {
  const displayedBearing = toRadarMapDisplayBearing(angleDeg, orientationMode, headingDeg);
  const endPoint = getRadarSvgPoint(centerX, centerY, radius - 4, displayedBearing);

  return (
    <g aria-hidden="true">
      <line
        className={variant === 'primary' ? 'radar-ebl-primary' : 'radar-ebl-secondary'}
        x1={centerX}
        y1={centerY}
        x2={endPoint.x}
        y2={endPoint.y}
        onMouseDown={onMouseDown}
      />
    </g>
  );
};