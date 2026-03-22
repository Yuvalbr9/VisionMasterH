import React from 'react';
import { RadarOrientationMode } from '../../types';
import { toRadarMapDisplayBearing } from '../../util';
import { getRadarSvgPoint } from './radarMapUtils';

interface HeadingLineProps {
  centerX: number;
  centerY: number;
  radius: number;
  courseDeg: number;
  headingDeg: number;
  orientationMode: RadarOrientationMode;
}

export const HeadingLine: React.FC<HeadingLineProps> = ({
  centerX,
  centerY,
  radius,
  courseDeg,
  headingDeg,
  orientationMode,
}) => {
  const displayedBearing = toRadarMapDisplayBearing(courseDeg, orientationMode, headingDeg);
  const endPoint = getRadarSvgPoint(centerX, centerY, radius - 6, displayedBearing);

  return (
    <g aria-hidden="true">
      <line className="radar-heading-line-glow" x1={centerX} y1={centerY} x2={endPoint.x} y2={endPoint.y} />
      <line className="radar-heading-line" x1={centerX} y1={centerY} x2={endPoint.x} y2={endPoint.y} />
    </g>
  );
};