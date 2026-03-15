import { useCallback } from 'react';
import { getShipSidebarDataProvider, ShipSidebarDataProvider } from '../api/shipSidebarService';
import { RadarTargetState } from '../types';
import { ShipTargetsApiResponse } from '../types/api';
import { parseCoordinate } from '../util';
import { useAsyncResource } from './useAsyncResource';

interface UseRadarTargetsResult {
  targets: RadarTargetState[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const mapShipTargetRecord = (responseTarget: ShipTargetsApiResponse['targets'][number], index: number): RadarTargetState => {
  return {
    id: responseTarget.id || `target-${index + 1}`,
    label: responseTarget.label || `Target ${index + 1}`,
    latitude: parseCoordinate(responseTarget.lat, 'lat').Degrees,
    longitude: parseCoordinate(responseTarget.lon, 'lon').Degrees,
    speedKnots: responseTarget.speedKnots,
    courseDeg: responseTarget.courseDeg,
  };
};

const mapShipTargetsResponse = (response: ShipTargetsApiResponse): RadarTargetState[] => {
  return response.targets.map(mapShipTargetRecord);
};

export const useRadarTargets = (
  provider: ShipSidebarDataProvider = getShipSidebarDataProvider()
): UseRadarTargetsResult => {
  const fetcher = useCallback(() => provider.getShipTargets(), [provider]);

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse: mapShipTargetsResponse,
    errorMessage: 'Failed to fetch radar targets.',
  });

  return {
    targets: data ?? [],
    isLoading,
    error,
    refetch,
  };
};