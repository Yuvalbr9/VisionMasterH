import React from 'react';
import { RADAR_RANGE_RING_COUNT as RadarRangeRingCount } from '../../util';
import { getRadarSvgPoint } from './radarMapUtils';

interface RadarGridProps {
  centerX: number;
  centerY: number;
  radius: number;
}

const SpokeStepDeg = 30;

export const RadarGrid: React.FC<RadarGridProps> = ({
  centerX,
  centerY,
  radius,
}) => {
  const rings = React.useMemo(() => {
    return Array.from({ length: RadarRangeRingCount }, (_, index) => {
      const fraction = (index + 1) / RadarRangeRingCount;
      return {
        key: `ring-${index + 1}`,
        radius: radius * fraction,
        className: index % 2 === 0 ? 'radar-grid-ring radar-grid-ring-solid' : 'radar-grid-ring radar-grid-ring-dashed',
      };
    });
  }, [radius]);

  const spokes = React.useMemo(() => {
    return Array.from({ length: 360 / SpokeStepDeg }, (_, index) => {
      const bearingDeg = index * SpokeStepDeg;
      const endpoint = getRadarSvgPoint(centerX, centerY, radius, bearingDeg);
      const isCardinal = bearingDeg % 90 === 0;

      return {
        key: `spoke-${bearingDeg}`,
        x2: endpoint.x,
        y2: endpoint.y,
        className: isCardinal ? 'radar-grid-spoke radar-grid-spoke-cardinal' : 'radar-grid-spoke',
      };
    });
  }, [centerX, centerY, radius]);

  const hubRadius = Math.max(12, radius * 0.12);

  return (
    <g aria-hidden="true">
      {spokes.map((spoke) => (
        <line
          key={spoke.key}
          className={spoke.className}
          x1={centerX}
          y1={centerY}
          x2={spoke.x2}
          y2={spoke.y2}
        />
      ))}
      {rings.map((ring) => (
        <circle key={ring.key} className={ring.className} cx={centerX} cy={centerY} r={ring.radius} />
      ))}
      <circle className="radar-grid-hub" cx={centerX} cy={centerY} r={hubRadius} />
    </g>
  );
};