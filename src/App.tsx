import React, { useState } from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { NavigationData, RadarControlState, ARPATarget } from './types';
import { LeftBar } from './components/LeftBar';
import { RadarDisplay } from './components/RadarDisplay';
import { RightPanel } from './components/RightPanel';
import { BaseButton } from './components/Buttons';
import { UI_TEXT } from './constants';
import {
  calculateCogSogFromVelocity,
  calculateLeewayDeg,
  hasNavigationDeltaAboveTolerance,
  parseLatitude,
  parseLongitude,
} from './util';

const defaultRadarControls: RadarControlState = {
  northUp: true,
  selectedRangeNm: 12,
  trailsOn: false,
  vectorTimeMin: 6.0,
  aisOn: true,
  chartOverlayOn: false,
  ebl1Deg: 303.4,
  ebl2Deg: 5.0,
  vrm1Nm: 5.07,
  vrm2Nm: 7.56,
};

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

  const [radarControls, setRadarControls] = useState<RadarControlState>(defaultRadarControls);
  const [velocity] = useState<{ vn: number; ve: number }>({ vn: 0, ve: 0 });
  const [arpaTargets] = useState<ARPATarget[]>([]);

  const updateNavData = (updates: Partial<NavigationData>) => {
    setNavData(prev => ({ ...prev, ...updates }));
  };

  React.useEffect(() => {
    const { cogDeg: nextCogDeg, sogKn: nextSogKn, velocityIsMeaningful } = calculateCogSogFromVelocity(velocity);

    if (!velocityIsMeaningful) {
      return;
    }

    if (!hasNavigationDeltaAboveTolerance(navData.cog.Degrees, navData.sog.Knots, nextCogDeg, nextSogKn)) {
      return;
    }

    setNavData((prev) => ({
      ...prev,
      cog: Angle.FromDegrees(nextCogDeg),
      sog: Speed.FromKnots(nextSogKn),
    }));
  }, [velocity.vn, velocity.ve, navData.cog.Degrees, navData.sog.Knots]);

  const leewayDeg = React.useMemo(
    () => calculateLeewayDeg(navData.cog.Degrees, navData.hdg.Degrees),
    [navData.cog.Degrees, navData.hdg.Degrees]
  );

  return (
    <div className="app-viewport">
      <div className="app">
        <div className="legacy-topbar">
          <div className="legacy-topbar-left">
            <span className="legacy-app-icon" aria-hidden="true">◉</span>
            <span className="legacy-app-name">{UI_TEXT.TOPBAR.APP_NAME}</span>
          </div>
          <div className="legacy-topbar-center" />
          <div className="legacy-topbar-right">
            <BaseButton className="legacy-win-btn" aria-label={UI_TEXT.TOPBAR.MINIMIZE} />
            <BaseButton className="legacy-win-btn" aria-label={UI_TEXT.TOPBAR.MAXIMIZE} />
            <BaseButton className="legacy-win-btn legacy-win-btn-close" aria-label={UI_TEXT.TOPBAR.CLOSE} />
          </div>
        </div>
        <div className="main-container">
          <LeftBar navData={navData} updateNavData={updateNavData} />
          <RadarDisplay
            navData={navData}
            radarControls={radarControls}
            arpaTargets={arpaTargets}
            leewayDeg={leewayDeg}
          />
          <RightPanel
            radarControls={radarControls}
            onRadarControlsChange={setRadarControls}
            arpaTargets={arpaTargets}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
