import { RadarDrawContext, rangeNmToPixels } from './drawTypes';

const drawSingleVrm = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radiusPx: number,
  lineWidth: number,
  dashPattern: number[]
): void => {
  ctx.strokeStyle = '#c4c4c4';
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(dashPattern);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radiusPx, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawVrm = ({ ctx, centerX, centerY, maxRadiusPx, controls }: RadarDrawContext): void => {
  const vrm1Px = rangeNmToPixels(controls.vrm1Nm, maxRadiusPx, controls.selectedRangeNm);
  const vrm2Px = rangeNmToPixels(controls.vrm2Nm, maxRadiusPx, controls.selectedRangeNm);

  drawSingleVrm(ctx, centerX, centerY, vrm1Px, 2, [8, 6]);
  drawSingleVrm(ctx, centerX, centerY, vrm2Px, 1, [4, 6]);
};
