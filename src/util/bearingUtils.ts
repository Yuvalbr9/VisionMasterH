import { clamp } from './numberUtils';

const FULL_CIRCLE_DEGREES = 360;
const HALF_CIRCLE_DEGREES = 180;
const BEARING_EPSILON = 1e-9;
const EBL_MIN_DEGREES = 0;
const EBL_MAX_DEGREES = 359;
const VRM_MIN_NM = 0;
const VRM_MAX_NM = 100;

export const normalizeBearing = (bearingDeg: number): number => {
  if (!Number.isFinite(bearingDeg)) {
    return 0;
  }

  const normalized = ((bearingDeg % FULL_CIRCLE_DEGREES) + FULL_CIRCLE_DEGREES) % FULL_CIRCLE_DEGREES;

  // Keep wrap-around stable so near-360 floating artifacts display as 0 deg.
  if (Math.abs(normalized) <= BEARING_EPSILON || Math.abs(normalized - FULL_CIRCLE_DEGREES) <= BEARING_EPSILON) {
    return 0;
  }

  return normalized;
};

export const normalizeSignedBearingDelta = (deltaDeg: number): number => {
  if (!Number.isFinite(deltaDeg)) {
    return 0;
  }

  return normalizeBearing(deltaDeg + HALF_CIRCLE_DEGREES) - HALF_CIRCLE_DEGREES;
};

export const clampEblBearingDeg = (bearingDeg: number): number => {
  if (!Number.isFinite(bearingDeg)) {
    return EBL_MIN_DEGREES;
  }

  return clamp(bearingDeg, EBL_MIN_DEGREES, EBL_MAX_DEGREES);
};

export const clampVrmRangeNm = (rangeNm: number): number => {
  if (!Number.isFinite(rangeNm)) {
    return VRM_MIN_NM;
  }

  return clamp(rangeNm, VRM_MIN_NM, VRM_MAX_NM);
};
