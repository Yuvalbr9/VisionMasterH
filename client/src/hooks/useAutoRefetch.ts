import { useEffect, useRef } from 'react';

export const useAutoRefetch = (isConnected: boolean, refetchFn: () => void | Promise<void>) => {
  const prevConnected = useRef(isConnected);

  useEffect(() => {
    if (!prevConnected.current && isConnected) {
      void refetchFn();
    }
    prevConnected.current = isConnected;
  }, [isConnected, refetchFn]);
};
