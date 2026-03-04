import { RadarDrawContext, polarToCanvas } from './drawTypes';

export const drawHeadingLine = ({ ctx, centerX, centerY, maxRadiusPx, navData }: RadarDrawContext): void => {
  const end = polarToCanvas(centerX, centerY, maxRadiusPx, navData.hdg.Degrees);
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};
