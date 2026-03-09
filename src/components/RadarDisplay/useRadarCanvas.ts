import { useEffect, useRef } from 'react';
import { ARPATarget, NavigationData, RadarControlState } from '../../types';
import { drawRangeRings } from './RangeRings';
import { drawDegreeRing } from './DegreeRing';
import { drawHeadingLine } from './HeadingLine';
import { drawEchoLayer } from './EchoLayer';
import { drawEbl } from './EBLComponent';
import { drawVrm } from './VRMComponent';
import { drawArpaTargetLayer } from './ARPATargetLayer';
import { toDisplayBearing } from './drawTypes';

interface UseRadarCanvasParams {
  navData: NavigationData;
  controls: RadarControlState;
  arpaTargets: ARPATarget[];
}

export const useRadarCanvas = ({ navData, controls, arpaTargets }: UseRadarCanvasParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepAngleRef = useRef(110);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const fitCanvasToViewport = () => {
      const bounds = canvas.getBoundingClientRect();
      const cssWidth = Math.max(220, Math.floor(bounds.width || canvas.clientWidth || 720));
      const cssHeight = Math.max(220, Math.floor(bounds.height || canvas.clientHeight || cssWidth));
      const dpr = window.devicePixelRatio || 1;
      const pixelWidth = Math.floor(cssWidth * dpr);
      const pixelHeight = Math.floor(cssHeight * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return { cssWidth, cssHeight };
    };

    const render = () => {
      const { cssWidth, cssHeight } = fitCanvasToViewport();
      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;
      const edgePadding = Math.max(18, Math.min(34, Math.round(Math.min(cssWidth, cssHeight) * 0.055)));
      const maxRadius = Math.min(centerX, centerY) - edgePadding;
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
  }, [navData, controls, arpaTargets]);

  return canvasRef;
};
