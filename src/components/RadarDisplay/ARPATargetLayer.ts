import { RadarDrawContext, polarToCanvas, rangeNmToPixels } from './drawTypes';

export const drawArpaTargetLayer = ({ ctx, centerX, centerY, maxRadiusPx, controls, arpaTargets }: RadarDrawContext): void => {
  ctx.strokeStyle = '#d7ea5c';
  ctx.fillStyle = '#d7ea5c';

  arpaTargets.forEach((target) => {
    const rangePx = rangeNmToPixels(target.rangeNm, maxRadiusPx, controls.selectedRangeNm);
    const pos = polarToCanvas(centerX, centerY, rangePx, target.bearingDeg);

    ctx.lineWidth = 1;
    ctx.strokeRect(pos.x - 5, pos.y - 5, 10, 10);

    const vectorDistanceNm = (target.speedKn * controls.vectorTimeMin) / 60;
    const vectorPx = rangeNmToPixels(vectorDistanceNm, maxRadiusPx, controls.selectedRangeNm);
    const vectorEnd = polarToCanvas(pos.x, pos.y, vectorPx, target.courseDeg);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(vectorEnd.x, vectorEnd.y);
    ctx.stroke();

    if (controls.trailsOn) {
      target.history.forEach((historyPoint) => {
        const historyPx = rangeNmToPixels(historyPoint.rangeNm, maxRadiusPx, controls.selectedRangeNm);
        const historyPos = polarToCanvas(centerX, centerY, historyPx, historyPoint.bearingDeg);
        ctx.fillRect(historyPos.x - 1, historyPos.y - 1, 2, 2);
      });
    }
  });
};
