import { useCallback } from 'react';
import { Angle } from 'unitsnet-js';
import { ShipPositionApiResponse } from '../types/api';
import { getShipSidebarDataProvider, ShipSidebarDataProvider } from '../api/shipSidebarService';
import { parseCoordinate } from '../util';
import { useAsyncResource } from './useAsyncResource';

interface ShipPositionValue {
  lat: Angle;
  lon: Angle;
}

interface UseShipPositionResult {
  position: ShipPositionValue | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useShipPosition = (
  provider: ShipSidebarDataProvider = getShipSidebarDataProvider()
): UseShipPositionResult => {
  const fetcher = useCallback(() => provider.getShipPosition(), [provider]);
  const mapResponse = useCallback(
    (response: ShipPositionApiResponse): ShipPositionValue => ({
      lat: parseCoordinate(response.position.lat, 'lat'),
      lon: parseCoordinate(response.position.lon, 'lon'),
    }),
    []
  );

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse,
    errorMessage: 'Failed to fetch ship position.',
  });

  return {
    position: data,
    isLoading,
    error,
    refetch,
  };
};
