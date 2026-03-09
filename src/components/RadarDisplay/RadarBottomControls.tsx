import React from 'react';
import { BaseButton } from '../Buttons';
import { UI_TEXT, UI_VALUES } from '../../constants';

const radarRows = [...UI_TEXT.RADAR_BOTTOM.ROW_LABELS];

export const RadarBottomControls: React.FC = () => {
  return (
    <div className="radar-bottom-controls">
      <div className="radar-console-top-group">
        <div className="radar-console-main radar-console-block">
          <BaseButton className="radar-console-btn radar-console-btn-wide">{UI_TEXT.RADAR_BOTTOM.ENHANCE_OFF}</BaseButton>

          <div className="radar-console-rows">
            {radarRows.map((label) => (
              <div className="radar-console-row" key={label}>
                <span className="radar-console-label">{label}</span>
                <div className="radar-console-value-box">
                  {label === UI_VALUES.RADAR_BOTTOM.GAIN_FILL_MATCH && <div className="radar-console-fill" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="radar-console-side-buttons">
          <BaseButton className="radar-console-btn">{UI_TEXT.RADAR_BOTTOM.MAN}</BaseButton>
          <BaseButton className="radar-console-btn">{UI_TEXT.RADAR_BOTTOM.AFC}</BaseButton>
        </div>
      </div>

      <BaseButton className="radar-console-btn radar-console-btn-wide">{UI_TEXT.RADAR_BOTTOM.TXRX_A_MASTER}</BaseButton>

      <div className="radar-console-bottom-row">
        <BaseButton className="radar-console-btn radar-console-btn-grow">{UI_TEXT.RADAR_BOTTOM.TRANSMIT}</BaseButton>
        <BaseButton className="radar-console-btn radar-console-btn-small">{UI_TEXT.RADAR_BOTTOM.MP}</BaseButton>
      </div>
    </div>
  );
};
