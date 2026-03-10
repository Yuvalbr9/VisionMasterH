import React from 'react';
import { ControlButton } from '../Buttons';
import { GenericInput } from '../Inputs';
import { UI_TEXT, UI_VALUES } from '../../constants';

interface MobCardSectionProps {
  bearingRInput: string;
  bearingTInput: string;
  rangeInput: string;
  elapsedTimeInput: string;
  onBearingRInputChange: (value: string) => void;
  onBearingTInputChange: (value: string) => void;
  onRangeInputChange: (value: string) => void;
  onRangeInputBlur: () => void;
  onElapsedTimeInputChange: (value: string) => void;
  onElapsedTimeInputBlur: () => void;
}

export const MobCardSection: React.FC<MobCardSectionProps> = ({
  bearingRInput,
  bearingTInput,
  rangeInput,
  elapsedTimeInput,
  onBearingRInputChange,
  onBearingTInputChange,
  onRangeInputChange,
  onRangeInputBlur,
  onElapsedTimeInputChange,
  onElapsedTimeInputBlur,
}) => {
  return (
    <div className="vm-lower-detached">
      <div className="vm-mob-card">
        <div className="vm-mob-title">{UI_TEXT.RIGHT_PANEL.MOB_TITLE}</div>
        <ControlButton className="vm-wide-btn">{UI_TEXT.RIGHT_PANEL.SELECT_POSITION_CHART}</ControlButton>
        <ControlButton className="vm-wide-btn">{UI_TEXT.RIGHT_PANEL.MANUAL_EDIT}</ControlButton>

        <div className="vm-field-row">
          <label>{UI_TEXT.RIGHT_PANEL.BEARING_R}</label>
          <GenericInput
            type="number"
            step={UI_VALUES.RIGHT_PANEL.BEARING_STEP}
            min={`${UI_VALUES.RIGHT_PANEL.EBL_MIN}`}
            max={`${UI_VALUES.RIGHT_PANEL.EBL_MAX}`}
            value={bearingRInput}
            onChange={(event) => onBearingRInputChange(event.target.value)}
          />
        </div>
        <div className="vm-field-row">
          <label>{UI_TEXT.RIGHT_PANEL.BEARING_T}</label>
          <GenericInput
            type="number"
            step={UI_VALUES.RIGHT_PANEL.BEARING_STEP}
            min={`${UI_VALUES.RIGHT_PANEL.EBL_MIN}`}
            max={`${UI_VALUES.RIGHT_PANEL.EBL_MAX}`}
            value={bearingTInput}
            onChange={(event) => onBearingTInputChange(event.target.value)}
          />
        </div>
        <div className="vm-field-row">
          <label>{UI_TEXT.RIGHT_PANEL.RANGE_NM}</label>
          <GenericInput
            type="number"
            step={UI_VALUES.RIGHT_PANEL.RANGE_STEP}
            value={rangeInput}
            onChange={(event) => onRangeInputChange(event.target.value)}
            onBlur={onRangeInputBlur}
          />
        </div>
        <div className="vm-field-row">
          <label>{UI_TEXT.RIGHT_PANEL.ELAPSED_TIME}</label>
          <GenericInput
            type="text"
            inputMode="numeric"
            placeholder={UI_TEXT.RIGHT_PANEL.PLACEHOLDER_HMS}
            value={elapsedTimeInput}
            onChange={(event) => onElapsedTimeInputChange(event.target.value)}
            onBlur={onElapsedTimeInputBlur}
          />
        </div>

        <ControlButton className="vm-start-btn">{UI_TEXT.RIGHT_PANEL.START}</ControlButton>
      </div>
    </div>
  );
};