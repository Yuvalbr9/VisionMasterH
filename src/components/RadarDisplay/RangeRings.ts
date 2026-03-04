import { RadarDrawContext } from './drawTypes';

export const drawRangeRings = ({ ctx, centerX, centerY, maxRadiusPx }: RadarDrawContext): void => {
  ctx.strokeStyle = '#9a5d2c';
  ctx.lineWidth = 1;

  for (let i = 1; i <= 6; i++) {
    const radius = (maxRadiusPx / 6) * i;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
};
