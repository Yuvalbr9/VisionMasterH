import React from 'react';
import { Length, Speed } from 'unitsnet-js';

export const RightPanel: React.FC = () => {
  const range = Length.FromNauticalMiles(2);
  
  return (
    <div className="right-panel">
      <div className="top-button-section">
        <div className="btn-row">
          <button className="header-btn">N UP</button>
          <button className="header-btn">RM</button>
          <button className="header-btn">Trails Off</button>
          <button className="header-btn">Own Ga</button>
          <button className="header-btn">Radar</button>
          <span className="info-text">Group: Stabilized</span>
          <span className="info-text">R Masters</span>
          <span className="info-text">6.0 mm</span>
        </div>
        <div className="btn-row">
          <button className="header-btn">12 RM</button>
          <button className="header-btn">Arc Priority</button>
          <button className="header-btn">AIS On</button>
          <button className="header-btn">CDA</button>
          <span className="info-text">Range 2 NM</span>
          <button className="header-btn">Center</button>
          <button className="header-btn">Max</button>
          <button className="header-btn">Hdop</button>
          <button className="header-btn">5 NM</button>
          <button className="header-btn">Charts Off</button>
          <button className="header-btn">Sym On</button>
        </div>
      </div>

      <div className="no-name-section">
        <button className="ais-nav-btn-small">◄</button>
        <span className="no-name-text">No Name</span>
        <button className="ais-nav-btn-small">►</button>
      </div>

      <div className="right-panel-content">

      <div className="range-controls">
        <button className="nav-btn">◄</button>
        <div className="range-display">
          <span className="range-label">12 RM</span>
          <span className="range-value">Range {range.NauticalMiles.toFixed(1)} NM</span>
        </div>
        <button className="nav-btn">►</button>
      </div>

      <div className="position-info">
        <div className="info-section">
          <span className="section-label">Center</span>
          <div className="section-values">
            <span>Max</span>
            <span>Charts Off Gyro On</span>
          </div>
        </div>

        <div className="datetime-stamp">
          <span>22 Jul 2024 16:00:31 UTC</span>
        </div>
        
        <div className="man-overboard-section">
          <button className="overboard-btn-left">
            <span className="arrow">◄</span>
            <span>Man Overboard</span>
          </button>
          <button className="overboard-btn-right">
            <span>Man Overboard</span>
            <span className="arrow">►</span>
          </button>
        </div>
      </div>

      <div className="chart-controls">
        <button className="chart-btn">Select a Position On Chart</button>
        <button className="chart-btn">Manual Ent</button>
      </div>

      <div className="bearing-controls">
        <div className="control-group">
          <label>Bearing (R)</label>
          <input type="text" className="control-input" placeholder="---" />
        </div>
        <div className="control-group">
          <label>Bearing (1)</label>
          <input type="text" className="control-input" placeholder="---" />
        </div>
        <div className="control-group">
          <label>Range (m)</label>
          <input type="text" className="control-input" placeholder="---" />
        </div>
        <div className="control-group">
          <label>Estimated Time</label>
          <input type="text" className="control-input" defaultValue="0:00:00" />
        </div>
      </div>

      <button className="start-btn">Start</button>
      </div>

      <div className="bottom-section">
        <div className="bottom-controls">
          <div className="control-tabs">
            <button className="ctrl-tab">Grnd.</button>
            <button className="ctrl-tab">Own</button>
            <button className="ctrl-tab">Heads</button>
            <button className="ctrl-tab">Trail</button>
          </div>
          <div className="position-data">
            <div className="pos-line">
              <span className="pos-label">40°24.176'N</span>
            </div>
            <div className="pos-line">
              <span className="pos-label">073°48.444'W</span>
              <span className="pos-extra">Rumb$</span>
            </div>
            <div className="pos-line">
              <span className="pos-label">2.77 NM</span>
            </div>
            <div className="pos-line">
              <span className="pos-label">229.9°</span>
              <span className="pos-extra">R (071.3)</span>
            </div>
            <div className="pos-line">
              <span className="pos-label green">TTC 00:15:32 AIS SS</span>
            </div>
          </div>
          <button className="menu-btn">Show Menu</button>
        </div>
      </div>
    </div>
  );
};
