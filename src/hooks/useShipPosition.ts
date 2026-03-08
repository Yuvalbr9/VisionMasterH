import { useCallback, useEffect, useState } from 'react';
import { Angle } from 'unitsnet-js';
import { fetchShipPosition } from '../api/shipSidebarService';
import { parseLatitude, parseLongitude } from '../types';

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

const parseNumericCoordinate = (value: number, kind: 'lat' | 'lon'): Angle => {
  const absValue = Math.abs(value);
  const decimalLimit = kind === 'lat' ? 90 : 180;

  if (absValue <= decimalLimit) {
    return Angle.FromDegrees(value);
  }

  const sign = value < 0 ? -1 : 1;
  const degrees = Math.floor(absValue / 100);
  const minutes = absValue - degrees * 100;
  const decimalDegrees = degrees + minutes / 60;

  return Angle.FromDegrees(sign * decimalDegrees);
};

export const useShipPosition = (): UseShipPositionResult => {
  const [position, setPosition] = useState<ShipPositionValue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const parseCoordinate = (value: string | number, kind: 'lat' | 'lon'): Angle => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return parseNumericCoordinate(value, kind);
    }

    const coordinate = String(value);

    if (!/[NSEW°']/.test(coordinate)) {
      const numericValue = Number(coordinate);
      if (Number.isFinite(numericValue)) {
        return parseNumericCoordinate(numericValue, kind);
      }
    }

    return kind === 'lat' ? parseLatitude(coordinate) : parseLongitude(coordinate);
  };

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchShipPosition();
      setPosition({
        lat: parseCoordinate(response.position.lat, 'lat'),
        lon: parseCoordinate(response.position.lon, 'lon'),
      });
    } catch {
      setError('Failed to fetch ship position.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    position,
    isLoading,
    error,
    refetch: load,
  };
};
