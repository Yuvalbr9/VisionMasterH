import { RadarDrawContext, polarToCanvas, rangeNmToPixels, toDisplayBearing } from './drawTypes';

export const drawArpaTargetLayer = ({ ctx, centerX, centerY, maxRadiusPx, navData, controls, arpaTargets }: RadarDrawContext): void => {
  ctx.strokeStyle = '#d7ea5c';
  ctx.fillStyle = '#d7ea5c';

  arpaTargets.forEach((target) => {
    const rangePx = rangeNmToPixels(target.rangeNm, maxRadiusPx, controls.selectedRangeNm);
    const targetDisplayBearing = toDisplayBearing(target.bearingDeg, navData, controls);
    const pos = polarToCanvas(centerX, centerY, rangePx, targetDisplayBearing);

    ctx.lineWidth = 1;
    ctx.strokeRect(pos.x - 5, pos.y - 5, 10, 10);

    const vectorDistanceNm = (target.speedKn * controls.vectorTimeMin) / 60;
    const vectorPx = rangeNmToPixels(vectorDistanceNm, maxRadiusPx, controls.selectedRangeNm);
    const vectorDisplayBearing = toDisplayBearing(target.courseDeg, navData, controls);
    const vectorEnd = polarToCanvas(pos.x, pos.y, vectorPx, vectorDisplayBearing);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(vectorEnd.x, vectorEnd.y);
    ctx.stroke();

    if (controls.trailsOn) {
      target.history.forEach((historyPoint) => {
        const historyPx = rangeNmToPixels(historyPoint.rangeNm, maxRadiusPx, controls.selectedRangeNm);
        const historyDisplayBearing = toDisplayBearing(historyPoint.bearingDeg, navData, controls);
        const historyPos = polarToCanvas(centerX, centerY, historyPx, historyDisplayBearing);
        ctx.fillRect(historyPos.x - 1, historyPos.y - 1, 2, 2);
      });
    }
  });
};
