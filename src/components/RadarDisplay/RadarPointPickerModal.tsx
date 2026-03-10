import React from 'react';
import { UI_TEXT } from '../../constants';
import { BaseButton } from '../Buttons';

interface RadarPointPickerModalProps {
  canUndo: boolean;
  replaceModeActive: boolean;
  onUndo: () => void;
  onClose: () => void;
  onCancel: () => void;
}

export const RadarPointPickerModal: React.FC<RadarPointPickerModalProps> = ({
  canUndo,
  replaceModeActive,
  onUndo,
  onClose,
  onCancel,
}) => {
  return (
    <div className="radar-point-picker-modal" role="dialog" aria-modal="false" aria-label={UI_TEXT.RIGHT_PANEL.RADAR_PICK_TITLE}>
      <div className="radar-point-picker-header">
        <div className="radar-point-picker-title">{UI_TEXT.RIGHT_PANEL.RADAR_PICK_TITLE}</div>
        <BaseButton
          className="radar-point-picker-close-btn"
          onClick={onClose}
          title={UI_TEXT.RIGHT_PANEL.RADAR_PICK_CLOSE_HINT}
          aria-label={UI_TEXT.RIGHT_PANEL.RADAR_PICK_CLOSE}
        >
          x
        </BaseButton>
      </div>

      <div className="radar-point-picker-hint">{UI_TEXT.RIGHT_PANEL.RADAR_PICK_HINT}</div>
      {replaceModeActive && (
        <div className="radar-point-picker-status">{UI_TEXT.RIGHT_PANEL.RADAR_PICK_REPLACE_STATUS}</div>
      )}

      <div className="radar-point-picker-actions">
        <BaseButton
          className="radar-point-picker-btn"
          onClick={onUndo}
          disabled={!canUndo}
          title={canUndo ? UI_TEXT.RIGHT_PANEL.RADAR_PICK_UNDO : UI_TEXT.RIGHT_PANEL.RADAR_PICK_UNDO_DISABLED}
        >
          {UI_TEXT.RIGHT_PANEL.RADAR_PICK_UNDO}
        </BaseButton>

        <BaseButton
          className="radar-point-picker-btn"
          onClick={onCancel}
          title={UI_TEXT.RIGHT_PANEL.RADAR_PICK_CANCEL_HINT}
        >
          {UI_TEXT.RIGHT_PANEL.RADAR_PICK_CANCEL}
        </BaseButton>
      </div>
    </div>
  );
};
