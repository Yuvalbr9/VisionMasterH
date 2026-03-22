import React from 'react';
import { ControlButton } from '../Buttons';
import { LENGTH_UNITS, UI_TEXT } from '../../constants';

export const GreenPanelSection: React.FC = () => {
  return (
    <div className="vm-bottom-detached">
      <div className="vm-bottom-row">
        <div className="vm-green-panel-wrap">
          <div className="vm-green-tabs">
            <ControlButton className="vm-green-tab">{UI_TEXT.RIGHT_PANEL.CURS}</ControlButton>
            <ControlButton className="vm-green-tab">{UI_TEXT.RIGHT_PANEL.POSN}</ControlButton>
            <ControlButton className="vm-green-tab">{UI_TEXT.RIGHT_PANEL.ROUTE}</ControlButton>
            <ControlButton className="vm-green-tab">{UI_TEXT.RIGHT_PANEL.TRIAL}</ControlButton>
          </div>

          <div className="vm-green-panel">
            <div className="vm-green-line">{UI_TEXT.RIGHT_PANEL.GREEN_LAT}</div>
            <div className="vm-green-line">{UI_TEXT.RIGHT_PANEL.GREEN_LON}</div>
            <div className="vm-green-line">2.79 {LENGTH_UNITS.NAUTICAL_MILES} <span className="vm-rhumb">{UI_TEXT.RIGHT_PANEL.RHUMB}</span></div>
            <div className="vm-green-line">258.2° <span className="vm-mid-tag">{UI_TEXT.RIGHT_PANEL.MID_TAG_R}</span> (078.2°)</div>
            <div className="vm-green-line">{UI_TEXT.RIGHT_PANEL.TTG_HMS}</div>
          </div>

          <ControlButton className="vm-show-menu-btn">{UI_TEXT.RIGHT_PANEL.SHOW_MENU}</ControlButton>
        </div>
      </div>
    </div>
  );
};