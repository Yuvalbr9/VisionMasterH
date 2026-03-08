import React, { Dispatch, SetStateAction } from 'react';
import { ARPATarget, RadarControlState } from '../types';
import { UI_TEXT, UI_VALUES } from '../constants';
import { BottomCornerEblVrm } from './RightPanel/BottomCornerEblVrm';
import { TopControlsSection } from './RightPanel/TopControlsSection';
import { MobCardSection } from './RightPanel/MobCardSection';
import { GreenPanelSection } from './RightPanel/GreenPanelSection';
import { useMobCardInputs } from './RightPanel/useMobCardInputs';

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

interface RightPanelProps {
  radarControls: RadarControlState;
  onRadarControlsChange: Dispatch<SetStateAction<RadarControlState>>;
  arpaTargets: ARPATarget[];
}

export const RightPanel: React.FC<RightPanelProps> = ({
  radarControls,
  onRadarControlsChange,
  arpaTargets,
}) => {
  const rangeStepsNm = UI_VALUES.RANGE_CONTROLS.RANGE_STEPS_NM;
  const currentRangeStepIndex = React.useMemo(
    () => getNearestRangeStepIndex(radarControls.selectedRangeNm, rangeStepsNm),
    [radarControls.selectedRangeNm, rangeStepsNm]
  );

  const modeLabel = radarControls.northUp ? UI_TEXT.RIGHT_PANEL.MODE_N_UP : UI_TEXT.RIGHT_PANEL.MODE_HEAD_UP;
  const trailsLabel = radarControls.trailsOn ? UI_TEXT.RIGHT_PANEL.TRAILS_ON : UI_TEXT.RIGHT_PANEL.TRAILS_OFF;
  const aisLabel = radarControls.aisOn ? UI_TEXT.RIGHT_PANEL.AIS_ON : UI_TEXT.RIGHT_PANEL.AIS_OFF;
  const chartsLabel = radarControls.chartOverlayOn ? UI_TEXT.RIGHT_PANEL.CHARTS_ON : UI_TEXT.RIGHT_PANEL.CHARTS_OFF;

  const {
    bearingRInput,
    bearingTInput,
    rangeInput,
    elapsedTimeInput,
    setRangeInput,
    setElapsedTimeInput,
    rangeValue,
    elapsedDuration,
    handleBearingRInputChange,
    handleBearingTInputChange,
    handleRangeInputChange,
    handleElapsedTimeInputChange,
    formatElapsedTime,
  } = useMobCardInputs({
    radarControls,
    arpaTargets,
    onRadarControlsChange,
  });

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

  return (
    <div className="right-panel vm-right-panel">
      <TopControlsSection
        modeLabel={modeLabel}
        trailsLabel={trailsLabel}
        aisLabel={aisLabel}
        chartsLabel={chartsLabel}
        radarControls={radarControls}
        onToggleMode={toggleMode}
        onToggleTrails={toggleTrails}
        onToggleAis={toggleAis}
        onToggleCharts={toggleCharts}
        onDecreaseRange={() => applyRangeStepByOffset(-1)}
        onIncreaseRange={() => applyRangeStepByOffset(1)}
        canDecreaseRange={canDecreaseRange}
        canIncreaseRange={canIncreaseRange}
      />

      <MobCardSection
        bearingRInput={bearingRInput}
        bearingTInput={bearingTInput}
        rangeInput={rangeInput}
        elapsedTimeInput={elapsedTimeInput}
        onBearingRInputChange={handleBearingRInputChange}
        onBearingTInputChange={handleBearingTInputChange}
        onRangeInputChange={handleRangeInputChange}
        onRangeInputBlur={() => setRangeInput(rangeValue.NauticalMiles.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS))}
        onElapsedTimeInputChange={handleElapsedTimeInputChange}
        onElapsedTimeInputBlur={() => setElapsedTimeInput(formatElapsedTime(elapsedDuration))}
      />

      <GreenPanelSection />

      <BottomCornerEblVrm radarControls={radarControls} />
    </div>
  );
};
