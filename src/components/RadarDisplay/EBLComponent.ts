import { RadarDrawContext, normalizeBearing, polarToCanvas, toDisplayBearing } from './drawTypes';

const drawSingleEbl = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  maxRadiusPx: number,
  displayBearingDeg: number,
  lineWidth: number,
  dashPattern: number[]
): void => {
  const safeMaxRadiusPx = Number.isFinite(maxRadiusPx) ? Math.max(0, maxRadiusPx) : 0;
  if (safeMaxRadiusPx <= 0) {
    return;
  }

  const stableBearingDeg = normalizeBearing(displayBearingDeg);

  // Extend by half line width and clip to the radar circle to keep the visual endpoint on the edge.
  const end = polarToCanvas(centerX, centerY, safeMaxRadiusPx + lineWidth * 0.5, stableBearingDeg);

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, safeMaxRadiusPx, 0, Math.PI * 2);
  ctx.clip();

  ctx.strokeStyle = '#7cff7c';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';
  ctx.setLineDash(dashPattern);
  ctx.lineDashOffset = 0;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.restore();
};

export const drawEbl = ({ ctx, centerX, centerY, maxRadiusPx, controls, navData }: RadarDrawContext): void => {
  const ebl1Display = toDisplayBearing(controls.ebl1Deg, navData, controls);
  const ebl2Display = toDisplayBearing(controls.ebl2Deg, navData, controls);

  drawSingleEbl(ctx, centerX, centerY, maxRadiusPx, ebl1Display, 2, [8, 5]);
  drawSingleEbl(ctx, centerX, centerY, maxRadiusPx, ebl2Display, 1, [4, 6]);
};
