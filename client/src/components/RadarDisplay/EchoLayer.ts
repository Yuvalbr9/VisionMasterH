import { RadarDrawContext, polarToCanvas, rangeNmToPixels, toDisplayBearing } from './drawTypes';

const seededNoise = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const drawEchoLayer = ({ ctx, centerX, centerY, maxRadiusPx, navData, controls }: RadarDrawContext): void => {
  ctx.fillStyle = '#a7b341';

  const density = 180;
  for (let i = 0; i < density; i++) {
    const n1 = seededNoise(i + 11);
    const n2 = seededNoise(i + 67);
    const n3 = seededNoise(i + 121);

    const trueBearing = 250 + n1 * 120;
    const displayBearing = toDisplayBearing(trueBearing, navData, controls);
    const rangeNm = 0.9 + n2 * (controls.selectedRangeNm - 0.4);
    const radius = rangeNmToPixels(rangeNm, maxRadiusPx, controls.selectedRangeNm);
    const pos = polarToCanvas(centerX, centerY, radius, displayBearing);

    const width = 2 + Math.floor(n3 * 4);
    const height = 2 + Math.floor(n2 * 3);
    ctx.fillRect(pos.x, pos.y, width, height);
  }
};
