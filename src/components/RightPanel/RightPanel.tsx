import React, { Dispatch, SetStateAction } from 'react';
import { RadarControlState, ARPATarget, RadarPoint } from '../../types';
import { UI_TEXT, UI_VALUES } from '../../constants';
import { BottomCornerEblVrm } from './BottomCornerEblVrm';
import { TopControlsSection } from './TopControlsSection';
import { MobCardSection } from './MobCardSection';
import { GreenPanelSection } from './GreenPanelSection';
import { useMobCardInputs } from './useMobCardInputs';
import { useRightPanelControls } from './useRightPanelControls';
import './right-panel.css';

interface RightPanelProps {
  radarControls: RadarControlState;
  onRadarControlsChange: Dispatch<SetStateAction<RadarControlState>>;
  arpaTargets: ARPATarget[];
  radarPointPickerActive: boolean;
  onOpenRadarPointPicker: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  radarControls,
  onRadarControlsChange,
  arpaTargets,
  radarPointPickerActive,
  onOpenRadarPointPicker,
}) => {
  const {
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
  } = useRightPanelControls({ radarControls, onRadarControlsChange });

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

  return (
    <div className="right-panel vm-right-panel">
      <TopControlsSection
        modeLabel={modeLabel}
        trailsLabel={trailsLabel}
        aisLabel={aisLabel}
        chartsLabel={chartsLabel}
        radarPointPickerActive={radarPointPickerActive}
        radarControls={radarControls}
        onToggleMode={toggleMode}
        onToggleTrails={toggleTrails}
        onToggleAis={toggleAis}
        onToggleCharts={toggleCharts}
        onOpenRadarPointPicker={onOpenRadarPointPicker}
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

      <BottomCornerEblVrm
        radarControls={radarControls}
        onRadarControlsChange={onRadarControlsChange}
      />
    </div>
  );
};
