import L from 'leaflet';
import { RadarGeoPosition } from '../../types';
import {
  OverlayCursorOffsetPx,
  OverlayViewportPaddingPx,
  RadarContentInsetPx,
  RadarRangeStepsNm,
  RadarZoomLevels,
} from './radarMapConstants';

/**
 * Returns the SVG point for a radar bearing using 000 at the top of the display.
 */
export const getRadarSvgPoint = (centerX: number, centerY: number, radius: number, bearingDeg: number) => {
  const radians = (bearingDeg * Math.PI) / 180;

  return {
    x: centerX + Math.sin(radians) * radius,
    y: centerY - Math.cos(radians) * radius,
  };
};

/**
 * Resolves the closest supported radar range step for the current viewport scale.
 */
export const getNearestRadarRangeStepIndex = (rangeNm: number) => {
  let nearestIndex = 0;
  let nearestDistance = Infinity;

  RadarRangeStepsNm.forEach((stepRangeNm, index) => {
    const distance = Math.abs(stepRangeNm - rangeNm);

    if (distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  });

  return nearestIndex;
};

/**
 * Steps the radar range to the next supported value while preserving bounds.
 */
export const getSteppedRadarRange = (rangeNm: number, offset: -1 | 1) => {
  const currentIndex = getNearestRadarRangeStepIndex(rangeNm);
  const nextIndex = Math.min(
    RadarRangeStepsNm.length - 1,
    Math.max(0, currentIndex + offset)
  );

  return RadarRangeStepsNm[nextIndex];
};

/**
 * Formats range labels consistently across zoom controls and status messages.
 */
export const formatRadarRangeLabel = (rangeNm: number) => {
  return rangeNm < 1 ? rangeNm.toFixed(1) : rangeNm.toFixed(0);
};

/**
 * Resolves the matching discrete radar zoom level for the current range.
 */
export const getNearestRadarZoomLevelIndex = (rangeNm: number) => {
  let nearestIndex = 0;
  let nearestDistance = Infinity;

  RadarZoomLevels.forEach((zoomLevel, index) => {
    const distance = Math.abs(zoomLevel.rangeNm - rangeNm);

    if (distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  });

  return nearestIndex;
};

/**
 * Maps the radar range model to the configured Leaflet zoom level.
 */
export const getLeafletZoomForRange = (rangeNm: number) => {
  return RadarZoomLevels[getNearestRadarZoomLevelIndex(rangeNm)].zoom;
};

/**
 * Limits wheel-driven zooming to the visible radar circle, excluding the clipped corners.
 */
export const isPointWithinRadarCircle = (element: HTMLDivElement, clientX: number, clientY: number) => {
  const bounds = element.getBoundingClientRect();
  const radius = Math.min(bounds.width, bounds.height) / 2 - RadarContentInsetPx;
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  return Math.hypot(clientX - centerX, clientY - centerY) <= radius;
};

/**
 * Applies the current radar center and range to the underlying Leaflet map.
 */
export const setRadarView = (map: L.Map, center: RadarGeoPosition, rangeNm: number, animate: boolean = false) => {
  const zoomLevel = getLeafletZoomForRange(rangeNm);
  const targetCenter: L.LatLngExpression = [center.latitude, center.longitude];

  if (animate) {
    map.flyTo(targetCenter, zoomLevel, { duration: 0.35 });
    return;
  }

  map.setView(targetCenter, zoomLevel, { animate: false });
};

export const createRadarAnnotationId = (prefix: string) => {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10_000)}`;
};

export const clampOverlayViewportPosition = (
  x: number,
  y: number,
  width: number,
  height: number,
  offsetX: number = OverlayCursorOffsetPx,
  offsetY: number = OverlayCursorOffsetPx
) => {
  if (typeof window === 'undefined') {
    return { x: x + offsetX, y: y + offsetY };
  }

  const desiredX = x + offsetX;
  const desiredY = y + offsetY;
  const maxX = Math.max(OverlayViewportPaddingPx, window.innerWidth - width - OverlayViewportPaddingPx);
  const maxY = Math.max(OverlayViewportPaddingPx, window.innerHeight - height - OverlayViewportPaddingPx);

  return {
    x: Math.min(Math.max(OverlayViewportPaddingPx, desiredX), maxX),
    y: Math.min(Math.max(OverlayViewportPaddingPx, desiredY), maxY),
  };
};