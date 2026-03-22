import React from 'react';
import { UI_TEXT, UI_VALUES } from '../../constants';
import { RadarControlState } from '../../types';

interface UseRightPanelControlsArgs {
  radarControls: RadarControlState;
  onRadarControlsChange: React.Dispatch<React.SetStateAction<RadarControlState>>;
}

const getNearestRangeStepIndex = (currentRangeNm: number, rangeStepsNm: readonly number[]): number => {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  rangeStepsNm.forEach((stepNm, index) => {
    const distance = Math.abs(stepNm - currentRangeNm);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
};

export const useRightPanelControls = ({ radarControls, onRadarControlsChange }: UseRightPanelControlsArgs) => {
  const rangeStepsNm = UI_VALUES.RANGE_CONTROLS.RANGE_STEPS_NM;

  const currentRangeStepIndex = React.useMemo(
    () => getNearestRangeStepIndex(radarControls.selectedRangeNm, rangeStepsNm),
    [radarControls.selectedRangeNm, rangeStepsNm]
  );

  const modeLabel = radarControls.northUp ? UI_TEXT.RIGHT_PANEL.MODE_N_UP : UI_TEXT.RIGHT_PANEL.MODE_HEAD_UP;
  const trailsLabel = radarControls.trailsOn ? UI_TEXT.RIGHT_PANEL.TRAILS_ON : UI_TEXT.RIGHT_PANEL.TRAILS_OFF;
  const aisLabel = radarControls.aisOn ? UI_TEXT.RIGHT_PANEL.AIS_ON : UI_TEXT.RIGHT_PANEL.AIS_OFF;
  const chartsLabel = radarControls.chartOverlayOn ? UI_TEXT.RIGHT_PANEL.CHARTS_ON : UI_TEXT.RIGHT_PANEL.CHARTS_OFF;

  const toggleMode = () => {
    onRadarControlsChange((prev) => ({ ...prev, northUp: !prev.northUp }));
  };

  const toggleTrails = () => {
    onRadarControlsChange((prev) => ({ ...prev, trailsOn: !prev.trailsOn }));
  };

  const toggleAis = () => {
    onRadarControlsChange((prev) => ({ ...prev, aisOn: !prev.aisOn }));
  };

  const toggleCharts = () => {
    onRadarControlsChange((prev) => ({ ...prev, chartOverlayOn: !prev.chartOverlayOn }));
  };

  const applyRangeStepByOffset = (offset: -1 | 1) => {
    const nextIndex = Math.min(
      rangeStepsNm.length - 1,
      Math.max(0, currentRangeStepIndex + offset)
    );
    const nextRangeNm = rangeStepsNm[nextIndex];

    onRadarControlsChange((prev) => ({ ...prev, selectedRangeNm: nextRangeNm }));
  };

  const canDecreaseRange = currentRangeStepIndex > 0;
  const canIncreaseRange = currentRangeStepIndex < rangeStepsNm.length - 1;

  return {
    modeLabel,
    trailsLabel,
    aisLabel,
    chartsLabel,
    toggleMode,
    toggleTrails,
    toggleAis,
    toggleCharts,
    applyRangeStepByOffset,
    canDecreaseRange,
    canIncreaseRange,
  };
};
