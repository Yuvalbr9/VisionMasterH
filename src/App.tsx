import React, { useState } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { RadarDisplay } from './components/RadarDisplay';
import { RightPanel } from './components/RightPanel';

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

const App: React.FC = () => {
  const [navData, setNavData] = useState<NavigationData>({
    hdg: 289.0,
    stw: 10.8,
    sog: 10.8,
    cog: 289.0,
    posLat: "40°27.269'N",
    posLon: "73°49.490'S",
    ccrpPS: 0.0,
    ccrpFA: 0.0,
    stemPS: 0.0,
  });

  const updateNavData = (field: keyof NavigationData, value: number | string) => {
    setNavData(prev => ({ ...prev, [field]: value }));
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
