import { normalizeBearing, normalizeSignedBearingDelta } from './bearingUtils';

const VELOCITY_EPSILON = 0.001;
const NAV_CHANGE_TOLERANCE = 0.05;

export interface VelocityVector {
  vn: number;
  ve: number;
}

export interface DerivedCogSog {
  cogDeg: number;
  sogKn: number;
  velocityIsMeaningful: boolean;
}

/**
 * Derives COG/SOG from north-east velocity components.
 * Returns a normalized COG in degrees and a low-speed validity flag.
 */
export const calculateCogSogFromVelocity = ({ vn, ve }: VelocityVector): DerivedCogSog => {
  const sogKn = Math.hypot(vn, ve);
  const cogDeg = normalizeBearing((Math.atan2(ve, vn) * 180) / Math.PI);

  return {
    cogDeg,
    sogKn,
    velocityIsMeaningful: sogKn > VELOCITY_EPSILON,
  };
};

export const hasNavigationDeltaAboveTolerance = (
  currentCogDeg: number,
  currentSogKn: number,
  nextCogDeg: number,
  nextSogKn: number,
  tolerance: number = NAV_CHANGE_TOLERANCE
): boolean => {
  const cogDelta = normalizeSignedBearingDelta(nextCogDeg - currentCogDeg);
  const cogChanged = Math.abs(cogDelta) > tolerance;
  const sogChanged = Math.abs(nextSogKn - currentSogKn) > tolerance;

  return cogChanged || sogChanged;
};

export const calculateLeewayDeg = (cogDeg: number, hdgDeg: number): number => {
  return normalizeSignedBearingDelta(cogDeg - hdgDeg);
};

export interface SogComponents {
  lateralKn: number;
  foreAftKn: number;
}

/**
 * Decomposes speed over ground into ship-relative lateral and fore/aft components.
 */
export const decomposeSogByLeeway = (sogKn: number, leewayDeg: number): SogComponents => {
  const leewayRad = (leewayDeg * Math.PI) / 180;

  return {
    lateralKn: sogKn * Math.sin(leewayRad),
    foreAftKn: sogKn * Math.cos(leewayRad),
  };
};

export const formatSpeedMagnitudeKnots = (valueKnots: number, decimals: number = 1): string => {
  return Math.abs(valueKnots).toFixed(decimals);
};
