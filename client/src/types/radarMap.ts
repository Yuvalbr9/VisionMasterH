export type RadarMotionMode = 'RM' | 'TM';

export type RadarOrientationMode = 'north-up' | 'heading-up';

export interface RadarGeoPosition {
  latitude: number;
  longitude: number;
}

export interface RadarCoverageBounds {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
}

export interface RadarOwnShipState extends RadarGeoPosition {
  id: string;
  label?: string;
  speedKnots: number;
  courseDeg: number;
  headingDeg: number;
}

export interface RadarTargetState extends RadarGeoPosition {
  id: string;
  label: string;
  speedKnots: number;
  courseDeg: number;
  relativeSpeedKnots: number;
  relativeCourseDeg: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface RadarRelativeVelocity {
  eastKnots: number;
  northKnots: number;
  speedKnots: number;
  courseDeg: number;
}

export interface RadarAnnotationPoint extends RadarGeoPosition {
  id: string;
  kind: 'pen' | 'goto';
}