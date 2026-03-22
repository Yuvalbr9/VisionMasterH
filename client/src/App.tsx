import React, { useState } from 'react';
import { Angle, Length, Speed } from 'unitsnet-js';
import {
  ARPATarget,
  NavigationData,
  RadarControlState,
  RadarMotionMode,
} from './types';
import { LeftBar } from './components/LeftBar';
import { RadarDisplay } from './components/RadarDisplay';
import { RightPanel } from './components/RightPanel';
import { BaseButton } from './components/Buttons';
import { UI_TEXT as UiText } from './constants';
import { useRadarTargets } from './hooks/useRadarTargets';
import {
  calculateCogSogFromVelocity,
  hasNavigationDeltaAboveTolerance,
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

const defaultVelocity = { vn: 0, ve: 0 };
const defaultArpaTargets: ARPATarget[] = [];

const App: React.FC = () => {
  const [navData, setNavData] = useState<NavigationData>({
    hdg: Angle.FromDegrees(48.0),
    stw: Speed.FromKnots(13.4),
    sog: Speed.FromKnots(13.4),
    cog: Angle.FromDegrees(48.0),
    posLat: Angle.FromDegrees(32.2),
    posLon: Angle.FromDegrees(34.24),
    ccrpPS: Length.FromMeters(0.0),
    ccrpFA: Length.FromMeters(0.0),
    stemPS: Length.FromMeters(0.0),
  });

  const [radarControls, setRadarControls] = useState<RadarControlState>(defaultRadarControls);
  const [radarMotionMode, setRadarMotionMode] = useState<RadarMotionMode>('RM');
  const [radarPointPickerActive, setRadarPointPickerActive] = useState(false);
  const targetsState = useRadarTargets();
  const velocity = defaultVelocity;
  const arpaTargets = defaultArpaTargets;
  const surfaceTargets = targetsState.targets;

  const updateNavData = React.useCallback((updates: Partial<NavigationData>) => {
    setNavData(prev => ({ ...prev, ...updates }));
  }, []);

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

  const openRadarPointPicker = React.useCallback(() => {
    if (radarPointPickerActive) {
      return;
    }

    setRadarPointPickerActive(true);
  }, [radarPointPickerActive]);

  const closeRadarPointPicker = React.useCallback(() => {
    setRadarPointPickerActive(false);
  }, []);

  const handleRadarPointPickerUndo = React.useCallback(() => undefined, []);

  const handleRadarRangeChange = React.useCallback((nextRangeNm: number) => {
    setRadarControls((previousControls) => {
      if (previousControls.selectedRangeNm === nextRangeNm) {
        return previousControls;
      }

      return {
        ...previousControls,
        selectedRangeNm: nextRangeNm,
      };
    });
  }, []);

  return (
    <div className="app-viewport">
      <div className="app-frame">
        <div className="app">
          <div className="legacy-topbar">
            <div className="legacy-topbar-left">
              <span className="legacy-app-icon" aria-hidden="true">◉</span>
              <span className="legacy-app-name">{UiText.TOPBAR.APP_NAME}</span>
            </div>
            <div className="legacy-topbar-right">
              <BaseButton className="legacy-win-btn" aria-label={UiText.TOPBAR.MINIMIZE} />
              <BaseButton className="legacy-win-btn" aria-label={UiText.TOPBAR.MAXIMIZE} />
              <BaseButton className="legacy-win-btn legacy-win-btn-close" aria-label={UiText.TOPBAR.CLOSE} />
            </div>
          </div>
          <div className="main-container">
            <LeftBar
              navData={navData}
              radarControls={radarControls}
              updateNavData={updateNavData}
            />
            <RadarDisplay
              navData={navData}
              radarControls={radarControls}
              surfaceTargets={surfaceTargets}
              motionMode={radarMotionMode}
              onRangeChange={handleRadarRangeChange}
              radarPointPickerActive={radarPointPickerActive}
              onCloseRadarPointPicker={closeRadarPointPicker}
              onCancelRadarPointPicker={closeRadarPointPicker}
              onUndoRadarPointChange={handleRadarPointPickerUndo}
              canUndoRadarPointChange={false}
            />
            <RightPanel
              radarControls={radarControls}
              onRadarControlsChange={setRadarControls}
              motionMode={radarMotionMode}
              onMotionModeChange={setRadarMotionMode}
              arpaTargets={arpaTargets}
              radarPointPickerActive={radarPointPickerActive}
              onOpenRadarPointPicker={openRadarPointPicker}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
