import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import {
  mockShipCourseData,
  mockShipPositionData,
  mockShipTimeData,
  mockShipWaveData,
} from './mockShipSidebarData';
import {
  ShipCourseApiResponse,
  ShipPositionApiResponse,
  ShipTimeApiResponse,
  ShipWaveApiResponse,
} from '../types/api';

const SIMULATED_NETWORK_DELAY_MS = 900;
const USE_MOCK_API = true;

export const shipApiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const getMockDataByPath = (path: string) => {
  switch (path) {
    case '/ship/course':
      return mockShipCourseData;
    case '/ship/pos':
      return mockShipPositionData;
    case '/ship/wave':
      return mockShipWaveData;
    case '/ship/time':
      return mockShipTimeData;
    default:
      throw new Error(`Unsupported mock API path: ${path}`);
  }
};

const mockAxiosGet = async <T>(path: string): Promise<T> => {
  const response = await new Promise<AxiosResponse<T>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: JSON.parse(JSON.stringify(getMockDataByPath(path))) as T,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: new AxiosHeaders() },
      });
    }, SIMULATED_NETWORK_DELAY_MS);
  });

  return response.data;
};

export const fetchShipCourse = async (): Promise<ShipCourseApiResponse> => {
  if (!USE_MOCK_API) {
    const response = await shipApiClient.get<ShipCourseApiResponse>('/ship/course');
    return response.data;
  }

  return mockAxiosGet<ShipCourseApiResponse>('/ship/course');
};

export const fetchShipPosition = async (): Promise<ShipPositionApiResponse> => {
  if (!USE_MOCK_API) {
    const response = await shipApiClient.get<ShipPositionApiResponse>('/ship/pos');
    return response.data;
  }

  return mockAxiosGet<ShipPositionApiResponse>('/ship/pos');
};

export const fetchShipWaveDirection = async (): Promise<ShipWaveApiResponse> => {
  if (!USE_MOCK_API) {
    const response = await shipApiClient.get<ShipWaveApiResponse>('/ship/wave');
    return response.data;
  }

  return mockAxiosGet<ShipWaveApiResponse>('/ship/wave');
};

export const fetchShipCurrentTime = async (): Promise<ShipTimeApiResponse> => {
  if (!USE_MOCK_API) {
    const response = await shipApiClient.get<ShipTimeApiResponse>('/ship/time');
    return response.data;
  }

  return mockAxiosGet<ShipTimeApiResponse>('/ship/time');
};
