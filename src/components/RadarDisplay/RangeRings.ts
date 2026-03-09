import { RadarDrawContext } from './drawTypes';
import { RADAR_RANGE_RING_COUNT } from '../../util';

export const drawRangeRings = ({ ctx, centerX, centerY, maxRadiusPx }: RadarDrawContext): void => {
  ctx.strokeStyle = '#9a5d2c';
  ctx.lineWidth = 1;

  for (let i = 1; i <= RADAR_RANGE_RING_COUNT; i++) {
    const radius = (maxRadiusPx / RADAR_RANGE_RING_COUNT) * i;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
};
