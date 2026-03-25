import type { LatLngBoundsExpression } from 'leaflet';
import { UI_VALUES as UiValues } from '../../constants';

export type RadarContextMenuAction = 'acquire-target' | 'position-ebl-vrm' | 'center-off' | 'draw-pen';

export interface RadarContextMenuItem {
  id: RadarContextMenuAction;
  label: string;
}

export const OverlayViewportPaddingPx = 12;
export const OverlayCursorOffsetPx = 10;
export const ContextMenuEstimatedWidthPx = 196;
export const ContextMenuEstimatedHeightPx = 188;
export const PlatformInfoEstimatedWidthPx = 150;
export const PlatformInfoEstimatedHeightPx = 112;
export const RadarScaleEdgeInsetPx = 2;
export const RadarScaleBandPx = 26;
export const RadarContentInsetPx = RadarScaleEdgeInsetPx + RadarScaleBandPx;

export const RadarMenuItems: readonly RadarContextMenuItem[] = [
  { id: 'acquire-target', label: 'Acquire Target' },
  { id: 'position-ebl-vrm', label: 'EBL / VRM Position' },
  { id: 'center-off', label: 'Pulse Center' },
  { id: 'draw-pen', label: 'Draw Pen' },
] as const;

export const RadarMapBounds: LatLngBoundsExpression = [
  [10, -6],
  [46, 65],
];

export const LeafletMaxZoom = 12;
export const LeafletMinZoom = 3;
export const RadarCenterUpdateThresholdMeters = 5;
export const RangeWheelDeltaThreshold = 48;
export const TargetAcquisitionGateMeters = 4_000;
export const RadarRangeStepsNm = UiValues.RANGE_CONTROLS.RANGE_STEPS_NM;
export const RadarZoomLevels = [
  { rangeNm: 3, zoom: 11 },
  { rangeNm: 6, zoom: 10 },
  { rangeNm: 12, zoom: 9 },
  { rangeNm: 24, zoom: 8 },
  { rangeNm: 48, zoom: 7 },
  { rangeNm: 96, zoom: 6 },
  { rangeNm: 192, zoom: 5 },
] as const;