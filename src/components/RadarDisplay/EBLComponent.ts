import { RadarDrawContext, polarToCanvas, toDisplayBearing } from './drawTypes';

const drawSingleEbl = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  maxRadiusPx: number,
  displayBearingDeg: number,
  lineWidth: number,
  dashPattern: number[]
): void => {
  const end = polarToCanvas(centerX, centerY, maxRadiusPx, displayBearingDeg);
  ctx.strokeStyle = '#7cff7c';
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(dashPattern);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawEbl = ({ ctx, centerX, centerY, maxRadiusPx, controls, navData }: RadarDrawContext): void => {
  const ebl1Display = toDisplayBearing(controls.ebl1Deg, navData, controls);
  const ebl2Display = toDisplayBearing(controls.ebl2Deg, navData, controls);

  drawSingleEbl(ctx, centerX, centerY, maxRadiusPx, ebl1Display, 2, [8, 5]);
  drawSingleEbl(ctx, centerX, centerY, maxRadiusPx, ebl2Display, 1, [4, 6]);
};
