import {
  EnvironmentApiResponse,
  OwnshipApiResponse,
  TargetApiRecord,
} from '../types/api';

export const mockEnvironmentApiResponse: EnvironmentApiResponse = {
  rainLevel: 'medium',
  waveDirection: 180,
  seaState: 4,
};

export const mockTargetsApiResponse: TargetApiRecord[] = [
  {
    targetId: 101,
    position: {
      latitude: 32.0853,
      longitude: 34.7818,
    },
    dimensions: {
      length: 15.5,
      width: 4.2,
      height: 3.0,
    },
    heading: 45,
  },
  {
    targetId: 202,
    position: {
      latitude: 32.0989,
      longitude: 34.7657,
    },
    dimensions: {
      length: 28.0,
      width: 6.4,
      height: 8.6,
    },
    heading: 121,
  },
  {
    targetId: 303,
    position: {
      latitude: 32.0641,
      longitude: 34.7922,
    },
    dimensions: {
      length: 42.3,
      width: 9.1,
      height: 12.5,
    },
    heading: 312,
  },
];

export const mockOwnshipApiResponse: OwnshipApiResponse = {
  ownship: {
    targetId: 1,
    position: {
      latitude: 32.0735,
      longitude: 34.7750,
    },
    dimensions: {
      length: 22.0,
      width: 5.5,
      height: 4.0,
    },
    heading: 90,
  },
};