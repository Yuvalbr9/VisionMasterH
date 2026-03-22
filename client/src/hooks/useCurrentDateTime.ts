import { useCallback, useEffect, useState } from 'react';

interface UseCurrentDateTimeResult {
  currentDateTime: string | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCurrentDateTime = (): UseCurrentDateTimeResult => {
  const [currentDateTime, setCurrentDateTime] = useState<string>(() => new Date().toISOString());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentDateTime(new Date().toISOString());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const refetch = useCallback(async () => {
    setCurrentDateTime(new Date().toISOString());
  }, []);

  return {
    currentDateTime,
    isLoading: false,
    error: null,
    refetch,
  };
};
