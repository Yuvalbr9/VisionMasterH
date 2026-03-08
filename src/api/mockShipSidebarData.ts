import {
  ShipCourseApiResponse,
  ShipPositionApiResponse,
  ShipTimeApiResponse,
  ShipWaveApiResponse,
} from '../types/api';

export const mockShipCourseData: ShipCourseApiResponse = {
  shipCourse: 194,
};

export const mockShipPositionData: ShipPositionApiResponse = {
  position: {
    lat: 4027.269,
    lon: -7349.49,
  },
};

export const mockShipWaveData: ShipWaveApiResponse = {
  relativeWaveDirection: 32.5,
};

export const mockShipTimeData: ShipTimeApiResponse = {
  currentDateTime: '2026-03-05T16:00:32+02:00',
};
