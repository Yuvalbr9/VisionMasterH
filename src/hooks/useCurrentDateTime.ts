import { useCallback, useEffect, useState } from 'react';
import { fetchShipCurrentTime } from '../api/shipSidebarService';

interface UseCurrentDateTimeResult {
  currentDateTime: string | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCurrentDateTime = (): UseCurrentDateTimeResult => {
  const [currentDateTime, setCurrentDateTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchShipCurrentTime();
      setCurrentDateTime(response.currentDateTime);
    } catch {
      setError('Failed to fetch ship time.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    currentDateTime,
    isLoading,
    error,
    refetch: load,
  };
};
