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
