import axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios';
import {
  mockShipCourseData,
  mockShipPositionData,
  mockShipTimeData,
  mockShipTargetsData,
  mockShipWaveData,
} from './mockShipSidebarData';
import {
  ShipCourseApiResponse,
  ShipPositionApiResponse,
  ShipTimeApiResponse,
  ShipTargetsApiResponse,
  ShipWaveApiResponse,
} from '../types/api';

const SIMULATED_NETWORK_DELAY_MS = 900;
const DEFAULT_PROVIDER_MODE: SidebarProviderMode = 'mock';

export type SidebarProviderMode = 'mock' | 'http';

export interface ShipSidebarDataProvider {
  getShipCourse: () => Promise<ShipCourseApiResponse>;
  getShipPosition: () => Promise<ShipPositionApiResponse>;
  getShipWaveDirection: () => Promise<ShipWaveApiResponse>;
  getShipCurrentTime: () => Promise<ShipTimeApiResponse>;
  getShipTargets: () => Promise<ShipTargetsApiResponse>;
}

interface CreateShipSidebarDataProviderOptions {
  mode?: SidebarProviderMode;
  client?: AxiosInstance;
  simulatedNetworkDelayMs?: number;
}

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
    case '/ship/targets':
      return mockShipTargetsData;
    default:
      throw new Error(`Unsupported mock API path: ${path}`);
  }
};

const mockAxiosGet = async <T>(path: string, simulatedNetworkDelayMs: number): Promise<T> => {
  const response = await new Promise<AxiosResponse<T>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: JSON.parse(JSON.stringify(getMockDataByPath(path))) as T,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: new AxiosHeaders() },
      });
    }, simulatedNetworkDelayMs);
  });

  return response.data;
};

const createHttpShipSidebarDataProvider = (client: AxiosInstance = shipApiClient): ShipSidebarDataProvider => ({
  getShipCourse: async () => {
    const response = await client.get<ShipCourseApiResponse>('/ship/course');
    return response.data;
  },
  getShipPosition: async () => {
    const response = await client.get<ShipPositionApiResponse>('/ship/pos');
    return response.data;
  },
  getShipWaveDirection: async () => {
    const response = await client.get<ShipWaveApiResponse>('/ship/wave');
    return response.data;
  },
  getShipCurrentTime: async () => {
    const response = await client.get<ShipTimeApiResponse>('/ship/time');
    return response.data;
  },
  getShipTargets: async () => {
    const response = await client.get<ShipTargetsApiResponse>('/ship/targets');
    return response.data;
  },
});

const createMockShipSidebarDataProvider = (
  simulatedNetworkDelayMs: number = SIMULATED_NETWORK_DELAY_MS
): ShipSidebarDataProvider => ({
  getShipCourse: () => mockAxiosGet<ShipCourseApiResponse>('/ship/course', simulatedNetworkDelayMs),
  getShipPosition: () => mockAxiosGet<ShipPositionApiResponse>('/ship/pos', simulatedNetworkDelayMs),
  getShipWaveDirection: () => mockAxiosGet<ShipWaveApiResponse>('/ship/wave', simulatedNetworkDelayMs),
  getShipCurrentTime: () => mockAxiosGet<ShipTimeApiResponse>('/ship/time', simulatedNetworkDelayMs),
  getShipTargets: () => mockAxiosGet<ShipTargetsApiResponse>('/ship/targets', simulatedNetworkDelayMs),
});

export const createShipSidebarDataProvider = (
  options: CreateShipSidebarDataProviderOptions = {}
): ShipSidebarDataProvider => {
  const {
    mode = DEFAULT_PROVIDER_MODE,
    client = shipApiClient,
    simulatedNetworkDelayMs = SIMULATED_NETWORK_DELAY_MS,
  } = options;

  if (mode === 'http') {
    return createHttpShipSidebarDataProvider(client);
  }

  return createMockShipSidebarDataProvider(simulatedNetworkDelayMs);
};

let activeShipSidebarDataProvider: ShipSidebarDataProvider = createShipSidebarDataProvider();

export const getShipSidebarDataProvider = (): ShipSidebarDataProvider => {
  return activeShipSidebarDataProvider;
};

export const setShipSidebarDataProvider = (provider: ShipSidebarDataProvider): void => {
  activeShipSidebarDataProvider = provider;
};

export const fetchShipCourse = async (): Promise<ShipCourseApiResponse> => {
  return activeShipSidebarDataProvider.getShipCourse();
};

export const fetchShipPosition = async (): Promise<ShipPositionApiResponse> => {
  return activeShipSidebarDataProvider.getShipPosition();
};

export const fetchShipWaveDirection = async (): Promise<ShipWaveApiResponse> => {
  return activeShipSidebarDataProvider.getShipWaveDirection();
};

export const fetchShipCurrentTime = async (): Promise<ShipTimeApiResponse> => {
  return activeShipSidebarDataProvider.getShipCurrentTime();
};

export const fetchShipTargets = async (): Promise<ShipTargetsApiResponse> => {
  return activeShipSidebarDataProvider.getShipTargets();
};
