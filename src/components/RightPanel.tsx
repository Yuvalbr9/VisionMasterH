import React from 'react';
import { ARPATarget, RadarControlState } from '../types';
import { ControlButton } from './Buttons';
import { BottomCornerEblVrm } from './RightPanel/BottomCornerEblVrm';
import { BearingControls } from './RightPanel/BearingControls';
import { ChartControls } from './RightPanel/ChartControls';
import { PositionInfo } from './RightPanel/PositionInfo';
import { RangeControls } from './RightPanel/RangeControls';

interface RightPanelProps {
  radarControls: RadarControlState;
  onRadarControlsChange: React.Dispatch<React.SetStateAction<RadarControlState>>;
  velocity: { vn: number; ve: number };
  onVelocityChange: React.Dispatch<React.SetStateAction<{ vn: number; ve: number }>>;
  leewayDeg: number;
  arpaTargets: ARPATarget[];
}

export const RightPanel: React.FC<RightPanelProps> = ({
  radarControls,
  onRadarControlsChange,
  arpaTargets,
}) => {
  const modeLabel = radarControls.northUp ? 'N UP' : 'Head Up';
  const trailsLabel = radarControls.trailsOn ? 'Trails On' : 'Trails Off';
  const aisLabel = radarControls.aisOn ? 'AIS On' : 'AIS Off';
  const chartsLabel = radarControls.chartOverlayOn ? 'Charts On' : 'Charts Off';

  const primaryTarget = arpaTargets[0] as ARPATarget | undefined;

  const toggleMode = () => {
    onRadarControlsChange((prev) => ({ ...prev, northUp: !prev.northUp }));
  };

  const toggleTrails = () => {
    onRadarControlsChange((prev) => ({ ...prev, trailsOn: !prev.trailsOn }));
  };

  const toggleAis = () => {
    onRadarControlsChange((prev) => ({ ...prev, aisOn: !prev.aisOn }));
  };

  const toggleCharts = () => {
    onRadarControlsChange((prev) => ({ ...prev, chartOverlayOn: !prev.chartOverlayOn }));
  };

  return (
    <div className="right-panel vm-right-panel">
      <div className="vm-upper-detached">
        <div className="vm-top-matrix">        
          <ControlButton className="vm-cell" onClick={toggleMode}>{modeLabel}</ControlButton>
          <ControlButton className="vm-cell">RM</ControlButton>
          <ControlButton className="vm-cell" onClick={toggleTrails}>{trailsLabel}</ControlButton>
          <ControlButton className="vm-cell vm-time-cell">0min 00s</ControlButton>
          <ControlButton className="vm-cell vm-radar-cell">Radar</ControlButton>

          <ControlButton className="vm-cell vm-ground-cell">Ground Stabilised</ControlButton>
          <ControlButton className="vm-cell">R Vectors</ControlButton>
          <ControlButton className="vm-cell">{radarControls.vectorTimeMin.toFixed(1)} min</ControlButton>

          <ControlButton className="vm-cell vm-arrow-cell">◀</ControlButton>
          <ControlButton className="vm-cell vm-messy-shift">{radarControls.selectedRangeNm.toFixed(0)} RM</ControlButton>
          <ControlButton className="vm-cell vm-arrow-cell">▶</ControlButton>
          <ControlButton className="vm-cell">AIS Priority</ControlButton>
          <ControlButton className="vm-cell" onClick={toggleAis}>{aisLabel}</ControlButton>
          <ControlButton className="vm-cell">CPA</ControlButton>

          <ControlButton className="vm-cell">Rings {radarControls.selectedRangeNm.toFixed(0)} NM</ControlButton>
          <ControlButton className="vm-cell">Centre</ControlButton>
          <ControlButton className="vm-cell">Max</ControlButton>
          <ControlButton className="vm-cell">iHelp</ControlButton>

          <ControlButton className="vm-cell vm-print-cell">Print</ControlButton>
          <ControlButton className="vm-cell vm-icon-cell">✉</ControlButton>
          <ControlButton className="vm-cell" onClick={toggleCharts}>{chartsLabel}</ControlButton>
          <ControlButton className="vm-cell">Synth On</ControlButton>
          <ControlButton className="vm-cell">Coast</ControlButton>
        </div>

        <div className="vm-alert-row">
          <ControlButton className="vm-alert-main">No Alarms</ControlButton>
          <ControlButton className="vm-alert-arrow">◀</ControlButton>
        </div>
        <ControlButton className="vm-date-row">22 Jul 2014 16:00:31 UTC</ControlButton>
        <div className="vm-mob-header">
          <ControlButton>◀</ControlButton>
          <ControlButton className="vm-mob-header-main">Man Overboard</ControlButton>
          <ControlButton>▶</ControlButton>
        </div>
      </div>

      <div className="vm-lower-detached">
        <div className="vm-mob-card">
          <div className="vm-mob-title">Man Overboard</div>
          <ControlButton className="vm-wide-btn">Select A Position On Chart</ControlButton>
          <ControlButton className="vm-wide-btn">Manual Edit</ControlButton>

          <div className="vm-field-row">
            <label>Bearing (R)</label>
            <input value={radarControls.ebl1Deg.toFixed(1)} readOnly />
          </div>
          <div className="vm-field-row">
            <label>Bearing (T)</label>
            <input value={radarControls.ebl2Deg.toFixed(1)} readOnly />
          </div>
          <div className="vm-field-row">
            <label>Range (nm)</label>
            <input value={primaryTarget ? primaryTarget.rangeNm.toFixed(2) : '---'} readOnly />
          </div>
          <div className="vm-field-row">
            <label>Elapsed Time</label>
            <input value={'00:00:00'} readOnly />
          </div>

          <ControlButton className="vm-start-btn">Start</ControlButton>
        </div>

      </div>

        <div className="vm-bottom-detached">
          <div className="vm-bottom-row">
            <div className="vm-green-panel-wrap">
              <div className="vm-green-tabs">
                <ControlButton className="vm-green-tab">Curs</ControlButton>
                <ControlButton className="vm-green-tab">Posn</ControlButton>
                <ControlButton className="vm-green-tab">Route</ControlButton>
                <ControlButton className="vm-green-tab">Trial</ControlButton>
              </div>

              <div className="vm-green-panel">
                <div className="vm-green-line">40°24.496'N</div>
                <div className="vm-green-line">073°49.944'W</div>
                <div className="vm-green-line">2.79 NM <span className="vm-rhumb">Rhumb</span></div>
                <div className="vm-green-line">258.2° <span className="vm-mid-tag">R</span> (078.2°)</div>
                <div className="vm-green-line">TTG 00:15:29 HH:MM:SS</div>
              </div>

              <ControlButton className="vm-show-menu-btn">Show Menu</ControlButton>
            </div>
          </div>
        </div>

      <BottomCornerEblVrm radarControls={radarControls} />
    </div>
  );
};
