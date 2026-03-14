import React from 'react';
import { ControlButton } from '../Buttons';
import { LENGTH_UNITS, UI_TEXT, UI_VALUES } from '../../constants';
import { getRangeRingSpacingNm, RADAR_RANGE_RING_COUNT } from '../../util';
import { SideStackControlsProps } from './topControlTypes';

export const SideStackSection: React.FC<SideStackControlsProps> = ({
  modeLabel,
  radarControls,
  onToggleMode,
  onDecreaseRange,
  onIncreaseRange,
  canDecreaseRange,
  canIncreaseRange,
}) => {
  const ringSpacingNm = getRangeRingSpacingNm(radarControls.selectedRangeNm, RADAR_RANGE_RING_COUNT);
  const ringSpacingLabel = ringSpacingNm.toFixed(UI_VALUES.RANGE_CONTROLS.DISPLAY_DECIMALS);
  const rangeScaleTitle = `${radarControls.selectedRangeNm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_INTEGER_DECIMALS)} ${UI_TEXT.RIGHT_PANEL.NM} scale over ${RADAR_RANGE_RING_COUNT} rings`;

  return (
    <div className="vm-side-stack">
      <div className="vm-side-row vm-side-row-split">
        <ControlButton className="vm-cell vm-side-half" onClick={onToggleMode}>{modeLabel}</ControlButton>
        <ControlButton className="vm-cell vm-side-half">{UI_TEXT.RIGHT_PANEL.NM}</ControlButton>
      </div>

      <ControlButton className="vm-cell vm-side-full">{UI_TEXT.RIGHT_PANEL.GROUND_STABILISED}</ControlButton>

      <div className="vm-side-row vm-side-row-range">
        <ControlButton className="vm-cell vm-side-arrow" onClick={onDecreaseRange} disabled={!canDecreaseRange}>{UI_TEXT.RIGHT_PANEL.LEFT_ARROW}</ControlButton>
        <ControlButton className="vm-cell vm-side-range-value" title={rangeScaleTitle}>{ringSpacingLabel} {UI_TEXT.RIGHT_PANEL.NM}</ControlButton>
        <ControlButton className="vm-cell vm-side-arrow" onClick={onIncreaseRange} disabled={!canIncreaseRange}>{UI_TEXT.RIGHT_PANEL.RIGHT_ARROW}</ControlButton>
      </div>

      <ControlButton className="vm-cell vm-side-full">{UI_TEXT.RIGHT_PANEL.RINGS} {ringSpacingLabel} {LENGTH_UNITS.NAUTICAL_MILES}</ControlButton>

      <div className="vm-side-row vm-side-row-icons">
        <ControlButton className="vm-cell vm-side-quarter vm-side-print">{UI_TEXT.RIGHT_PANEL.PRINT}</ControlButton>
        <ControlButton className="vm-cell vm-side-quarter vm-icon-cell">{UI_TEXT.RIGHT_PANEL.MAIL_ICON}</ControlButton>
      </div>

      <div className="vm-side-row vm-side-row-icons">
        <ControlButton className="vm-cell vm-side-quarter vm-side-sign" title="Danger">⚠</ControlButton>
      </div>

      <div className="vm-side-row vm-side-row-icons">
        <ControlButton className="vm-cell vm-side-quarter vm-side-sign vm-side-sign-person" title="Person">
          <svg className="vm-person-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <circle cx="8" cy="5" r="3" />
            <path d="M2.5 14a5.5 5.5 0 0 1 11 0z" />
          </svg>
        </ControlButton>
      </div>
    </div>
  );
};
