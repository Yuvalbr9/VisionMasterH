import React from 'react';
import { TopControlsSection as MainTopControlsSection } from './TopControlsSection';
import { SideStackSection } from './SideStackSection';
import { RightPanelTopSectionProps } from './topControlTypes';

export const RightPanelTopSection: React.FC<RightPanelTopSectionProps> = ({
  modeLabel,
  trailsLabel,
  aisLabel,
  chartsLabel,
  radarPointPickerActive,
  radarControls,
  onToggleMode,
  onToggleTrails,
  onToggleAis,
  onToggleCharts,
  onOpenRadarPointPicker,
  onDecreaseRange,
  onIncreaseRange,
  canDecreaseRange,
  canIncreaseRange,
}) => {
  return (
    <div className="vm-upper-detached vm-upper-detached-yuval">
      <div className="vm-top-with-side">
        <SideStackSection
          modeLabel={modeLabel}
          radarControls={radarControls}
          onToggleMode={onToggleMode}
          onDecreaseRange={onDecreaseRange}
          onIncreaseRange={onIncreaseRange}
          canDecreaseRange={canDecreaseRange}
          canIncreaseRange={canIncreaseRange}
        />

        <MainTopControlsSection
          trailsLabel={trailsLabel}
          aisLabel={aisLabel}
          chartsLabel={chartsLabel}
          radarPointPickerActive={radarPointPickerActive}
          radarControls={radarControls}
          onToggleTrails={onToggleTrails}
          onToggleAis={onToggleAis}
          onToggleCharts={onToggleCharts}
          onOpenRadarPointPicker={onOpenRadarPointPicker}
        />
      </div>
    </div>
  );
};