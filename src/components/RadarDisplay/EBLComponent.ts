import { RadarDrawContext, polarToCanvas } from './drawTypes';

const drawSingleEbl = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  maxRadiusPx: number,
  bearingDeg: number,
  lineWidth: number,
  dashPattern: number[]
): void => {
  const end = polarToCanvas(centerX, centerY, maxRadiusPx, bearingDeg);
  ctx.strokeStyle = '#7cff7c';
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(dashPattern);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawEbl = ({ ctx, centerX, centerY, maxRadiusPx, controls }: RadarDrawContext): void => {
  drawSingleEbl(ctx, centerX, centerY, maxRadiusPx, controls.ebl1Deg, 2, [8, 5]);
  drawSingleEbl(ctx, centerX, centerY, maxRadiusPx, controls.ebl2Deg, 1, [4, 6]);
};
