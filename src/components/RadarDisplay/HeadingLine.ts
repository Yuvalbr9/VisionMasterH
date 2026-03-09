import { RadarDrawContext, polarToCanvas, toDisplayBearing } from './drawTypes';

export const drawHeadingLine = ({ ctx, centerX, centerY, maxRadiusPx, navData, controls }: RadarDrawContext): void => {
  const displayBearing = toDisplayBearing(navData.cog.Degrees, navData, controls);
  const end = polarToCanvas(centerX, centerY, maxRadiusPx, displayBearing);
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};
