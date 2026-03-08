import { clamp } from './numberUtils';

export const normalizeBearing = (bearingDeg: number): number => {
  return ((bearingDeg % 360) + 360) % 360;
};

export const normalizeSignedBearingDelta = (deltaDeg: number): number => {
  return ((deltaDeg + 540) % 360) - 180;
};

export const clampVrmRangeNm = (rangeNm: number): number => {
  return clamp(rangeNm, 0, 99);
};
