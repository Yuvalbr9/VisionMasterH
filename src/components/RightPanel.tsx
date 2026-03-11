import React, { Dispatch, SetStateAction } from 'react';
import { ARPATarget, RadarControlState } from '../types';
import { UI_VALUES } from '../constants';
import { BottomCornerEblVrm } from './RightPanel/BottomCornerEblVrm';
import { RightPanelTopSection } from './RightPanel/RightPanelButtons';
import { MobCardSection } from './RightPanel/MobCardSection';
import { GreenPanelSection } from './RightPanel/GreenPanelSection';
import { useMobCardInputs } from './RightPanel/useMobCardInputs';
import { useRightPanelControls } from './RightPanel/useRightPanelControls';

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
    <div className="right-panel vm-panel-shell">
      <div className="vm-top-detached-shell">
        <RightPanelTopSection
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
      </div>

      <div className="vm-right-panel vm-main-panel-shell">

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

        <div className="vm-green-bottom-slot">
          <GreenPanelSection />
        </div>

        <BottomCornerEblVrm
          radarControls={radarControls}
          onRadarControlsChange={onRadarControlsChange}
        />
      </div>
    </div>
  );
};
