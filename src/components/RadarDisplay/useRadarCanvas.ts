import { useEffect, useRef } from 'react';
import { ARPATarget, NavigationData, RadarControlState } from '../../types';
import { drawRangeRings } from './RangeRings';
import { drawDegreeRing } from './DegreeRing';
import { drawHeadingLine } from './HeadingLine';
import { drawEchoLayer } from './EchoLayer';
import { drawEbl } from './EBLComponent';
import { drawVrm } from './VRMComponent';
import { drawArpaTargetLayer } from './ARPATargetLayer';

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

    const render = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(centerX, centerY) - 18;
      const sweepAngle = sweepAngleRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar background circle
      ctx.fillStyle = '#110c1a';
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
      for (let angle = 0; angle < 360; angle += 30) {
        const rad = (angle * Math.PI) / 180;
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
      const sweepRad = (sweepAngle * Math.PI) / 180;

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
        const trailRad = (trailAngle * Math.PI) / 180;
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
