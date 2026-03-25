import { useCallback } from 'react';
import { Ownship } from '../types/api';
import {
  getVesselMonitoringDataProvider,
  VesselMonitoringDataProvider,
} from '../api/vesselMonitoringService';
import { useAsyncResource } from './useAsyncResource';

interface UseOwnshipResult {
  ownship: Ownship | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useOwnship = (
  provider: VesselMonitoringDataProvider = getVesselMonitoringDataProvider()
): UseOwnshipResult => {
  const fetcher = useCallback(() => provider.getOwnship(), [provider]);
  const mapResponse = useCallback((response: Ownship) => response, []);

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse,
    errorMessage: 'Failed to fetch ownship status.',
  });

  return {
    ownship: data,
    isLoading,
    error,
    refetch,
  };
};