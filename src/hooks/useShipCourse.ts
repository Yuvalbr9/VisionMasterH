import { useCallback, useEffect, useState } from 'react';
import { Angle } from 'unitsnet-js';
import { fetchShipCourse } from '../api/shipSidebarService';

interface UseShipCourseResult {
  shipCourse: Angle | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useShipCourse = (): UseShipCourseResult => {
  const [shipCourse, setShipCourse] = useState<Angle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchShipCourse();
      setShipCourse(Angle.FromDegrees(response.shipCourse));
    } catch {
      setError('Failed to fetch ship course.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    shipCourse,
    isLoading,
    error,
    refetch: load,
  };
};
