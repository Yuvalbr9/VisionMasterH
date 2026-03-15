import React from 'react';
import { formatRadarDegrees, toRadarMapDisplayBearing } from '../../util';
import { RadarOrientationMode } from '../../types';
import { getRadarSvgPoint } from './radarMapUtils';

interface DegreeTicksProps {
  centerX: number;
  centerY: number;
  radius: number;
  orientationMode: RadarOrientationMode;
  headingDeg: number;
}

const ScaleTickLengthPx = 8;
const ScaleLabelOutsetPx = 6;
const ScaleMinorTickLengthPx = 3;
const ScaleFiveDegTickLengthPx = 5;

export const DegreeTicks: React.FC<DegreeTicksProps> = ({
  centerX,
  centerY,
  radius,
  orientationMode,
  headingDeg,
}) => {
  const scale = React.useMemo(() => {
    const nextTicks: Array<{
      key: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];
    const nextDots: Array<{
      key: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      className: string;
    }> = [];
    const nextLabels: Array<{
      key: string;
      x: number;
      y: number;
      value: string;
      className: string;
    }> = [];
    const outerScaleRadius = radius;

    for (let actualBearing = 0; actualBearing < 360; actualBearing += 1) {
      const screenBearing = toRadarMapDisplayBearing(actualBearing, orientationMode, headingDeg);
      const isMajorTick = actualBearing % 10 === 0;

      if (isMajorTick) {
        const isThirtyDegreeLabel = actualBearing % 30 === 0;
        const isCardinalLabel = actualBearing % 90 === 0;
        const innerPoint = getRadarSvgPoint(centerX, centerY, outerScaleRadius - ScaleTickLengthPx, screenBearing);
        const outerPoint = getRadarSvgPoint(centerX, centerY, outerScaleRadius, screenBearing);
        const labelPoint = getRadarSvgPoint(centerX, centerY, outerScaleRadius + ScaleLabelOutsetPx, screenBearing);

        nextTicks.push({
          key: `tick-${actualBearing}`,
          x1: innerPoint.x,
          y1: innerPoint.y,
          x2: outerPoint.x,
          y2: outerPoint.y,
        });

        nextLabels.push({
          key: `label-${actualBearing}`,
          x: labelPoint.x,
          y: labelPoint.y,
          value: formatRadarDegrees(actualBearing),
          className: isCardinalLabel
            ? 'radar-degree-label radar-degree-label-cardinal'
            : isThirtyDegreeLabel
              ? 'radar-degree-label radar-degree-label-major'
              : 'radar-degree-label',
        });

        continue;
      }

      const minorTickLength = actualBearing % 5 === 0 ? ScaleFiveDegTickLengthPx : ScaleMinorTickLengthPx;
      const innerPoint = getRadarSvgPoint(centerX, centerY, outerScaleRadius - minorTickLength, screenBearing);
      const outerPoint = getRadarSvgPoint(centerX, centerY, outerScaleRadius, screenBearing);
      const isFiveDegreeDot = actualBearing % 5 === 0;

      nextDots.push({
        key: `dot-${actualBearing}`,
        x1: innerPoint.x,
        y1: innerPoint.y,
        x2: outerPoint.x,
        y2: outerPoint.y,
        className: isFiveDegreeDot ? 'radar-degree-dot radar-degree-dot-five' : 'radar-degree-dot',
      });
    }

    return {
      ticks: nextTicks,
      dots: nextDots,
      labels: nextLabels,
    };
  }, [centerX, centerY, headingDeg, orientationMode, radius]);

  return (
    <g aria-hidden="true">
      {scale.dots.map((dot) => (
        <line
          key={dot.key}
          className={dot.className}
          x1={dot.x1}
          y1={dot.y1}
          x2={dot.x2}
          y2={dot.y2}
        />
      ))}
      {scale.ticks.map((tick) => (
        <line
          key={tick.key}
          className="radar-degree-tick radar-degree-tick-major"
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
        />
      ))}
      {scale.labels.map((label) => (
        <text key={label.key} className={label.className} x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle">
          {label.value}
        </text>
      ))}
    </g>
  );
};