import { RadarGeoPosition } from '../../types';

export interface RadarContextMenuState {
  x: number;
  y: number;
  position: RadarGeoPosition;
}

export interface RadarPlatformInfoState {
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  variant?: 'target-preview';
  lines: string[];
}

export interface RadarFrameSize {
  width: number;
  height: number;
}