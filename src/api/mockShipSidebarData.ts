import {
  ShipCourseApiResponse,
  ShipPositionApiResponse,
  ShipTimeApiResponse,
  ShipTargetsApiResponse,
  ShipWaveApiResponse,
} from '../types/api';

export const mockShipCourseData: ShipCourseApiResponse = {
  shipCourse: 194,
};

export const mockShipPositionData: ShipPositionApiResponse = {
  position: {
    lat: 3212.0,
    lon: 3414.4,
  },
};

export const mockShipWaveData: ShipWaveApiResponse = {
  relativeWaveDirection: 32.5,
};

export const mockShipTimeData: ShipTimeApiResponse = {
  currentDateTime: '2026-03-05T16:00:32+02:00',
};

export const mockShipTargetsData: ShipTargetsApiResponse = {
  targets: [
    {
      id: 'target-1',
      label: 'MV Carmel',
      lat: 3212.8,
      lon: 3315.2,
      speedKnots: 11.8,
      courseDeg: 226,
    },
  ],
};
