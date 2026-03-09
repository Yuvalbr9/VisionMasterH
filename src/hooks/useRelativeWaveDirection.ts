import { useCallback } from 'react';
import { Angle } from 'unitsnet-js';
import { ShipWaveApiResponse } from '../types/api';
import { getShipSidebarDataProvider, ShipSidebarDataProvider } from '../api/shipSidebarService';
import { useAsyncResource } from './useAsyncResource';

interface UseRelativeWaveDirectionResult {
  relativeWaveDirection: Angle | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRelativeWaveDirection = (
  provider: ShipSidebarDataProvider = getShipSidebarDataProvider()
): UseRelativeWaveDirectionResult => {
  const fetcher = useCallback(() => provider.getShipWaveDirection(), [provider]);
  const mapResponse = useCallback(
    (response: ShipWaveApiResponse) => Angle.FromDegrees(response.relativeWaveDirection),
    []
  );

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse,
    errorMessage: 'Failed to fetch relative wave direction.',
  });

  return {
    relativeWaveDirection: data,
    isLoading,
    error,
    refetch,
  };
};
