import { RadarDrawContext, polarToCanvas } from './drawTypes';

export const drawDegreeRing = ({ ctx, centerX, centerY, maxRadiusPx }: RadarDrawContext): void => {
  ctx.strokeStyle = '#c5bb7b';
  ctx.lineWidth = 1;

  for (let bearing = 0; bearing < 360; bearing += 2) {
    const isMajor = bearing % 10 === 0;
    const outer = maxRadiusPx + (isMajor ? 10 : 6);
    const inner = maxRadiusPx + (isMajor ? 2 : 4);
    const start = polarToCanvas(centerX, centerY, inner, bearing);
    const end = polarToCanvas(centerX, centerY, outer, bearing);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.fillStyle = '#9bd58f';
  ctx.font = '11px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let bearing = 0; bearing < 360; bearing += 10) {
    const label = `${bearing}`.padStart(3, '0');
    const pos = polarToCanvas(centerX, centerY, maxRadiusPx + 22, bearing);
    ctx.fillText(label, pos.x, pos.y);
  }
};
