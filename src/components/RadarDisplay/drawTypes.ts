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
