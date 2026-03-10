import React from 'react';
import { ARPATarget, NavigationData, RadarControlState, RadarSelectedPoint } from '../types';
import { UI_TEXT } from '../constants';
import { BaseButton } from './Buttons';
import { RadarTopInfo } from './RadarDisplay/RadarTopInfo';
import { RadarCanvas } from './RadarDisplay/RadarCanvas';
import { RadarBottomControls } from './RadarDisplay/RadarBottomControls';
import { RadarPointPickerModal } from './RadarDisplay/RadarPointPickerModal';

interface RadarPointContextMenuState {
  pointIndex: number;
  clientX: number;
  clientY: number;
}

interface RadarDisplayProps {
  navData: NavigationData;
  radarControls: RadarControlState;
  arpaTargets: ARPATarget[];
  leewayDeg: number;
  radarPointPickerActive: boolean;
  selectedRadarPoints: RadarSelectedPoint[];
  onCloseRadarPointPicker: () => void;
  onCancelRadarPointPicker: () => void;
  onUndoRadarPointChange: () => void;
  canUndoRadarPointChange: boolean;
  onRadarPointAdded: (selectedPoint: RadarSelectedPoint) => void;
  onRadarPointMoveStart: (pointIndex: number) => void;
  onRadarPointMoved: (pointIndex: number, nextPoint: RadarSelectedPoint) => void;
  onRadarPointDeleted: (pointIndex: number) => void;
  onRadarPointReplaced: (pointIndex: number, nextPoint: RadarSelectedPoint) => void;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({
  navData,
  radarControls,
  arpaTargets,
  leewayDeg,
  radarPointPickerActive,
  selectedRadarPoints,
  onCloseRadarPointPicker,
  onCancelRadarPointPicker,
  onUndoRadarPointChange,
  canUndoRadarPointChange,
  onRadarPointAdded,
  onRadarPointMoveStart,
  onRadarPointMoved,
  onRadarPointDeleted,
  onRadarPointReplaced,
}) => {
  const [contextMenuState, setContextMenuState] = React.useState<RadarPointContextMenuState | null>(null);
  const [replaceTargetPointIndex, setReplaceTargetPointIndex] = React.useState<number | null>(null);

  const closeContextMenu = React.useCallback(() => {
    setContextMenuState(null);
  }, []);

  const openContextMenu = React.useCallback((pointIndex: number, clientX: number, clientY: number) => {
    setContextMenuState({ pointIndex, clientX, clientY });
    setReplaceTargetPointIndex(null);
  }, []);

  const handleDeleteFromContextMenu = React.useCallback(() => {
    if (!contextMenuState) {
      return;
    }

    onRadarPointDeleted(contextMenuState.pointIndex);
    setContextMenuState(null);
  }, [contextMenuState, onRadarPointDeleted]);

  const handleReplaceFromContextMenu = React.useCallback(() => {
    if (!contextMenuState) {
      return;
    }

    setReplaceTargetPointIndex(contextMenuState.pointIndex);
    setContextMenuState(null);
  }, [contextMenuState]);

  const handlePointReplaced = React.useCallback((pointIndex: number, nextPoint: RadarSelectedPoint) => {
    onRadarPointReplaced(pointIndex, nextPoint);
    setReplaceTargetPointIndex(null);
  }, [onRadarPointReplaced]);

  React.useEffect(() => {
    if (!radarPointPickerActive) {
      setContextMenuState(null);
      setReplaceTargetPointIndex(null);
    }
  }, [radarPointPickerActive]);

  React.useEffect(() => {
    if (!contextMenuState) {
      return;
    }

    const handlePointerDownOutsideMenu = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('.radar-point-context-menu')) {
        return;
      }

      setContextMenuState(null);
    };

    window.addEventListener('pointerdown', handlePointerDownOutsideMenu);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDownOutsideMenu);
    };
  }, [contextMenuState]);

  return (
    <div className="radar-display">
      <RadarTopInfo navData={navData} controls={radarControls} leewayDeg={leewayDeg} />
      <RadarCanvas
        navData={navData}
        controls={radarControls}
        arpaTargets={arpaTargets}
        pointPickerActive={radarPointPickerActive}
        selectedPoints={selectedRadarPoints}
        onPointAdded={onRadarPointAdded}
        replaceTargetPointIndex={replaceTargetPointIndex}
        onPointMoveStart={onRadarPointMoveStart}
        onPointMoved={onRadarPointMoved}
        onPointReplaced={handlePointReplaced}
        onPointContextMenuOpen={openContextMenu}
        onPointContextMenuClose={closeContextMenu}
      />
      <RadarBottomControls />
      {radarPointPickerActive && (
        <RadarPointPickerModal
          canUndo={canUndoRadarPointChange}
          replaceModeActive={replaceTargetPointIndex !== null}
          onUndo={onUndoRadarPointChange}
          onClose={onCloseRadarPointPicker}
          onCancel={onCancelRadarPointPicker}
        />
      )}
      {contextMenuState && (
        <div
          className="radar-point-context-menu"
          role="menu"
          style={{ left: `${contextMenuState.clientX}px`, top: `${contextMenuState.clientY}px` }}
        >
          <BaseButton className="radar-point-context-menu-btn" onClick={handleReplaceFromContextMenu} role="menuitem">
            {UI_TEXT.RIGHT_PANEL.RADAR_POINT_MENU_REPLACE}
          </BaseButton>
          <BaseButton className="radar-point-context-menu-btn" onClick={handleDeleteFromContextMenu} role="menuitem">
            {UI_TEXT.RIGHT_PANEL.RADAR_POINT_MENU_DELETE}
          </BaseButton>
        </div>
      )}
    </div>
  );
};
