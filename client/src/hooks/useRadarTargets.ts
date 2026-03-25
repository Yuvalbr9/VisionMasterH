import { useCallback } from 'react';
import {
  getVesselMonitoringDataProvider,
  VesselMonitoringDataProvider,
} from '../api/vesselMonitoringService';
import { RadarTargetState } from '../types';
import { Target } from '../types/api';
import { useAsyncResource } from './useAsyncResource';

interface UseRadarTargetsResult {
  targets: RadarTargetState[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const mapTargetRecord = (responseTarget: Target): RadarTargetState => {
  return {
    id: `target-${responseTarget.targetId}`,
    label: `Target ${responseTarget.targetId}`,
    latitude: responseTarget.position.latitude,
    longitude: responseTarget.position.longitude,
    speedKnots: responseTarget.speedOverGround,
    courseDeg: responseTarget.courseOverGround,
    relativeSpeedKnots: responseTarget.relativeSpeed,
    relativeCourseDeg: responseTarget.relativeCourse,
    dimensions: responseTarget.dimensions,
  };
};

const mapTargetsResponse = (response: Target[]): RadarTargetState[] => {
  return response.map(mapTargetRecord);
};

export const useRadarTargets = (
  provider: VesselMonitoringDataProvider = getVesselMonitoringDataProvider()
): UseRadarTargetsResult => {
  const fetcher = useCallback(() => provider.getTargets(), [provider]);

  const { data, isLoading, error, refetch } = useAsyncResource({
    fetcher,
    mapResponse: mapTargetsResponse,
    errorMessage: 'Failed to fetch tracked targets.',
  });

  return {
    targets: data ?? [],
    isLoading,
    error,
    refetch,
  };
};