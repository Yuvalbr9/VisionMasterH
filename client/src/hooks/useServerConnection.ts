import { useState, useEffect } from 'react';
import { getVesselMonitoringDataProvider, VesselMonitoringDataProvider } from '../api/vesselMonitoringService';

export const useServerConnection = (
  pingIntervalMs = 3000,
  provider: VesselMonitoringDataProvider = getVesselMonitoringDataProvider()
) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    const checkConnection = async () => {
      try {
        await provider.getEnvironment();
        if (isSubscribed) {
          setIsConnected(true);
        }
      } catch (err) {
        if (isSubscribed) {
          setIsConnected(false);
        }
      }
    };

    // Prevent immediate initial fetch clashing if not needed, but good to check on mount
    void checkConnection();

    const intervalId = setInterval(() => {
      void checkConnection();
    }, pingIntervalMs);

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
    };
  }, [pingIntervalMs, provider]);

  return { isConnected };
};
