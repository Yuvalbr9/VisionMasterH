import { RadarDrawContext, normalizeBearing, polarToCanvas, toDisplayBearing } from './drawTypes';

export const drawDegreeRing = ({ ctx, centerX, centerY, maxRadiusPx, navData, controls }: RadarDrawContext): void => {
  ctx.strokeStyle = '#c5bb7b';
  ctx.lineWidth = 1;

  for (let trueBearing = 0; trueBearing < 360; trueBearing += 2) {
    const isMajor = trueBearing % 10 === 0;
    const displayBearing = toDisplayBearing(trueBearing, navData, controls);
    const outer = maxRadiusPx + (isMajor ? 10 : 6);
    const inner = maxRadiusPx + (isMajor ? 2 : 4);
    const start = polarToCanvas(centerX, centerY, inner, displayBearing);
    const end = polarToCanvas(centerX, centerY, outer, displayBearing);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.fillStyle = '#9bd58f';
  ctx.font = '11px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let trueBearing = 0; trueBearing < 360; trueBearing += 10) {
    const displayBearing = toDisplayBearing(trueBearing, navData, controls);
    const label = `${normalizeBearing(trueBearing)}`.padStart(3, '0');
    const pos = polarToCanvas(centerX, centerY, maxRadiusPx + 22, displayBearing);
    ctx.fillText(label, pos.x, pos.y);
  }
};
