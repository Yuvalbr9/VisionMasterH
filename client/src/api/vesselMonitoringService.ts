import axios, { AxiosInstance } from 'axios';
import {
  Environment,
  EnvironmentApiResponse,
  Ownship,
  OwnshipApiResponse,
  Target,
  TargetApiRecord,
} from '../types/api';

export interface VesselMonitoringDataProvider {
  getEnvironment: () => Promise<Environment>;
  getTargets: () => Promise<Target[]>;
  getOwnship: () => Promise<Ownship>;
}

interface CreateVesselMonitoringDataProviderOptions {
  client?: AxiosInstance;
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
    velocityNorth: record.velocityNorth,
    velocityEast: record.velocityEast,
    courseOverGround: record.courseOverGround,
    speedOverGround: record.speedOverGround,
    relativeVelocityNorth: record.relativeVelocityNorth,
    relativeVelocityEast: record.relativeVelocityEast,
    relativeSpeed: record.relativeSpeed,
    relativeCourse: record.relativeCourse,
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
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL ?? '/api/v1',
  timeout: 10000,
});

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

export const createVesselMonitoringDataProvider = (
  options: CreateVesselMonitoringDataProviderOptions = {}
): VesselMonitoringDataProvider => {
  const { client = vesselApiClient } = options;
  return createHttpVesselMonitoringDataProvider(client);
};

let activeVesselMonitoringDataProvider: VesselMonitoringDataProvider = createVesselMonitoringDataProvider();

export const getVesselMonitoringDataProvider = (): VesselMonitoringDataProvider => {
  return activeVesselMonitoringDataProvider;
};

export const setVesselMonitoringDataProvider = (provider: VesselMonitoringDataProvider): void => {
  activeVesselMonitoringDataProvider = provider;
};