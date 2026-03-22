import axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios';
import {
  mockEnvironmentApiResponse,
  mockOwnshipApiResponse,
  mockTargetsApiResponse,
} from './mockVesselMonitoringData';
import {
  Environment,
  EnvironmentApiResponse,
  Ownship,
  OwnshipApiResponse,
  Target,
  TargetApiRecord,
} from '../types/api';

const SIMULATED_NETWORK_DELAY_MS = 300;
const DEFAULT_PROVIDER_MODE: VesselMonitoringProviderMode = 'http';

export type VesselMonitoringProviderMode = 'mock' | 'http';

export interface VesselMonitoringDataProvider {
  getEnvironment: () => Promise<Environment>;
  getTargets: () => Promise<Target[]>;
  getOwnship: () => Promise<Ownship>;
}

interface CreateVesselMonitoringDataProviderOptions {
  mode?: VesselMonitoringProviderMode;
  client?: AxiosInstance;
  simulatedNetworkDelayMs?: number;
}

const mapTargetRecord = (record: TargetApiRecord): Target => {
  return {
    targetId: record.targetId,
    position: {
      latitude: record.position.latitude,
      longitude: record.position.longitude,
    },
    dimensions: {
      length: record.dimensions.length,
      width: record.dimensions.width,
      height: record.dimensions.height,
    },
    heading: record.heading,
  };
};

const mapEnvironmentResponse = (response: EnvironmentApiResponse): Environment => {
  return {
    rainLevel: response.rainLevel,
    waveDirection: response.waveDirection,
    seaState: response.seaState,
  };
};

const mapOwnshipResponse = (response: OwnshipApiResponse): Ownship => {
  return mapTargetRecord(response.ownship);
};

export const vesselApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  timeout: 10000,
});

const getMockDataByPath = (path: string) => {
  switch (path) {
    case '/environment':
      return mockEnvironmentApiResponse;
    case '/targets':
      return mockTargetsApiResponse;
    case '/ownship':
      return mockOwnshipApiResponse;
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

const createHttpVesselMonitoringDataProvider = (
  client: AxiosInstance = vesselApiClient
): VesselMonitoringDataProvider => ({
  getEnvironment: async () => {
    const response = await client.get<EnvironmentApiResponse>('/environment');
    return mapEnvironmentResponse(response.data);
  },
  getTargets: async () => {
    const response = await client.get<TargetApiRecord[]>('/targets');
    return response.data.map(mapTargetRecord);
  },
  getOwnship: async () => {
    const response = await client.get<OwnshipApiResponse>('/ownship');
    return mapOwnshipResponse(response.data);
  },
});

const createMockVesselMonitoringDataProvider = (
  simulatedNetworkDelayMs: number = SIMULATED_NETWORK_DELAY_MS
): VesselMonitoringDataProvider => ({
  getEnvironment: async () => {
    const response = await mockAxiosGet<EnvironmentApiResponse>('/environment', simulatedNetworkDelayMs);
    return mapEnvironmentResponse(response);
  },
  getTargets: async () => {
    const response = await mockAxiosGet<TargetApiRecord[]>('/targets', simulatedNetworkDelayMs);
    return response.map(mapTargetRecord);
  },
  getOwnship: async () => {
    const response = await mockAxiosGet<OwnshipApiResponse>('/ownship', simulatedNetworkDelayMs);
    return mapOwnshipResponse(response);
  },
});

export const createVesselMonitoringDataProvider = (
  options: CreateVesselMonitoringDataProviderOptions = {}
): VesselMonitoringDataProvider => {
  const {
    mode = DEFAULT_PROVIDER_MODE,
    client = vesselApiClient,
    simulatedNetworkDelayMs = SIMULATED_NETWORK_DELAY_MS,
  } = options;

  if (mode === 'http') {
    return createHttpVesselMonitoringDataProvider(client);
  }

  return createMockVesselMonitoringDataProvider(simulatedNetworkDelayMs);
};

let activeVesselMonitoringDataProvider: VesselMonitoringDataProvider = createVesselMonitoringDataProvider();

export const getVesselMonitoringDataProvider = (): VesselMonitoringDataProvider => {
  return activeVesselMonitoringDataProvider;
};

export const setVesselMonitoringDataProvider = (provider: VesselMonitoringDataProvider): void => {
  activeVesselMonitoringDataProvider = provider;
};