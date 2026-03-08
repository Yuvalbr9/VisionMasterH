import { ARPATarget, NavigationData, RadarControlState } from '../../types';

export interface RadarDrawContext {
  ctx: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  maxRadiusPx: number;
  navData: NavigationData;
  controls: RadarControlState;
  arpaTargets: ARPATarget[];
}

export const degreesToCanvasRadians = (bearingDeg: number): number => {
  return ((bearingDeg - 90) * Math.PI) / 180;
};

export const normalizeBearing = (bearingDeg: number): number => {
  return ((bearingDeg % 360) + 360) % 360;
};

// Convert world bearing into screen bearing according to map orientation mode.
export const toDisplayBearing = (
  bearingDeg: number,
  navData: NavigationData,
  controls: RadarControlState
): number => {
  const normalized = normalizeBearing(bearingDeg);
  if (controls.northUp) {
    return normalized;
  }

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
  const ratio = Math.max(0, Math.min(1, rangeNm / selectedRangeNm));
  return ratio * maxRadiusPx;
};
