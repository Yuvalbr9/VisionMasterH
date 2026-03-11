import React from 'react';
import { ControlButton } from '../Buttons';
import { TIME_UNITS, UI_TEXT } from '../../constants';
import { RadarControlState } from '../../types';

interface TopControlsSectionProps {
  trailsLabel: string;
  aisLabel: string;
  chartsLabel: string;
  radarPointPickerActive: boolean;
  radarControls: RadarControlState;
  onToggleTrails: () => void;
  onToggleAis: () => void;
  onToggleCharts: () => void;
  onOpenRadarPointPicker: () => void;
}

export const TopControlsSection: React.FC<TopControlsSectionProps> = ({
  trailsLabel,
  aisLabel,
  chartsLabel,
  radarPointPickerActive,
  radarControls,
  onToggleTrails,
  onToggleAis,
  onToggleCharts,
  onOpenRadarPointPicker,
}) => {
  return (
    <div className="vm-top-primary">
      <div className="vm-top-columns">
        <div className="vm-top-column">
          <ControlButton className="vm-cell vm-column-cell" onClick={onToggleTrails}>{trailsLabel}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.R_VECTORS}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.AIS_PRIORITY}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.CENTRE}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell" onClick={onToggleCharts}>{chartsLabel}</ControlButton>
        </div>

        <div className="vm-top-column">
          <ControlButton className="vm-cell vm-column-cell vm-time-cell">{UI_TEXT.RIGHT_PANEL.ZERO_TIME_MIN_SEC}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell vm-time-cell">{`${radarControls.vectorTimeMin.toFixed(0)}${TIME_UNITS.MINUTES}`}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell" onClick={onToggleAis}>{aisLabel}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.MAX}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.SYNTH_ON}</ControlButton>
        </div>

        <div className="vm-top-column">
          <ControlButton
            className="vm-cell vm-column-cell vm-radar-cell vm-radar-cell-tall"
            onClick={onOpenRadarPointPicker}
            title={radarPointPickerActive ? UI_TEXT.RIGHT_PANEL.RADAR_PICK_ACTIVE_HINT : UI_TEXT.RIGHT_PANEL.RADAR_PICK_TITLE}
          >
            {UI_TEXT.RIGHT_PANEL.RADAR}
          </ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.CPA}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.IHELP}</ControlButton>
          <ControlButton className="vm-cell vm-column-cell">{UI_TEXT.RIGHT_PANEL.COAST}</ControlButton>
        </div>
      </div>

      <div className="vm-alert-row">
        <ControlButton className="vm-alert-main">{UI_TEXT.RIGHT_PANEL.NO_ALARMS}</ControlButton>
        <ControlButton className="vm-alert-arrow">{UI_TEXT.RIGHT_PANEL.LEFT_ARROW}</ControlButton>
      </div>
      <ControlButton className="vm-date-row">{UI_TEXT.RIGHT_PANEL.DATE_ROW}</ControlButton>
    </div>
  );
};