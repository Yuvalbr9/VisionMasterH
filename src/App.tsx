import React, { useState } from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { NavigationData, RadarControlState, ARPATarget, RadarSelectedPoint } from './types';
import { LeftBar } from './components/LeftBar';
import { RadarDisplay } from './components/RadarDisplay';
import { RightPanel } from './components/RightPanel';
import { BaseButton } from './components/Buttons';
import { UI_TEXT } from './constants';
import {
  calculateCogSogFromVelocity,
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

const defaultVelocity = { vn: 0, ve: 0 };
const defaultArpaTargets: ARPATarget[] = [];

const cloneRadarPoints = (points: RadarSelectedPoint[]): RadarSelectedPoint[] => {
  return points.map((point) => ({ ...point }));
};

const areRadarPointListsEqual = (left: RadarSelectedPoint[], right: RadarSelectedPoint[]): boolean => {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (
      left[index].bearingDeg !== right[index].bearingDeg
      || left[index].rangeNm !== right[index].rangeNm
    ) {
      return false;
    }
  }

  return true;
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
  const [radarPointPickerActive, setRadarPointPickerActive] = useState(false);
  const [selectedRadarPoints, setSelectedRadarPoints] = useState<RadarSelectedPoint[]>([]);
  const [radarPointHistory, setRadarPointHistory] = useState<RadarSelectedPoint[][]>([]);
  const [radarPointPickerInitialPoints, setRadarPointPickerInitialPoints] = useState<RadarSelectedPoint[] | null>(null);
  const velocity = defaultVelocity;
  const arpaTargets = defaultArpaTargets;

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

    setRadarPointPickerInitialPoints(cloneRadarPoints(selectedRadarPoints));
    setRadarPointHistory([]);
    setRadarPointPickerActive(true);
  }, [radarPointPickerActive, selectedRadarPoints]);

  const closeRadarPointPicker = React.useCallback(() => {
    setRadarPointPickerActive(false);
    setRadarPointHistory([]);
    setRadarPointPickerInitialPoints(null);
  }, []);

  const cancelRadarPointPicker = React.useCallback(() => {
    if (radarPointPickerInitialPoints) {
      setSelectedRadarPoints(cloneRadarPoints(radarPointPickerInitialPoints));
    }

    setRadarPointPickerActive(false);
    setRadarPointHistory([]);
    setRadarPointPickerInitialPoints(null);
  }, [radarPointPickerInitialPoints]);

  const pushRadarPointHistory = React.useCallback((pointsSnapshot: RadarSelectedPoint[]) => {
    setRadarPointHistory((previousHistory) => {
      const nextSnapshot = cloneRadarPoints(pointsSnapshot);
      const latestSnapshot = previousHistory[previousHistory.length - 1];

      if (latestSnapshot && areRadarPointListsEqual(latestSnapshot, nextSnapshot)) {
        return previousHistory;
      }

      return [...previousHistory, nextSnapshot];
    });
  }, []);

  const handleRadarPointAdded = React.useCallback((selectedPoint: RadarSelectedPoint) => {
    setSelectedRadarPoints((previousPoints) => {
      pushRadarPointHistory(previousPoints);
      return [...previousPoints, selectedPoint];
    });
  }, [pushRadarPointHistory]);

  const handleRadarPointMoved = React.useCallback((pointIndex: number, nextPoint: RadarSelectedPoint) => {
    setSelectedRadarPoints((previousPoints) => previousPoints.map((point, index) => (
      index === pointIndex ? nextPoint : point
    )));
  }, []);

  const handleRadarPointMoveStart = React.useCallback((pointIndex: number) => {
    setSelectedRadarPoints((previousPoints) => {
      if (pointIndex < 0 || pointIndex >= previousPoints.length) {
        return previousPoints;
      }

      pushRadarPointHistory(previousPoints);
      return previousPoints;
    });
  }, [pushRadarPointHistory]);

  const handleRadarPointDeleted = React.useCallback((pointIndex: number) => {
    setSelectedRadarPoints((previousPoints) => {
      if (pointIndex < 0 || pointIndex >= previousPoints.length) {
        return previousPoints;
      }

      pushRadarPointHistory(previousPoints);
      return previousPoints.filter((_, index) => index !== pointIndex);
    });
  }, [pushRadarPointHistory]);

  const handleRadarPointReplaced = React.useCallback((pointIndex: number, nextPoint: RadarSelectedPoint) => {
    setSelectedRadarPoints((previousPoints) => {
      if (pointIndex < 0 || pointIndex >= previousPoints.length) {
        return previousPoints;
      }

      const currentPoint = previousPoints[pointIndex];
      if (
        currentPoint.bearingDeg === nextPoint.bearingDeg
        && currentPoint.rangeNm === nextPoint.rangeNm
      ) {
        return previousPoints;
      }

      pushRadarPointHistory(previousPoints);
      return previousPoints.map((point, index) => (index === pointIndex ? nextPoint : point));
    });
  }, [pushRadarPointHistory]);

  const undoRadarPointChange = React.useCallback(() => {
    setRadarPointHistory((previousHistory) => {
      const previousIndex = previousHistory.length - 1;
      if (previousIndex < 0) {
        return previousHistory;
      }

      const previousSnapshot = previousHistory[previousIndex];
      setSelectedRadarPoints(cloneRadarPoints(previousSnapshot));
      return previousHistory.slice(0, previousIndex);
    });
  }, []);

  const canUndoRadarPointChange = radarPointHistory.length > 0;

  return (
    <div className="app-viewport">
      <div className="app-frame">
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
            <LeftBar
              navData={navData}
              radarControls={radarControls}
              updateNavData={updateNavData}
            />
            <RadarDisplay
              navData={navData}
              radarControls={radarControls}
              arpaTargets={arpaTargets}
              radarPointPickerActive={radarPointPickerActive}
              selectedRadarPoints={selectedRadarPoints}
              onCloseRadarPointPicker={closeRadarPointPicker}
              onCancelRadarPointPicker={cancelRadarPointPicker}
              onUndoRadarPointChange={undoRadarPointChange}
              canUndoRadarPointChange={canUndoRadarPointChange}
              onRadarPointAdded={handleRadarPointAdded}
              onRadarPointMoveStart={handleRadarPointMoveStart}
              onRadarPointMoved={handleRadarPointMoved}
              onRadarPointDeleted={handleRadarPointDeleted}
              onRadarPointReplaced={handleRadarPointReplaced}
            />
            <RightPanel
              radarControls={radarControls}
              onRadarControlsChange={setRadarControls}
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
