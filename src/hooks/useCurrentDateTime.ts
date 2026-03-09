import { useCallback } from 'react';
import { ShipTimeApiResponse } from '../types/api';
import { getShipSidebarDataProvider, ShipSidebarDataProvider } from '../api/shipSidebarService';
import { useAsyncResource } from './useAsyncResource';

interface UseCurrentDateTimeResult {
  currentDateTime: string | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCurrentDateTime = (
  provider: ShipSidebarDataProvider = getShipSidebarDataProvider()
): UseCurrentDateTimeResult => {
  const fetcher = useCallback(() => provider.getShipCurrentTime(), [provider]);
  const mapResponse = useCallback((response: ShipTimeApiResponse) => response.currentDateTime, []);

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse,
    errorMessage: 'Failed to fetch ship time.',
  });

  return {
    currentDateTime: data,
    isLoading,
    error,
    refetch,
  };
};
