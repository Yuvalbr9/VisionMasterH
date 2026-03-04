import React, { useMemo, useState } from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { ARPATarget, NavigationData, RadarControlState, parseLatitude, parseLongitude } from './types';
import { LeftPanel } from './components/LeftPanel';
import { RadarDisplay } from './components/RadarDisplay';
import { RightControlPanel } from './components/RightControlPanel';
import { calculateCOGDegrees, calculateLeewayDegrees, calculateSOGKnots, VelocityComponents } from './utils/navigationMath';

const App: React.FC = () => {
  const [navData, setNavData] = useState<NavigationData>({
    hdg: Angle.FromDegrees(289.0),
    stw: Speed.FromKnots(10.8),
    sog: Speed.FromKnots(0),
    cog: Angle.FromDegrees(0),
    posLat: parseLatitude("40°27.269'N"),
    posLon: parseLongitude("73°49.490'W"),
    ccrpPS: Length.FromMeters(0.0),
    ccrpFA: Length.FromMeters(0.0),
    stemPS: Length.FromMeters(0.0),
  });

  const updateNavData = (updates: Partial<NavigationData>) => {
    setNavData(prev => ({ ...prev, ...updates }));
  };

  const [velocity, setVelocity] = useState<VelocityComponents>({
    vn: 3.52,
    ve: -10.21,
  });

  const [radarControls, setRadarControls] = useState<RadarControlState>({
    northUp: true,
    selectedRangeNm: 2,
    trailsOn: false,
    vectorTimeMin: 6,
    aisOn: true,
    chartOverlayOn: false,
    ebl1Deg: 135,
    ebl2Deg: 81.6,
    vrm1Nm: 0.8,
    vrm2Nm: 1.35,
  });

  const derivedCognitiveData = useMemo(() => {
    const cogDeg = calculateCOGDegrees(velocity);
    const sogKn = calculateSOGKnots(velocity);
    const leewayDeg = calculateLeewayDegrees(cogDeg, navData.hdg.Degrees);

    return {
      cog: Angle.FromDegrees(cogDeg),
      sog: Speed.FromKnots(sogKn),
      leewayDeg,
    };
  }, [velocity, navData.hdg.Degrees]);

  const computedNavData: NavigationData = {
    ...navData,
    cog: derivedCognitiveData.cog,
    sog: derivedCognitiveData.sog,
  };

  const arpaTargets: ARPATarget[] = useMemo(
    () => [
      {
        id: 'TGT-01',
        bearingDeg: 286,
        rangeNm: 1.32,
        courseDeg: 312,
        speedKn: 13.4,
        history: [
          { bearingDeg: 279, rangeNm: 1.46 },
          { bearingDeg: 281, rangeNm: 1.42 },
          { bearingDeg: 283, rangeNm: 1.38 },
        ],
        cpaNm: 0.42,
        tcpaMin: 15,
      },
      {
        id: 'TGT-02',
        bearingDeg: 122,
        rangeNm: 0.74,
        courseDeg: 92,
        speedKn: 7.8,
        history: [
          { bearingDeg: 117, rangeNm: 0.83 },
          { bearingDeg: 119, rangeNm: 0.8 },
          { bearingDeg: 120, rangeNm: 0.77 },
        ],
        cpaNm: 0.19,
        tcpaMin: 9,
      },
    ],
    []
  );

  return (
    <div className="app">
      <div className="legacy-topbar">
        <div className="legacy-topbar-left">
          <span className="legacy-app-name">PCVM</span>
        </div>
        <div className="legacy-topbar-center" />
        <div className="legacy-topbar-right">
          <span className="legacy-win-btn" />
          <span className="legacy-win-btn" />
          <span className="legacy-win-btn" />
        </div>
      </div>
      <div className="main-container">
        <LeftPanel navData={computedNavData} updateNavData={updateNavData} />
        <RadarDisplay
          navData={computedNavData}
          radarControls={radarControls}
          arpaTargets={arpaTargets}
          velocity={velocity}
          leewayDeg={derivedCognitiveData.leewayDeg}
        />
        <RightControlPanel
          radarControls={radarControls}
          onRadarControlsChange={setRadarControls}
          velocity={velocity}
          onVelocityChange={setVelocity}
          leewayDeg={derivedCognitiveData.leewayDeg}
          arpaTargets={arpaTargets}
        />
      </div>
    </div>
  );
};

export default App;
