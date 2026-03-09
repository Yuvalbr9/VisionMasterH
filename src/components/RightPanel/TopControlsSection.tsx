import React from 'react';
import { ControlButton } from '../Buttons';
import { LENGTH_UNITS, TIME_UNITS, UI_TEXT, UI_VALUES } from '../../constants';
import { RadarControlState } from '../../types';
import { getRangeRingSpacingNm, RADAR_RANGE_RING_COUNT } from '../../util';

interface TopControlsSectionProps {
  modeLabel: string;
  trailsLabel: string;
  aisLabel: string;
  chartsLabel: string;
  radarControls: RadarControlState;
  onToggleMode: () => void;
  onToggleTrails: () => void;
  onToggleAis: () => void;
  onToggleCharts: () => void;
  onDecreaseRange: () => void;
  onIncreaseRange: () => void;
  canDecreaseRange: boolean;
  canIncreaseRange: boolean;
}

export const TopControlsSection: React.FC<TopControlsSectionProps> = ({
  modeLabel,
  trailsLabel,
  aisLabel,
  chartsLabel,
  radarControls,
  onToggleMode,
  onToggleTrails,
  onToggleAis,
  onToggleCharts,
  onDecreaseRange,
  onIncreaseRange,
  canDecreaseRange,
  canIncreaseRange,
}) => {
  const ringSpacingNm = getRangeRingSpacingNm(radarControls.selectedRangeNm, RADAR_RANGE_RING_COUNT);

  return (
    <div className="vm-upper-detached">
      <div className="vm-top-matrix">
        <ControlButton className="vm-cell" onClick={onToggleMode}>{modeLabel}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.RM}</ControlButton>
        <ControlButton className="vm-cell" onClick={onToggleTrails}>{trailsLabel}</ControlButton>
        <ControlButton className="vm-cell vm-time-cell">{UI_TEXT.RIGHT_PANEL.ZERO_TIME_MIN_SEC}</ControlButton>
        <ControlButton className="vm-cell vm-radar-cell">{UI_TEXT.RIGHT_PANEL.RADAR}</ControlButton>

        <ControlButton className="vm-cell vm-ground-cell">{UI_TEXT.RIGHT_PANEL.GROUND_STABILISED}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.R_VECTORS}</ControlButton>
        <ControlButton className="vm-cell">{radarControls.vectorTimeMin.toFixed(UI_VALUES.RIGHT_PANEL.VECTOR_TIME_DECIMALS)} {TIME_UNITS.MINUTES}</ControlButton>

        <ControlButton className="vm-cell vm-arrow-cell" onClick={onDecreaseRange} disabled={!canDecreaseRange}>{UI_TEXT.RIGHT_PANEL.LEFT_ARROW}</ControlButton>
        <ControlButton
          className="vm-cell vm-messy-shift"
          title={`${radarControls.selectedRangeNm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_INTEGER_DECIMALS)} ${UI_TEXT.RIGHT_PANEL.RM} scale over ${RADAR_RANGE_RING_COUNT} rings`}
        >
          {ringSpacingNm.toFixed(UI_VALUES.RANGE_CONTROLS.DISPLAY_DECIMALS)} {UI_TEXT.RIGHT_PANEL.RM}
        </ControlButton>
        <ControlButton className="vm-cell vm-arrow-cell" onClick={onIncreaseRange} disabled={!canIncreaseRange}>{UI_TEXT.RIGHT_PANEL.RIGHT_ARROW}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.AIS_PRIORITY}</ControlButton>
        <ControlButton className="vm-cell" onClick={onToggleAis}>{aisLabel}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.CPA}</ControlButton>

        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.RINGS} {ringSpacingNm.toFixed(UI_VALUES.RANGE_CONTROLS.DISPLAY_DECIMALS)} {LENGTH_UNITS.NAUTICAL_MILES}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.CENTRE}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.MAX}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.IHELP}</ControlButton>

        <ControlButton className="vm-cell vm-print-cell">{UI_TEXT.RIGHT_PANEL.PRINT}</ControlButton>
        <ControlButton className="vm-cell vm-icon-cell">{UI_TEXT.RIGHT_PANEL.MAIL_ICON}</ControlButton>
        <ControlButton className="vm-cell" onClick={onToggleCharts}>{chartsLabel}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.SYNTH_ON}</ControlButton>
        <ControlButton className="vm-cell">{UI_TEXT.RIGHT_PANEL.COAST}</ControlButton>
      </div>

      <div className="vm-alert-row">
        <ControlButton className="vm-alert-main">{UI_TEXT.RIGHT_PANEL.NO_ALARMS}</ControlButton>
        <ControlButton className="vm-alert-arrow">{UI_TEXT.RIGHT_PANEL.LEFT_ARROW}</ControlButton>
      </div>
      <ControlButton className="vm-date-row">{UI_TEXT.RIGHT_PANEL.DATE_ROW}</ControlButton>
      <div className="vm-mob-header">
        <ControlButton>{UI_TEXT.RIGHT_PANEL.LEFT_ARROW}</ControlButton>
        <ControlButton className="vm-mob-header-main">{UI_TEXT.POSITION_INFO.MAN_OVERBOARD}</ControlButton>
        <ControlButton>{UI_TEXT.RIGHT_PANEL.RIGHT_ARROW}</ControlButton>
      </div>
    </div>
  );
};