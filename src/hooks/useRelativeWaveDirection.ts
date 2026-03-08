import { useCallback, useEffect, useState } from 'react';
import { Angle } from 'unitsnet-js';
import { fetchShipWaveDirection } from '../api/shipSidebarService';

interface UseRelativeWaveDirectionResult {
  relativeWaveDirection: Angle | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRelativeWaveDirection = (): UseRelativeWaveDirectionResult => {
  const [relativeWaveDirection, setRelativeWaveDirection] = useState<Angle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchShipWaveDirection();
      setRelativeWaveDirection(Angle.FromDegrees(response.relativeWaveDirection));
    } catch {
      setError('Failed to fetch relative wave direction.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    relativeWaveDirection,
    isLoading,
    error,
    refetch: load,
  };
};
