import { clamp } from './numberUtils';
import { normalizeBearing } from './bearingUtils';
import {
  RadarCoverageBounds,
  RadarGeoPosition,
  RadarMotionMode,
  RadarOwnShipState,
  RadarRelativeVelocity,
  RadarTargetState,
} from '../types/radarMap';
import {
  calculateRelativeCourse,
  calculateRelativeSpeed,
  calculateRelativeVelocity,
  decomposeVelocity,
} from './relativeMotionCalculations';

const EARTH_RADIUS_METERS = 6_371_000;
const METERS_PER_NAUTICAL_MILE = 1_852;
const SECONDS_PER_HOUR = 3_600;
const METERS_PER_LATITUDE_DEGREE = 111_320;
const DEGREES_TO_RADIANS = Math.PI / 180;
const RADIANS_TO_DEGREES = 180 / Math.PI;
const LONGITUDE_COSINE_FLOOR = 0.000_001;

export const RADAR_COVERAGE_BOUNDS: RadarCoverageBounds = {
  minLatitude: 10,
  maxLatitude: 46,
  minLongitude: -6,
  maxLongitude: 65,
};

export const RADAR_COASTLINE_CLIP_REGIONS: readonly RadarCoverageBounds[] = [
  {
    minLatitude: 27.5,
    maxLatitude: 47.5,
    minLongitude: -9.5,
    maxLongitude: 39,
  },
  {
    minLatitude: 8.5,
    maxLatitude: 32.5,
    minLongitude: 29.5,
    maxLongitude: 46.5,
  },
  {
    minLatitude: -2,
    maxLatitude: 29.5,
    minLongitude: 41,
    maxLongitude: 80.5,
  },
] as const;

/**
 * Converts nautical miles into meters for Leaflet geometry and motion updates.
 */
export const nauticalMilesToMeters = (distanceNm: number): number => {
  return Math.max(0, distanceNm) * METERS_PER_NAUTICAL_MILE;
};

/**
 * Converts meters into nautical miles for radar readouts.
 */
export const metersToNauticalMiles = (distanceMeters: number): number => {
  return distanceMeters / METERS_PER_NAUTICAL_MILE;
};

/**
 * Converts knots into meters per second for animation updates.
 */
export const knotsToMetersPerSecond = (speedKnots: number): number => {
  return speedKnots * (METERS_PER_NAUTICAL_MILE / SECONDS_PER_HOUR);
};

/**
 * Clamps a geographic point to the supported maritime operating region.
 */
export const clampToCoverageBounds = (
  position: RadarGeoPosition,
  bounds: RadarCoverageBounds = RADAR_COVERAGE_BOUNDS
): RadarGeoPosition => {
  return {
    latitude: clamp(position.latitude, bounds.minLatitude, bounds.maxLatitude),
    longitude: clamp(position.longitude, bounds.minLongitude, bounds.maxLongitude),
  };
};

/**
 * Advances a latitude/longitude position by speed and course over elapsed time.
 */
export const advanceGeoPosition = (
  position: RadarGeoPosition,
  speedKnots: number,
  courseDeg: number,
  elapsedSeconds: number,
  bounds: RadarCoverageBounds = RADAR_COVERAGE_BOUNDS
): RadarGeoPosition => {
  if (!Number.isFinite(elapsedSeconds) || elapsedSeconds <= 0) {
    return clampToCoverageBounds(position, bounds);
  }

  const { vx: eastKnots, vy: northKnots } = decomposeVelocity(speedKnots, courseDeg);
  const eastMeters = knotsToMetersPerSecond(eastKnots) * elapsedSeconds;
  const northMeters = knotsToMetersPerSecond(northKnots) * elapsedSeconds;
  const latitudeRadians = position.latitude * DEGREES_TO_RADIANS;
  const metersPerLongitudeDegree = Math.max(
    METERS_PER_LATITUDE_DEGREE * Math.cos(latitudeRadians),
    LONGITUDE_COSINE_FLOOR
  );

  return clampToCoverageBounds(
    {
      latitude: position.latitude + (northMeters / METERS_PER_LATITUDE_DEGREE),
      longitude: position.longitude + (eastMeters / metersPerLongitudeDegree),
    },
    bounds
  );
};

/**
 * Calculates a great-circle distance between two geographic positions.
 */
export const calculateGeoDistanceMeters = (from: RadarGeoPosition, to: RadarGeoPosition): number => {
  const fromLatitudeRadians = from.latitude * DEGREES_TO_RADIANS;
  const toLatitudeRadians = to.latitude * DEGREES_TO_RADIANS;
  const deltaLatitudeRadians = (to.latitude - from.latitude) * DEGREES_TO_RADIANS;
  const deltaLongitudeRadians = (to.longitude - from.longitude) * DEGREES_TO_RADIANS;
  const haversine = (
    Math.sin(deltaLatitudeRadians / 2) ** 2
    + Math.cos(fromLatitudeRadians)
    * Math.cos(toLatitudeRadians)
    * Math.sin(deltaLongitudeRadians / 2) ** 2
  );

  return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};

