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
import { Topbar } from './components/Topbar';
import { useRadarTargets } from './hooks/useRadarTargets';
import { useServerConnection } from './hooks/useServerConnection';
import { useAutoRefetch } from './hooks/useAutoRefetch';
import { useVelocityNavigationSync } from './hooks/useVelocityNavigationSync';

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
  const { isConnected } = useServerConnection();

  useAutoRefetch(isConnected, targetsState.refetch);

  const velocity = defaultVelocity;
  const arpaTargets = defaultArpaTargets;
  const surfaceTargets = targetsState.targets;

  const updateNavData = React.useCallback((updates: Partial<NavigationData>) => {
    setNavData((prev) => ({ ...prev, ...updates }));
  }, []);

  useVelocityNavigationSync(velocity, navData, updateNavData);

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
          <Topbar 
            isConnected={isConnected} 
            isReceivingData={isConnected && !targetsState.error} 
          />
          <div className="main-container">
            <LeftBar
              navData={navData}
              radarControls={radarControls}
              updateNavData={updateNavData}
              isConnected={isConnected}
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
