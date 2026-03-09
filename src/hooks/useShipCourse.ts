import { useCallback } from 'react';
import { Angle } from 'unitsnet-js';
import { ShipCourseApiResponse } from '../types/api';
import { getShipSidebarDataProvider, ShipSidebarDataProvider } from '../api/shipSidebarService';
import { useAsyncResource } from './useAsyncResource';

interface UseShipCourseResult {
  shipCourse: Angle | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useShipCourse = (
  provider: ShipSidebarDataProvider = getShipSidebarDataProvider()
): UseShipCourseResult => {
  const fetcher = useCallback(() => provider.getShipCourse(), [provider]);
  const mapResponse = useCallback((response: ShipCourseApiResponse) => Angle.FromDegrees(response.shipCourse), []);

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse,
    errorMessage: 'Failed to fetch ship course.',
  });

  return {
    shipCourse: data,
    isLoading,
    error,
    refetch,
  };
};
