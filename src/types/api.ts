export interface ShipCourseApiResponse {
  shipCourse: number;
}

export interface ShipPositionApiResponse {
  position: {
    lat: number | string;
    lon: number | string;
  };
}

export interface ShipWaveApiResponse {
  relativeWaveDirection: number;
}

export interface ShipTimeApiResponse {
  currentDateTime: string;
}

export interface ShipTargetApiRecord {
  id: string;
  label: string;
  lat: number | string;
  lon: number | string;
  speedKnots: number;
  courseDeg: number;
}

export interface ShipTargetsApiResponse {
  targets: ShipTargetApiRecord[];
}
