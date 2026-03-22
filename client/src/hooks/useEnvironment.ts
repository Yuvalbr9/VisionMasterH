import { useCallback } from 'react';
import { Environment } from '../types/api';
import {
  getVesselMonitoringDataProvider,
  VesselMonitoringDataProvider,
} from '../api/vesselMonitoringService';
import { useAsyncResource } from './useAsyncResource';

interface UseEnvironmentResult {
  environment: Environment | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useEnvironment = (
  provider: VesselMonitoringDataProvider = getVesselMonitoringDataProvider()
): UseEnvironmentResult => {
  const fetcher = useCallback(() => provider.getEnvironment(), [provider]);
  const mapResponse = useCallback((response: Environment) => response, []);

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse,
    errorMessage: 'Failed to fetch environment conditions.',
  });

  return {
    environment: data,
    isLoading,
    error,
    refetch,
  };
};