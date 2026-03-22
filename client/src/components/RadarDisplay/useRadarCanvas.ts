import { useEffect, useRef } from 'react';
import { ARPATarget, NavigationData, RadarControlState, RadarSelectedPoint } from '../../types';
import { drawRangeRings } from './RangeRings';
import { drawDegreeRing } from './DegreeRing';
import { drawHeadingLine } from './HeadingLine';
import { drawEchoLayer } from './EchoLayer';
import { drawEbl } from './EBLComponent';
import { drawVrm } from './VRMComponent';
import { drawArpaTargetLayer } from './ARPATargetLayer';
import { fromDisplayBearing, normalizeBearing, polarToCanvas, rangeNmToPixels, toDisplayBearing } from './drawTypes';

const PICK_MARKER_OUTER_RADIUS_PX = 4.5;
const PICK_MARKER_HIT_RADIUS_PX = 11;

interface RadarGeometry {
  cssWidth: number;
  cssHeight: number;
  centerX: number;
  centerY: number;
  maxRadius: number;
}

const getRadarGeometry = (canvas: HTMLCanvasElement): RadarGeometry => {
  const bounds = canvas.getBoundingClientRect();
  const cssWidth = Math.max(220, Math.floor(bounds.width || canvas.clientWidth || 720));
  const cssHeight = Math.max(220, Math.floor(bounds.height || canvas.clientHeight || cssWidth));
  const centerX = cssWidth / 2;
  const centerY = cssHeight / 2;
  const edgePadding = Math.max(18, Math.min(34, Math.round(Math.min(cssWidth, cssHeight) * 0.055)));
  const maxRadius = Math.min(centerX, centerY) - edgePadding;

  return {
    cssWidth,
    cssHeight,
    centerX,
    centerY,
    maxRadius,
  };
};

const toRadarPointFromCanvasCoordinates = (
  x: number,
  y: number,
  geometry: RadarGeometry,
  navData: NavigationData,
  controls: RadarControlState
): RadarSelectedPoint | null => {
  const { centerX, centerY, maxRadius } = geometry;
  if (maxRadius <= 0 || controls.selectedRangeNm <= 0) {
    return null;
  }

  const dx = x - centerX;
  const dy = y - centerY;
  const distancePx = Math.hypot(dx, dy);

  // Ignore selections outside the radar circle.
  if (distancePx > maxRadius) {
    return null;
  }

  const displayBearingDeg = normalizeBearing((Math.atan2(dx, -dy) * 180) / Math.PI);
  const worldBearingDeg = fromDisplayBearing(displayBearingDeg, navData, controls);
  const rangeRatio = Math.max(0, Math.min(1, distancePx / maxRadius));

  return {
    bearingDeg: worldBearingDeg,
    rangeNm: rangeRatio * controls.selectedRangeNm,
  };
};

