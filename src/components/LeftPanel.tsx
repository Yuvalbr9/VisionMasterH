import React from 'react';
import { DataDisplay, DataDisplayWithButton, DataDisplayDouble } from './DataDisplay';
import { Angle, Speed, Length } from 'unitsnet-js';

interface NavigationData {
  hdg: number;
  stw: number;
  sog: number;
  cog: number;
  posLat: string;
  posLon: string;
  ccrpPS: number;
  ccrpFA: number;
  stemPS: number;
}

interface LeftPanelProps {
  navData: NavigationData;
  updateNavData: (field: keyof NavigationData, value: number | string) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ navData, updateNavData }) => {
  const hdg = Angle.FromDegrees(navData.hdg);
  const stw = Speed.FromKnots(navData.stw);
  const cog = Angle.FromDegrees(navData.cog);
  const sog = Speed.FromKnots(navData.sog);
  const ccrpPA = Length.FromKilometers(10.8);
  
  const position = {
    lat: navData.posLat,
    lon: navData.posLon,
  };

  return (
    <div className="left-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          <button className="tab active">Default</button>
          <button className="tab">Docking</button>
          <button className="tab">Environment</button>
          <button className="tab">Route</button>
          <button className="tab">Sea &amp;</button>
        </div>
      </div>

      <div className="data-display editable">
        <div className="data-header">
          <span className="data-label">HDG</span>
          <span className="data-status" style={{ color: '#00ff00' }}>GPS</span>
        </div>
        <div className="data-value-container">
          <input 
            type="number" 
            className="data-input" 
            value={navData.hdg.toFixed(1)} 
            onChange={(e) => updateNavData('hdg', parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <span className="data-unit">°</span>
        </div>
        <div className="data-graph"></div>
      </div>

      <div className="data-display editable">
        <div className="data-header">
          <span className="data-label">STW</span>
        </div>
        <div className="data-value-row">
          <input 
            type="number" 
            className="data-input" 
            value={navData.stw.toFixed(1)} 
            onChange={(e) => updateNavData('stw', parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <span className="data-unit">kn</span>
          <button className="data-button">Log</button>
        </div>
      </div>

      <div className="data-display">
        <div className="data-header">
          <span className="data-label">POS</span>
          <span className="data-status" style={{ color: '#00ff00' }}>GPS</span>
        </div>
        <div className="data-double-row">
          <div className="data-value-container">
            <input 
              type="text" 
              className="data-input-pos" 
              value={navData.posLat} 
              onChange={(e) => updateNavData('posLat', e.target.value)}
            />
          </div>
          <div className="data-value-container">
            <input 
              type="text" 
              className="data-input-pos" 
              value={navData.posLon} 
              onChange={(e) => updateNavData('posLon', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="data-display editable">
        <div className="data-header">
          <span className="data-label">COG</span>
          <span className="data-status" style={{ color: '#00ff00' }}>GPS</span>
        </div>
        <div className="data-value-container">
          <input 
            type="number" 
            className="data-input" 
            value={navData.cog.toFixed(1)} 
            onChange={(e) => updateNavData('cog', parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <span className="data-unit">°</span>
        </div>
      </div>

      <div className="data-display sog-display">
        <div className="data-header">
          <span className="data-label">SOG</span>
        </div>
        <div className="sog-content">
          <div className="sog-selector">
            <span className="sog-label">Bow P/S</span>
            <div className="sog-arrows">
              <button className="arrow-btn">◄</button>
              <button className="arrow-btn">►</button>
            </div>
          </div>
          <div className="sog-value-row">
            <input 
              type="number" 
              className="data-input" 
              value={navData.sog.toFixed(1)} 
              onChange={(e) => updateNavData('sog', parseFloat(e.target.value) || 0)}
              step="0.1"
            />
            <span className="sog-source">Source</span>
          </div>
        </div>
      </div>

      <div className="ccrp-group">
        <div className="ccrp-item">
          <span className="ccrp-label">CCRP P/S</span>
          <div className="ccrp-value-row">
            <button className="arrow-btn">◄</button>
            <input 
              type="number" 
              className="data-input ccrp-input" 
              value={navData.ccrpPS.toFixed(1)} 
              onChange={(e) => updateNavData('ccrpPS', parseFloat(e.target.value) || 0)}
              step="0.1"
            />
            <button className="arrow-btn">►</button>
          </div>
        </div>
        <div className="ccrp-item">
          <span className="ccrp-label">CCRP F/A</span>
          <div className="ccrp-value-row">
            <button className="arrow-btn">◄</button>
            <input 
              type="number" 
              className="data-input ccrp-input" 
              value={navData.ccrpFA.toFixed(1)} 
              onChange={(e) => updateNavData('ccrpFA', parseFloat(e.target.value) || 0)}
              step="0.1"
            />
            <span className="ccrp-unit">kn</span>
            <button className="arrow-btn">►</button>
          </div>
        </div>
        <div className="ccrp-item">
          <span className="ccrp-label">Stem P/S</span>
          <div className="ccrp-value-row">
            <button className="arrow-btn">◄</button>
            <input 
              type="number" 
              className="data-input ccrp-input" 
              value={navData.stemPS.toFixed(1)} 
              onChange={(e) => updateNavData('stemPS', parseFloat(e.target.value) || 0)}
              step="0.1"
            />
            <button className="arrow-btn">►</button>
          </div>
        </div>
      </div>

      <div className="datetime-display">
        <div className="date">22 Jul 2024</div>
        <div className="time-row">
          <span className="time">16:00:52 UTC</span>
          <span className="zone">-15</span>
        </div>
      </div>
    </div>
  );
};
