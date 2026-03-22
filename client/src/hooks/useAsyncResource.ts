import { useCallback, useEffect, useState } from 'react';

interface UseAsyncResourceParams<TRaw, TData> {
  fetcher: () => Promise<TRaw>;
  mapResponse: (raw: TRaw) => TData;
  errorMessage: string;
}

interface UseAsyncResourceResult<TData> {
  data: TData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAsyncResource = <TRaw, TData>({
  fetcher,
  mapResponse,
  errorMessage,
}: UseAsyncResourceParams<TRaw, TData>): UseAsyncResourceResult<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetcher();
      setData(mapResponse(response));
    } catch {
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [errorMessage, fetcher, mapResponse]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    refetch: load,
  };
};
