export type RainLevel = 'none' | 'light' | 'medium' | 'heavy';

export interface TargetPosition {
  latitude: number;
  longitude: number;
}

export interface TargetDimensions {
  length: number;
  width: number;
  height: number;
}

export interface TargetApiRecord {
  targetId: number;
  position: TargetPosition;
  dimensions: TargetDimensions;
  heading: number;
}

export interface EnvironmentApiResponse {
  rainLevel: RainLevel;
  waveDirection: number;
  seaState: number;
}

export interface OwnshipApiResponse {
  ownship: TargetApiRecord;
}

export interface Environment {
  rainLevel: RainLevel;
  waveDirection: number;
  seaState: number;
}

export interface Target {
  targetId: number;
  position: TargetPosition;
  dimensions: TargetDimensions;
  heading: number;
}

export type Ownship = Target;
