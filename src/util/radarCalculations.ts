import { NavigationData, RadarControlState } from '../types';
import { normalizeBearing } from './bearingUtils';
import { clamp } from './numberUtils';

export const RADAR_RANGE_RING_COUNT = 6;

export const degreesToCanvasRadians = (bearingDeg: number): number => {
  return ((bearingDeg - 90) * Math.PI) / 180;
};

export const toDisplayBearing = (
  bearingDeg: number,
  navData: NavigationData,
  controls: RadarControlState
): number => {
  const normalized = normalizeBearing(bearingDeg);
  if (controls.northUp) {
    return normalized;
  }

  // In Head-Up mode, rotate the world by own-ship heading.
  return normalizeBearing(normalized - navData.hdg.Degrees);
};

export const polarToCanvas = (
  centerX: number,
  centerY: number,
  radiusPx: number,
  bearingDeg: number
): { x: number; y: number } => {
  const rad = degreesToCanvasRadians(bearingDeg);

  return {
    x: centerX + radiusPx * Math.cos(rad),
    y: centerY + radiusPx * Math.sin(rad),
  };
};

export const rangeNmToPixels = (rangeNm: number, maxRadiusPx: number, selectedRangeNm: number): number => {
  if (selectedRangeNm <= 0) {
    return 0;
  }

  const ratio = clamp(rangeNm / selectedRangeNm, 0, 1);
  return ratio * maxRadiusPx;
};

export const getRangeRingSpacingNm = (
  selectedRangeNm: number,
  ringCount: number = RADAR_RANGE_RING_COUNT
): number => {
  if (selectedRangeNm <= 0 || ringCount <= 0) {
    return 0;
  }

  return selectedRangeNm / ringCount;
};
