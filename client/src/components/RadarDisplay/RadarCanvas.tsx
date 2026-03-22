import React from 'react';
import { useRadarCanvas } from './useRadarCanvas';
import { ARPATarget, NavigationData, RadarControlState, RadarSelectedPoint } from '../../types';

interface RadarCanvasProps {
  navData: NavigationData;
  controls: RadarControlState;
  arpaTargets: ARPATarget[];
  pointPickerActive: boolean;
  selectedPoints: RadarSelectedPoint[];
  onPointAdded: (selectedPoint: RadarSelectedPoint) => void;
  replaceTargetPointIndex: number | null;
  onPointMoveStart: (pointIndex: number) => void;
  onPointMoved: (pointIndex: number, nextPoint: RadarSelectedPoint) => void;
  onPointReplaced: (pointIndex: number, nextPoint: RadarSelectedPoint) => void;
  onPointContextMenuOpen: (pointIndex: number, clientX: number, clientY: number) => void;
  onPointContextMenuClose: () => void;
}

export const RadarCanvas: React.FC<RadarCanvasProps> = ({
  navData,
  controls,
  arpaTargets,
  pointPickerActive,
  selectedPoints,
  onPointAdded,
  replaceTargetPointIndex,
  onPointMoveStart,
  onPointMoved,
  onPointReplaced,
  onPointContextMenuOpen,
  onPointContextMenuClose,
}) => {
  const canvasRef = useRadarCanvas({
    navData,
    controls,
    arpaTargets,
    pointPickerActive,
    selectedPoints,
    onPointAdded,
    replaceTargetPointIndex,
    onPointMoveStart,
    onPointMoved,
    onPointReplaced,
    onPointContextMenuOpen,
    onPointContextMenuClose,
  });

  return (
    <canvas
      ref={canvasRef}
      className={`radar-canvas${pointPickerActive ? ' radar-canvas-pick' : ''}`}
    />
  );
};
