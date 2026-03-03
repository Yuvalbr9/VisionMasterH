import React, { useState } from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { NavigationData, parseLatitude, parseLongitude } from './types';
import { LeftPanel } from './components/LeftPanel';
import { RadarDisplay } from './components/RadarDisplay';
import { RightPanel } from './components/RightPanel';

const App: React.FC = () => {
  const [navData, setNavData] = useState<NavigationData>({
    hdg: Angle.FromDegrees(289.0),
    stw: Speed.FromKnots(10.8),
    sog: Speed.FromKnots(10.8),
    cog: Angle.FromDegrees(289.0),
    posLat: parseLatitude("40°27.269'N"),
    posLon: parseLongitude("73°49.490'W"),
    ccrpPS: Length.FromMeters(0.0),
    ccrpFA: Length.FromMeters(0.0),
    stemPS: Length.FromMeters(0.0),
  });

  const updateNavData = (updates: Partial<NavigationData>) => {
    setNavData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="app">
      <div className="top-bar">
        <div className="app-logo">
          <span className="logo-icon">◉</span>
          <span className="logo-text">PCVN</span>
        </div>
        <div className="top-info">
          <span className="info-item">185 Bayview Road ~ Blasdell ~ New York ~ 14219 ~ 716-822-8668 ~ www.bcgeng.com</span>
        </div>
      </div>
      
      <div className="main-container">
        <LeftPanel navData={navData} updateNavData={updateNavData} />
        <RadarDisplay navData={navData} />
        <RightPanel />
      </div>
    </div>
  );
};

export default App;