const findMarkerIndexAtCanvasPosition = (
  x: number,
  y: number,
  geometry: RadarGeometry,
  selectedPoints: RadarSelectedPoint[],
  navData: NavigationData,
  controls: RadarControlState
): number => {
  const { centerX, centerY, maxRadius } = geometry;
  let nearestIndex = -1;
  let nearestDistance = Number.POSITIVE_INFINITY;

  selectedPoints.forEach((point, index) => {
    const displayBearing = toDisplayBearing(point.bearingDeg, navData, controls);
    const rangePx = rangeNmToPixels(point.rangeNm, maxRadius, controls.selectedRangeNm);
    const marker = polarToCanvas(centerX, centerY, rangePx, displayBearing);
    const distance = Math.hypot(x - marker.x, y - marker.y);

    if (distance <= PICK_MARKER_HIT_RADIUS_PX && distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
};

interface UseRadarCanvasParams {
  navData: NavigationData;
  controls: RadarControlState;
  arpaTargets: ARPATarget[];
  pointPickerActive: boolean;
  selectedPoints: RadarSelectedPoint[];
  onPointAdded: (selectedPoint: RadarSelectedPoint) => void;
  replaceTargetPointIndex: number | null;
  onPointMoveStart: (pointIndex: number) => void;
  onPointMoved: (pointIndex: number, nextPoint: RadarSelectedPoint) => void;
  onPointReplaced: (pointIndex: number, nextPoint: RadarSelectedPoint) => void;
  onPointContextMenuOpen: (pointIndex: number, clientX: number, clientY: number) => void;
  onPointContextMenuClose: () => void;
}

export const useRadarCanvas = ({
  navData,
  controls,
  arpaTargets,
  pointPickerActive,
  selectedPoints,
  onPointAdded,
  replaceTargetPointIndex,
  onPointMoveStart,
  onPointMoved,
  onPointReplaced,
  onPointContextMenuOpen,
  onPointContextMenuClose,
}: UseRadarCanvasParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepAngleRef = useRef(110);
  const draggingPointIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const fitCanvasToViewport = () => {
      const geometry = getRadarGeometry(canvas);
      const dpr = window.devicePixelRatio || 1;
      const pixelWidth = Math.floor(geometry.cssWidth * dpr);
      const pixelHeight = Math.floor(geometry.cssHeight * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return geometry;
    };

    const render = () => {
      const { cssWidth, cssHeight, centerX, centerY, maxRadius } = fitCanvasToViewport();
      const sweepAngle = sweepAngleRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Draw radar background circle
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#3e3249';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.stroke();

      drawRangeRings({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      drawVrm({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      // Draw radial lines
      ctx.strokeStyle = '#3f3a4a';
      ctx.lineWidth = 0.7;
      for (let trueBearing = 0; trueBearing < 360; trueBearing += 30) {
        const displayBearing = toDisplayBearing(trueBearing, navData, controls);
        const rad = (displayBearing * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + maxRadius * Math.sin(rad),
          centerY - maxRadius * Math.cos(rad)
        );
        ctx.stroke();
      }

      drawEchoLayer({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      drawArpaTargetLayer({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      drawHeadingLine({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      drawEbl({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      drawDegreeRing({
        ctx,
        centerX,
        centerY,
        maxRadiusPx: maxRadius,
        navData,
        controls,
        arpaTargets,
      });

      if (selectedPoints.length > 0) {
        ctx.save();
        ctx.fillStyle = '#ffe36a';
        ctx.strokeStyle = '#2f2944';
        ctx.lineWidth = 1;

        selectedPoints.forEach((point) => {
          const markerDisplayBearing = toDisplayBearing(point.bearingDeg, navData, controls);
          const markerRangePx = rangeNmToPixels(point.rangeNm, maxRadius, controls.selectedRangeNm);
          const marker = polarToCanvas(centerX, centerY, markerRangePx, markerDisplayBearing);

          ctx.beginPath();
          ctx.arc(marker.x, marker.y, PICK_MARKER_OUTER_RADIUS_PX, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(marker.x, marker.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      if (pointPickerActive) {
        ctx.save();
        ctx.strokeStyle = '#ffe36a';
        ctx.lineWidth = 1;
        ctx.setLineDash([7, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(0, maxRadius - 1), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw rotating sweep beam
      const sweepDisplayBearing = toDisplayBearing(sweepAngle, navData, controls);
      const sweepRad = (sweepDisplayBearing * Math.PI) / 180;

      ctx.strokeStyle = '#63ff8f';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.sin(sweepRad),
        centerY - maxRadius * Math.cos(sweepRad)
      );
      ctx.stroke();

      // Sweep trail effect
      for (let i = 1; i <= 4; i++) {
        const trailAngle = sweepAngle - i * 3.4;
        const trailDisplayBearing = toDisplayBearing(trailAngle, navData, controls);
        const trailRad = (trailDisplayBearing * Math.PI) / 180;
        ctx.strokeStyle = '#3ca857';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + maxRadius * Math.sin(trailRad),
          centerY - maxRadius * Math.cos(trailRad)
        );
        ctx.stroke();
      }

      // Draw center point
      ctx.fillStyle = '#63ff8f';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Update sweep angle
      sweepAngleRef.current = (sweepAngleRef.current + 0.14) % 360;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [navData, controls, arpaTargets, pointPickerActive, selectedPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pointPickerActive) {
      return;
    }

    const getCanvasCoordinates = (event: PointerEvent): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerDown = (event: PointerEvent) => {
      const isPrimaryClick = event.button === 0;
      const isSecondaryClick = event.button === 2;
      if (!isPrimaryClick && !isSecondaryClick) {
        return;
      }

      const geometry = getRadarGeometry(canvas);
      const { x, y } = getCanvasCoordinates(event);
      const hitIndex = findMarkerIndexAtCanvasPosition(x, y, geometry, selectedPoints, navData, controls);

      if (isSecondaryClick) {
        if (hitIndex >= 0) {
          onPointContextMenuOpen(hitIndex, event.clientX, event.clientY);
          event.preventDefault();
          return;
        }

        onPointContextMenuClose();

        return;
      }

      onPointContextMenuClose();

      if (replaceTargetPointIndex !== null) {
        const nextPoint = toRadarPointFromCanvasCoordinates(x, y, geometry, navData, controls);
        if (!nextPoint) {
          return;
        }

        onPointReplaced(replaceTargetPointIndex, nextPoint);
        event.preventDefault();
        return;
      }

      if (hitIndex >= 0) {
        onPointMoveStart(hitIndex);
        draggingPointIndexRef.current = hitIndex;
        canvas.setPointerCapture(event.pointerId);
        event.preventDefault();
        return;
      }

      const nextPoint = toRadarPointFromCanvasCoordinates(x, y, geometry, navData, controls);
      if (!nextPoint) {
        return;
      }

      onPointAdded(nextPoint);
      event.preventDefault();
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const draggingIndex = draggingPointIndexRef.current;
      if (draggingIndex === null) {
        return;
      }

      const geometry = getRadarGeometry(canvas);
      const { x, y } = getCanvasCoordinates(event);
      const nextPoint = toRadarPointFromCanvasCoordinates(x, y, geometry, navData, controls);
      if (!nextPoint) {
        return;
      }

      onPointMoved(draggingIndex, nextPoint);
      event.preventDefault();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      draggingPointIndexRef.current = null;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerEnd);
    canvas.addEventListener('pointercancel', handlePointerEnd);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerEnd);
      canvas.removeEventListener('pointercancel', handlePointerEnd);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      draggingPointIndexRef.current = null;
    };
  }, [
    controls,
    navData,
    onPointAdded,
    onPointContextMenuClose,
    onPointContextMenuOpen,
    onPointMoveStart,
    onPointMoved,
    onPointReplaced,
    pointPickerActive,
    replaceTargetPointIndex,
    selectedPoints,
  ]);

  return canvasRef;
};
