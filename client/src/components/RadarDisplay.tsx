import React from 'react';
import {
  NavigationData,
  RadarControlState,
  RadarMotionMode,
  RadarTargetState,
} from '../types';
import { RadarMap } from './RadarMap/RadarMap';

interface RadarDisplayProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  surfaceTargets: RadarTargetState[];
  motionMode: RadarMotionMode;
  onRangeChange: (nextRangeNm: number) => void;
  radarPointPickerActive: boolean;
  onCloseRadarPointPicker: () => void;
  onCancelRadarPointPicker: () => void;
  onUndoRadarPointChange: () => void;
  canUndoRadarPointChange: boolean;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({
  navData,
  radarControls,
  surfaceTargets,
  motionMode,
  onRangeChange,
  radarPointPickerActive,
  onCloseRadarPointPicker,
  onCancelRadarPointPicker,
  onUndoRadarPointChange,
  canUndoRadarPointChange,
}) => {
  const ownShip = React.useMemo(() => {
    return {
      id: 'own-ship',
      label: 'MV VisionMaster',
      latitude: navData.posLat.Degrees,
      longitude: navData.posLon.Degrees,
      speedKnots: navData.sog.Knots,
      courseDeg: navData.cog.Degrees,
      headingDeg: navData.hdg.Degrees,
    };
  }, [
    navData.cog.Degrees,
    navData.hdg.Degrees,
    navData.posLat.Degrees,
    navData.posLon.Degrees,
    navData.sog.Knots,
  ]);

  return (
    <div className="radar-display">
      <RadarMap
        ownShip={ownShip}
        targets={surfaceTargets}
        rangeNm={radarControls.selectedRangeNm}
        onRangeChange={onRangeChange}
        orientationMode={radarControls.northUp ? 'north-up' : 'heading-up'}
        motionMode={motionMode}
        vectorTimeMinutes={radarControls.vectorTimeMin}
        ebl1Deg={radarControls.ebl1Deg}
        ebl2Deg={radarControls.ebl2Deg}
        vrm1Nm={radarControls.vrm1Nm}
        vrm2Nm={radarControls.vrm2Nm}
      />
    </div>
  );
};
