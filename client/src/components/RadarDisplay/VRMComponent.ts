import { RadarDrawContext, rangeNmToPixels } from './drawTypes';
import { clampVrmRangeNm } from '../../util';

const drawSingleVrm = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radiusPx: number,
  lineWidth: number,
  dashPattern: number[]
): void => {
  const safeRadiusPx = Number.isFinite(radiusPx) ? Math.max(0, radiusPx) : 0;
  if (safeRadiusPx <= 0) {
    return;
  }

  ctx.save();
  ctx.strokeStyle = '#c4c4c4';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';
  ctx.setLineDash(dashPattern);
  ctx.lineDashOffset = 0;
  ctx.beginPath();
  ctx.arc(centerX, centerY, safeRadiusPx, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
};

export const drawVrm = ({ ctx, centerX, centerY, maxRadiusPx, controls }: RadarDrawContext): void => {
  const safeMaxRadiusPx = Number.isFinite(maxRadiusPx) ? Math.max(0, maxRadiusPx) : 0;
  if (safeMaxRadiusPx <= 0) {
    return;
  }

  const vrm1Nm = clampVrmRangeNm(controls.vrm1Nm);
  const vrm2Nm = clampVrmRangeNm(controls.vrm2Nm);
  const vrm1Px = rangeNmToPixels(vrm1Nm, safeMaxRadiusPx, controls.selectedRangeNm);
  const vrm2Px = rangeNmToPixels(vrm2Nm, safeMaxRadiusPx, controls.selectedRangeNm);

  drawSingleVrm(ctx, centerX, centerY, vrm1Px, 2, [8, 6]);
  drawSingleVrm(ctx, centerX, centerY, vrm2Px, 1, [4, 6]);
};