/**
 * Calculates the true bearing from one position to another.
 */
export const calculateGeoBearingDeg = (from: RadarGeoPosition, to: RadarGeoPosition): number => {
  const fromLatitudeRadians = from.latitude * DEGREES_TO_RADIANS;
  const toLatitudeRadians = to.latitude * DEGREES_TO_RADIANS;
  const deltaLongitudeRadians = (to.longitude - from.longitude) * DEGREES_TO_RADIANS;
  const y = Math.sin(deltaLongitudeRadians) * Math.cos(toLatitudeRadians);
  const x = (
    Math.cos(fromLatitudeRadians) * Math.sin(toLatitudeRadians)
    - Math.sin(fromLatitudeRadians) * Math.cos(toLatitudeRadians) * Math.cos(deltaLongitudeRadians)
  );

  return normalizeBearing(Math.atan2(y, x) * RADIANS_TO_DEGREES);
};

/**
 * Projects a new geographic point from an origin, bearing, and range.
 */
export const calculateDestinationPoint = (
  origin: RadarGeoPosition,
  bearingDeg: number,
  distanceMeters: number,
  bounds: RadarCoverageBounds = RADAR_COVERAGE_BOUNDS
): RadarGeoPosition => {
  if (distanceMeters <= 0) {
    return clampToCoverageBounds(origin, bounds);
  }

  const angularDistance = distanceMeters / EARTH_RADIUS_METERS;
  const bearingRadians = normalizeBearing(bearingDeg) * DEGREES_TO_RADIANS;
  const originLatitudeRadians = origin.latitude * DEGREES_TO_RADIANS;
  const originLongitudeRadians = origin.longitude * DEGREES_TO_RADIANS;
  const destinationLatitudeRadians = Math.asin(
    Math.sin(originLatitudeRadians) * Math.cos(angularDistance)
    + Math.cos(originLatitudeRadians) * Math.sin(angularDistance) * Math.cos(bearingRadians)
  );
  const destinationLongitudeRadians = originLongitudeRadians + Math.atan2(
    Math.sin(bearingRadians) * Math.sin(angularDistance) * Math.cos(originLatitudeRadians),
    Math.cos(angularDistance) - Math.sin(originLatitudeRadians) * Math.sin(destinationLatitudeRadians)
  );

  return clampToCoverageBounds(
    {
      latitude: destinationLatitudeRadians * RADIANS_TO_DEGREES,
      longitude: destinationLongitudeRadians * RADIANS_TO_DEGREES,
    },
    bounds
  );
};

/**
 * Converts a world bearing into the displayed bearing for the radar map orientation mode.
 */
export const toRadarMapDisplayBearing = (
  bearingDeg: number,
  orientationMode: RadarMotionMode | 'north-up' | 'heading-up',
  headingDeg: number
): number => {
  const rotationOffset = orientationMode === 'heading-up' ? headingDeg : 0;
  return normalizeBearing(bearingDeg - rotationOffset);
};

/**
 * Calculates the projected motion vector endpoint for a target in TM or RM.
 */
export const calculateTargetVectorEndpoint = (
  target: RadarTargetState,
  ownShip: RadarOwnShipState,
  motionMode: RadarMotionMode,
  vectorTimeMinutes: number
) => {
  const vTarget = decomposeVelocity(target.speedKnots, target.courseDeg);
  const vOwn = decomposeVelocity(ownShip.speedKnots, ownShip.courseDeg);
  const relVel = calculateRelativeVelocity(vTarget, vOwn);
  const eastKnots = relVel.vx;
  const northKnots = relVel.vy;
  const relSpeedKnots = calculateRelativeSpeed(eastKnots, northKnots);
  const relCourseDeg = calculateRelativeCourse(eastKnots, northKnots);

  const relativeVelocity = {
    eastKnots,
    northKnots,
    speedKnots: relSpeedKnots,
    courseDeg: relCourseDeg,
  };

  const vectorSpeedKnots = motionMode === 'RM' ? relSpeedKnots : target.speedKnots;
  const vectorCourseDeg = motionMode === 'RM' ? relCourseDeg : target.courseDeg;
  const vectorDistanceMeters = nauticalMilesToMeters(vectorSpeedKnots * (vectorTimeMinutes / 60));

  return {
    relativeVelocity,
    vectorSpeedKnots,
    vectorCourseDeg,
    endpoint: calculateDestinationPoint(target, vectorCourseDeg, vectorDistanceMeters),
  };
};

/**
 * Formats a degree value as a three-digit radar label.
 */
export const formatRadarDegrees = (degrees: number): string => {
  return Math.round(normalizeBearing(degrees)).toString().padStart(3, '0');
};