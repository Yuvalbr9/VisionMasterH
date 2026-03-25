import { NavigationData, RadarControlState } from '../types';
import { normalizeBearing } from './bearingUtils';
import { clamp } from './numberUtils';

export const RADAR_RANGE_RING_COUNT = 6;

/**
 * Converts radar bearing degrees (0 at North, clockwise-positive)
 * into canvas radians (0 at +X axis).
 */
export const degreesToCanvasRadians = (bearingDeg: number): number => {
  const normalizedBearingDeg = normalizeBearing(bearingDeg);
  return ((normalizedBearingDeg - 90) * Math.PI) / 180;
};

/**
 * Converts a true/world bearing into the current display frame.
 * Head-Up mode rotates by own-ship heading.
 */
export const toDisplayBearing = (
  bearingDeg: number,
  navData: NavigationData,
  controls: RadarControlState
): number => {
  const normalized = normalizeBearing(bearingDeg);
  if (controls.northUp) {
    return normalized;
  }

  const ownShipHeading = normalizeBearing(navData.hdg.Degrees);
  return normalizeBearing(normalized - ownShipHeading);
};

/**
 * Converts a display-frame bearing back to true/world bearing.
 * This is the inverse of {@link toDisplayBearing}.
 */
export const fromDisplayBearing = (
  displayBearingDeg: number,
  navData: NavigationData,
  controls: RadarControlState
): number => {
  const normalizedDisplayBearing = normalizeBearing(displayBearingDeg);
  if (controls.northUp) {
    return normalizedDisplayBearing;
  }

  const ownShipHeading = normalizeBearing(navData.hdg.Degrees);
  return normalizeBearing(normalizedDisplayBearing + ownShipHeading);
};

export const polarToCanvas = (
  centerX: number,
  centerY: number,
  radiusPx: number,
  bearingDeg: number
): { x: number; y: number } => {
  const safeCenterX = Number.isFinite(centerX) ? centerX : 0;
  const safeCenterY = Number.isFinite(centerY) ? centerY : 0;
  const safeRadiusPx = Number.isFinite(radiusPx) ? Math.max(0, radiusPx) : 0;
  const rad = degreesToCanvasRadians(bearingDeg);

  return {
    x: safeCenterX + safeRadiusPx * Math.cos(rad),
    y: safeCenterY + safeRadiusPx * Math.sin(rad),
  };
};

export const rangeNmToPixels = (rangeNm: number, maxRadiusPx: number, selectedRangeNm: number): number => {
  const safeMaxRadiusPx = Number.isFinite(maxRadiusPx) ? Math.max(0, maxRadiusPx) : 0;
  const safeSelectedRangeNm = Number.isFinite(selectedRangeNm) ? selectedRangeNm : 0;

  if (safeSelectedRangeNm <= 0 || safeMaxRadiusPx <= 0) {
    return 0;
  }

  const safeRangeNm = Number.isFinite(rangeNm) ? rangeNm : 0;
  const ratio = clamp(safeRangeNm / safeSelectedRangeNm, 0, 1);
  return ratio * safeMaxRadiusPx;
};

export const getRangeRingSpacingNm = (
  selectedRangeNm: number,
  ringCount: number = RADAR_RANGE_RING_COUNT
): number => {
  if (
    !Number.isFinite(selectedRangeNm)
    || !Number.isFinite(ringCount)
    || selectedRangeNm <= 0
    || ringCount <= 0
  ) {
    return 0;
  }

  return selectedRangeNm / ringCount;
};
